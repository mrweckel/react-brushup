import React, { Component } from 'react';
import { render } from 'react-dom';

import About from './About';
import Home  from './Home';
import Repos from './Repos';

class App extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      route: window.location.hash.substr(1), //returns string after the hash symbol
    }
  }

  componentDidMount() {

    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }

  render() {

    let Child;

    switch(this.state.route) {
      case '/about':
        Child = About;
        break;
      case '/repos':
        Child = Repos;
        break
      default:
        Child = Home;
    }

    return(
      <div>
        <header>
          <menu>
            <ul>
              <li><a href="#/about">About</a></li>
              <li><a href="#/repos">Repos</a></li>
            </ul>
          </menu>
        </header>
        <Child />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
