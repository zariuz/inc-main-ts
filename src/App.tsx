import React, {useState} from 'react';
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

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = { id: string; title: string; filter: FilterValuesType };

export type TasksStateType = { [key: string]: Array<TaskType> };

export const App = () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
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

  const addTodolist = (title: string) => {
    const newTodolistID = v1();
    setTodolists([{id: newTodolistID, title: title, filter: 'all'}, ...todolists]);
    setTasks({...tasks, [newTodolistID]: []});
  };

  const addTask = (todolistId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]],
    });
  };

  const removeTask = (todolistId: string, taskID: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskID)});
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId));
  };

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) => (t.id === taskId ? {...t, isDone} : t)),
    });
  };

  const changeFilter = (todolistId: string, value: FilterValuesType) => {
    setTodolists(
      todolists.map((tl) => (tl.id === todolistId ? {...tl, filter: value} : tl)),
    );
  };

  const updateTask = (todolistId: string, id: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === id ? {...t, title: title} : t,
      ),
    });
  };

  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists(
      todolists.map((tl) => (tl.id === todolistId ? {...tl, title: title} : tl)),
    );
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
}
