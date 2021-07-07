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
    if (title.length > 0 && title !== ' ') {
      addTask(title);
    }
    setTitle('');
  };

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onKeyEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(title);
      setTitle('');
    }
  };
  const onAllClickHandler = () => changeFilter('all');
  const onActiveClickHandler = () => changeFilter('active');
  const onCompletedClickHandler = () => changeFilter('completed');

  const tasksElement = tasks.map((task) => {
    const onClickRemoveTask = () => removeTask(task.id);

    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <button onClick={onClickRemoveTask}>x</button>
      </li>
    );
  });

  return (
    <div>
      <h3>{name}</h3>
      <div>
        <input
          value={title}
          onChange={onTitleChangeHandler}
          onKeyPress={onKeyEnterHandler}
        />
        <button onClick={changeAddTask}>+</button>
      </div>
      <ul>{tasksElement}</ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
