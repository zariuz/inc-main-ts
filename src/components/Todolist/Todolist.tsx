import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../../App';

type TodolistPropsType = {
  name: string;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
};

const Todolist = ({
  name,
  tasks,
  addTask,
  removeTask,
  changeFilter,
}: TodolistPropsType) => {
  const [title, setTitle] = useState('');
  const changeAddTask = () => {
    if (title.length > 0) {
      addTask(title);
    }
    setTitle('');
  };

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
      <h3>{name}</h3>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTask(title);
              setTitle('');
            }
          }}
        />
        <button onClick={changeAddTask}>+</button>
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
