import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from '../../AppWithRedux';
import './Todolist.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from '../Task/Task';

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

export const Todolist: React.FC<TodolistPropsType> = React.memo(({
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
}) => {
  const generalOnClickHandler = useCallback((filter: FilterValuesType) => {
    changeFilter(todolistId, filter);
  }, [changeFilter, todolistId]);

  const onClickRemoveTodolist = () => removeTodolist(todolistId);

  const callbackHandler = useCallback((title: string) => {
    addTask(title, todolistId);
  }, [addTask, todolistId]);

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolistId, title);
  };

  // filter tasks
  let tasksForTodoList = tasks

  if (filter === 'active') {
    tasksForTodoList = tasks.filter((t) => !t.isDone);
  }

  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((t) => t.isDone);
  }

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

      <ul className={'todo__list'}>
        {tasksForTodoList.map((task) => {
          return <Task key={task.id} task={task} todolistId={todolistId} removeTask={removeTask}
                       changeTaskStatus={changeTaskStatus}
                       updateTask={updateTask}/>
        })}
      </ul>

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
});
