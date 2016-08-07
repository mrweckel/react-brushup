import React, { Component, Proptypes } from 'react';
import update from 'react-addons-update';

let student = {name:'John Caster', grades: ['A', 'C', 'B']}

let newStudent = update(student, {grades:{$push: ['A']}});