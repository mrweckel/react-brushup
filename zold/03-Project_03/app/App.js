import React, { Component } from 'react';
import {render} from 'react-dom';
import KanbanBoard from './KanbanBoard';

let cardsList = [
  {
    id: 1,
    title: "Watch this movie",
    description: "Would love to watch this",
    status: "in-progress",
    tasks: []
  },
  {
    id: 2,
    title: "Study React",
    description: "Brush up on the old React",
    status: "in-progress",
    tasks: [
      {
        id: 1,
        name: "Grocery List",
        done: true
      },
      {
        id: 2,
        name: "Kanban Board",
        done: false
      },
      {
        id: 3,
        name: "Integrate with Pluto Rover",
        done: false
      }
    ]
  }
]

render(<KanbanBoard cards={cardsList} />,
              document.getElementById('app'));


