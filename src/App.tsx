import React, {useCallback, useEffect} from 'react';
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
  addTodolistAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  removeTodolistAC, setTodolistsAC, TodolistDomainType,
} from './state/todolists-reducer';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {todolistsAPI} from './api/todolist-api';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = { [key: string]: Array<TaskType> };

export const App = () => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
  const tasks = useSelector<AppRootStateType, TasksStateType>(({tasks}) => tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => dispatch(setTodolistsAC(res.data)))
  }, []);


  /// tasks
  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(AddTaskAC(title, todolistId));
  }, [dispatch]);

  const removeTask = useCallback((taskID: string, todolistId: string) => {
    dispatch(RemoveTaskAC(taskID, todolistId));
  }, [dispatch]);

  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(ChangeTaskStatusAC(taskId, isDone, todolistId));
  }, [dispatch]);

  const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(ChangeTaskTitleAC(todolistId, taskId, title));
  }, [dispatch]);

  /// todolists
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title));
  }, [dispatch]);

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId));
  }, [dispatch]);

  const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    dispatch(ChangeTodoListFilterAC(todolistId, filter));
  }, [dispatch]);

  const updateTodolist = useCallback((todolistId: string, title: string) => {
    dispatch(ChangeTodoListTitleAC(todolistId, title));
  }, [dispatch]);

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
