import React, { Component } from 'react';
import { render } from 'react-dom';

class Hello extends React.Component {

  render() {
    var place = "Brooklyn";
    return (
      <h1>Hello {place}</h1>
    )
  }
}

render(<Hello />, document.getElementById('root'));