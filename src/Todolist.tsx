import React from 'react';
import { FilterValuesType, TaskType } from './App';

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: number) => void;
  changeFilter: (value: FilterValuesType) => void;
};

const Todolist = ({ title, tasks, removeTask, changeFilter }: TodolistPropsType) => {
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
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
