import React, { Component } from 'react';
import {render} from 'react-dom';

// class App extends Component {
//   render(){
//     var place = "Fuckers"
//     return (
//       <h1>Hello {place}</h1>
//     );
//   }
// }

//Parent Component
class GroceryList extends Component {

  render() {
    return(
      <ul>
        <ListItem quantity="1">Bread </ListItem>
        <ListItem quantity="6">Eggs </ListItem>
        <ListItem quantity="2">Milk </ListItem>
      </ul>
    );
  }
}

//Child Component
class ListItem extends Component {

  render() {
    return(
      <li>
        {this.props.quantity} x {this.props.children}
      </li>
    );
  }
}

render(<GroceryList />, document.getElementById('app'));
