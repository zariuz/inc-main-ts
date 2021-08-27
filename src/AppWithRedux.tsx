import React from 'react';
import {Todolist} from './components/Todolist/Todolist';
import './App.css';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
} from './state/todolists-reducer';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = { id: string; title: string; filter: FilterValuesType };

export type TasksStateType = { [key: string]: Array<TaskType> };

export const AppWithRedux = () => {
  const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists);
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

  const dispatch = useDispatch();

  /// tasks
  const addTask = (title: string, todolistId: string) => {
    dispatch(AddTaskAC(title, todolistId));
  };

  const removeTask = (taskID: string, todolistId: string) => {
    dispatch(RemoveTaskAC(taskID, todolistId));
  };

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(ChangeTaskStatusAC(taskId, isDone, todolistId));
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatch(ChangeTaskTitleAC(todolistId, taskId, title));
  };

  /// todolists
  const addTodolist = (title: string) => {
    let action = AddTodoListAC(title)
    dispatch(action);
  };

  const removeTodolist = (todolistId: string) => {
    let action = RemoveTodoListAC(todolistId)
    dispatch(action);
  };

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    dispatch(ChangeTodoListFilterAC(todolistId, filter));
  };

  const updateTodolist = (todolistId: string, title: string) => {
    dispatch(ChangeTodoListTitleAC(todolistId, title));
  };

  return (
    <div className={'App'}>
      <AppBar position="static">
        <Toolbar className={'login'}>
          <div className={'news'}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6">News</Typography>
          </div>
          <span>
            <Button color="inherit">Login</Button>
          </span>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm callback={addTodolist}/>
        </Grid>

        <Grid container spacing={5}>
          {todolists.map((tdM) => {
            let tasksForTodoList = tasks[tdM.id];

            if (tdM.filter === 'active') {
              tasksForTodoList = tasks[tdM.id].filter((t) => !t.isDone);
            }

            if (tdM.filter === 'completed') {
              tasksForTodoList = tasks[tdM.id].filter((t) => t.isDone);
            }

            return (
              <Grid item key={tdM.id}>
                <Paper style={{padding: '20px'}}>
                  <Todolist
                    key={tdM.id}
                    todolistId={tdM.id}
                    titleName={tdM.title}
                    tasks={tasksForTodoList}
                    addTask={addTask}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeTaskStatus}
                    filter={tdM.filter}
                    updateTask={updateTask}
                    updateTodolist={updateTodolist}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
