import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import './Todolist.css';

type TodolistPropsType = {
  titleName: string;
  todolistId: string;
  tasks: Array<TaskType>;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

const Todolist = ({
  titleName,
  todolistId,
  tasks,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
  filter,
}: TodolistPropsType) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const changeAddTask = () => {
    //title.trim() - checking for spaces
    if (title.trim()) {
      addTask(todolistId, title);
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
      changeAddTask();
    }
  };
  const onAllClickHandler = () => changeFilter(todolistId, 'all');
  const onActiveClickHandler = () => changeFilter(todolistId, 'active');
  const onCompletedClickHandler = () => changeFilter(todolistId, 'completed');

  const tasksElement = tasks.map((task) => {
    const onClickRemoveTask = () => removeTask(todolistId, task.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(todolistId, task.id, e.currentTarget.checked);
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
      <h3>{titleName}</h3>
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
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}>
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}>
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;
