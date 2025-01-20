import React from 'react';
import "./App.css";
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import ToDoList from './ToDoList'

const App = () => {
  return (
  <div className="App">
    <Container className="container">
      <ToDoList />
    </Container>
  </div>
  )
}

export default App;