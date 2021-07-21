import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import {Button} from '../Button/Button';
import './Todolist.css';

type TodolistPropsType = {
  titleName: string;
  todolistId: string;
  tasks: Array<TaskType>;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  removeTodolist: (todolistId: string) => void;
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
  removeTodolist,
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

  const generalOnClickHandler = (value: FilterValuesType) => {
    changeFilter(todolistId, value);
  };

  const onClickRemoveTodolist = () => removeTodolist(todolistId);

  const tasksElement = tasks.map((task) => {
    const onClickRemoveTask = () => removeTask(todolistId, task.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(todolistId, task.id, e.currentTarget.checked);
    };

    return (
      <li key={task.id}>
        <input type="checkbox" onChange={onChangeHandler} checked={task.isDone} />
        <span>{task.title}</span>
        <Button callback={onClickRemoveTask} buttonName={'X'} />
      </li>
    );
  });

  return (
    <div>
      <div className="titleName">
        <h3>{titleName}</h3>
        <Button callback={onClickRemoveTodolist} buttonName={'X'} />
      </div>
      <div>
        <input
          value={title}
          onChange={onTitleChangeHandler}
          onKeyPress={onKeyEnterHandler}
          className={error ? 'error' : ''}
        />
        <Button callback={changeAddTask} buttonName={'+'} />
        {error && <div className="error-message">Title is required!</div>}
      </div>
      <ul>{tasksElement}</ul>
      <div>
        <Button
          buttonName={'All'}
          callback={() => generalOnClickHandler('all')}
          style={filter === 'all' ? 'active-filter' : ''}
        />
        <Button
          buttonName={'Active'}
          callback={() => generalOnClickHandler('active')}
          style={filter === 'active' ? 'active-filter' : ''}
        />
        <Button
          buttonName={'Completed'}
          callback={() => generalOnClickHandler('completed')}
          style={filter === 'completed' ? 'active-filter' : ''}
        />
      </div>
    </div>
  );
};

export default Todolist;
