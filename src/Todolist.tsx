import React from 'react';
import {TaskType} from './App';

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
};

const Todolist = ({title, tasks}: TodolistPropsType) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
          </li>
        ))}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
