import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../../App';

type TodolistPropsType = {
  name: string;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
};

const Todolist = ({
  name,
  tasks,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
}: TodolistPropsType) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const changeAddTask = () => {
    //title.trim() - checking for spaces
    if (title.trim()) {
      addTask(title);
    } else {
      setError(true);
    }
    setTitle('');
  };

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError(false);
  };
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
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(task.id, e.currentTarget.checked);
    };

    return (
      <li key={task.id}>
        <input type="checkbox" onChange={onChangeHandler} checked={task.isDone} />
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
          className={error ? 'error' : ''}
        />
        <button onClick={changeAddTask}>+</button>
        {error && <div className="error-message">Title is required!</div>}
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
