import React from 'react';
import {TaskType} from './App';

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: number) => void;
};

const Todolist = ({title, tasks, removeTask}: TodolistPropsType) => {
  const tasksJSXElement = tasks.map((task) => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <button onClick={() => removeTask(task.id)}>x</button>
      </li>
    );
  });

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>{tasksJSXElement}</ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
