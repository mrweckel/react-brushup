import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class AnimatedShoppingList extends Component {

  constructor() {

    super(...arguments);

    this.state={
      items: [
        {id:1, name: 'Milk'},
        {id:2, name: 'Yogurt'},
        {id:3, name: 'Orange Juice'},
      ]
    }
  }

  handleChange(evt) {

    if(evt.key === 'Enter') {
      //Create new item and set the current time as it's id
      let newItem = {id: Date.now(), name: evt.target.value};
      //Create new array with previous items plus the value the user typed
      let newItems = this.state.items.concat(newItem);
      //Clear the text field
      evt.target.value = '';
      //Set the new state
      this.setState({items: newItems});
    }
  }

  handleRemove(i) {

    //Create a new array without the clicked item
    var newItems = this.state.items;
    newItems.splice(i,1);

    //Set the new state
    this.setState({items: newItems});
  }

  render() {
    let shoppingItems = this.state.items.map((item,i) => {
      <div key={item.id}
           className={"item"}
           onClick={this.handleRemove.bind(this, i)}>
           {item.name}
      </div>
    });

    return(
      <div>
        {shoppingItems}
        <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
      </div>
    );
  }
}



render(<AnimatedShoppingList />, document.getElementById('root'));