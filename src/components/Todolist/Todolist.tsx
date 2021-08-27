import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from '../../AppWithRedux';
import './Todolist.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type TodolistPropsType = {
  titleName: string;
  todolistId: string;
  tasks: Array<TaskType>;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValuesType) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
};

export const Todolist = ({
  titleName,
  todolistId,
  tasks,
  addTask,
  removeTask,
  removeTodolist,
  changeFilter,
  changeTaskStatus,
  filter,
  updateTask,
  updateTodolist,
}: TodolistPropsType) => {
  const generalOnClickHandler = (filter: FilterValuesType) => {
    changeFilter(todolistId, filter);
  };

  const onClickRemoveTodolist = () => removeTodolist(todolistId);

  const callbackHandler = (title: string) => {
    addTask(title, todolistId);
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolistId, title);
  };

  const tasksElement = tasks.map((t) => {
    const onClickRemoveTask = () => removeTask(t.id, todolistId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
    };
    const updateTaskHandler = (title: string) => {
      updateTask(todolistId, t.id, title);
    };

    return (
      <li key={t.id} className={'todo__item'}>
        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
        <EditableSpan title={t.title} callback={updateTaskHandler}/>
        <IconButton onClick={onClickRemoveTask} aria-label="delete">
          <Delete fontSize="medium"/>
        </IconButton>
      </li>
    );
  });

  return (
    <div>
      <div className="titleName">
        <h3>
          <EditableSpan title={titleName} callback={updateTodolistHandler}/>
        </h3>
        <IconButton onClick={onClickRemoveTodolist} aria-label="delete">
          <Delete fontSize="medium"/>
        </IconButton>
      </div>

      <AddItemForm callback={callbackHandler}/>

      <ul className={'todo__list'}>{tasksElement}</ul>
      <div>
        <Button
          onClick={() => generalOnClickHandler('all')}
          variant={filter === 'all' ? 'contained' : 'outlined'}
          color="primary">
          All
        </Button>
        <Button
          onClick={() => generalOnClickHandler('active')}
          variant={filter === 'active' ? 'contained' : 'outlined'}
          color="secondary">
          Active
        </Button>
        <Button
          onClick={() => generalOnClickHandler('completed')}
          variant={filter === 'completed' ? 'contained' : 'outlined'}>
          Completed
        </Button>
      </div>
    </div>
  );
};
