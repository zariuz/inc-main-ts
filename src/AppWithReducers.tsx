import React, {useReducer} from 'react';
import {v1} from 'uuid';
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
  todolistsReducer,
} from './state/todolists-reducer';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
} from './state/tasks-reducer';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = { id: string; title: string; filter: FilterValuesType };

export type TasksStateType = { [key: string]: Array<TaskType> };

export const AppWithReducers = () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'Next.js', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
  });

  /// tasks
  const addTask = (title: string, todolistId: string) => {
    dispatchToTasks(AddTaskAC(title, todolistId));
  };

  const removeTask = (taskID: string, todolistId: string) => {
    dispatchToTasks(RemoveTaskAC(taskID, todolistId));
  };

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatchToTasks(ChangeTaskStatusAC(taskId, isDone, todolistId));
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatchToTasks(ChangeTaskTitleAC(todolistId, taskId, title));
  };

  /// todolists
  const addTodolist = (title: string) => {
    let action = AddTodoListAC(title)
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const removeTodolist = (todolistId: string) => {
    let action = RemoveTodoListAC(todolistId)
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    dispatchToTodolists(ChangeTodoListFilterAC(todolistId, filter));
  };

  const updateTodolist = (todolistId: string, title: string) => {
    dispatchToTodolists(ChangeTodoListTitleAC(todolistId, title));
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
              <Grid item>
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
