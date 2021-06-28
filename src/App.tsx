import React from 'react';
import Todolist from './Todolist';
import './App.css';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

function App() {
  const taskOne: Array<TaskType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JavaScript', isDone: true},
    {id: 3, title: 'React&Redux', isDone: false},
  ];
  const taskTwo: Array<TaskType> = [
    {id: 4, title: 'Quick learn HTML&CSS', isDone: true},
    {id: 5, title: 'JavaScript for Kids', isDone: true},
    {id: 6, title: 'Amazing React', isDone: false},
  ];

  return (
    <div className="App">
      <Todolist title="Learn" tasks={taskOne} />
      <Todolist title="Books" tasks={taskTwo} />
    </div>
  );
}

export default App;
