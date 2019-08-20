import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoHeader from './components/todo-header'
import TodoList from './components/todo-list'
import TodoFooter from './components/todo-footer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TodoHeader/>
        <TodoList/>
        <TodoFooter/>
      </header>
    </div>
  );
}

export default App;
