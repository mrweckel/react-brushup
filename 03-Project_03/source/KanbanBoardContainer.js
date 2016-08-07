import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import 'babel-polyfill'
import 'whatwg-fetch';


import KanbanBoard from './KanbanBoard';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'mrweckel'
}

class KanbanBoardContainer extends Component {

  constructor() {

    super(...arguments);

    this.state = {
      cards: [],
    }
  }

  componentDidMount() {
    fetch(API_URL + '/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData})
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  addTask(cardId, taskName) {

    //Keep reference to prevState in case of network failure
    let prevState = this.state;


    //Find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => {
      return card.id === cardId;
    });

    //Set a new task with a temporary ID
    let newTask = {id: Date.now(), name: taskName, done: false};

    //Create a new object and push the new task to the array of tasks
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    });

    //Set Component state to the mutated object
    this.setState({cards: nextState});

    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(),
    })
    .then((response) => {
      if(response.ok){
        return response.json();
      } else {
        //Throw error if response wasn't ok
        //so you can revert back to before optimistic changes
        throw new Error("Server response was not ok");
      }
    })
    .then((responseData) => {
      //When the server returns the new, actual id
      //update the state on the component by replacing temp id
      newTask.id = responseData.id;
      this.setState({cards:nextState});
    })
    .catch((error) => {
      this.setState(prevState);
    });
  }

  deleteTask(cardId, taskId, taskIndex) {

    //Find Index of card
    let cardIndex = this.state.cards.findIndex((card) => {
      return card.id === cardId;
    });

    //Create a new object without the task
    //** Need to look up update **//
    let nextState = update(this.state.cards, {
        [cardIndex]: {
          tasks: { $splice: [[taskIndex,1]] }
        }
    });

    //Set the component state to the mutated object
    this.setState({cards: nextState});

    //Call API to remove task from server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
      method: 'delete',
      headers: API_HEADERS
    });
  }

  toggleTask(cardId, taskId, taskIndex) {

    //Find Index of card
    let cardIndex = this.state.cards.findIndex((card) => {
      return card.id === cardId
    });

    //Save a reference to task's done value
    let newDoneValue;

    //Using the $apply command, change the done value to its opposite
    //Going to have to dig in deeper here on this
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: { $apply: (done) => {
                newDoneValue = !done;
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    //Set component state to the mutated value
    this.setState({cards: nextState});

    //Call the API to set the state on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done: newDoneValue}),
    });
  }

  render() {
    return <KanbanBoard cards={this.state.cards}
                        taskCallbacks={{
                          toggle: this.toggleTask.bind(this),
                          delete: this.deleteTask.bind(this),
                          add: this.addTask.bind(this),
                        }}/>
  }
}

export default KanbanBoardContainer;