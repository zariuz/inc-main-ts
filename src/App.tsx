import React, {useState} from 'react';
import {v1} from 'uuid';
import Todolist from './components/Todolist/Todolist';
import './App.css';
import {AddItemForm} from './components/AddItemForm/AddItemForm';


export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = { id: string; title: string; filter: FilterValuesType };

export type tasksGeneralType = { [key: string]: Array<TaskType> };

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ]);

  let [tasks, setTasks] = useState<tasksGeneralType>({
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

  const addTodolist = (todolistId: string, title: string) => {
    let newTodolist: TodolistsType = {id: todolistId, title: title, filter: 'all'};
    setTodolists([newTodolist, ...todolists]);
    setTasks({...tasks, [todolistId]: []});
  }

  const addTask = (todolistId: string, title: string) => {
    const task = {id: v1(), title: title, isDone: false};
    const newTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...newTasks];
    setTasks({...tasks});

    // setTasks([{id: v1(), title: title, isDone: false}, ...tasks]);
  };

  const removeTask = (todolistId: string, taskID: string) => {
    const currentTask = tasks[todolistId];
    if (currentTask) {
      tasks[todolistId] = currentTask.filter((t) => t.id !== taskID);
      setTasks({...tasks});
    }

    // setTasks(tasks.filter((t) => t.id !== taskID));
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId));
    console.log(todolists);
  };

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const currentTask = tasks[todolistId];
    const task = currentTask.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasks});
    }

    // setTasks(tasks.map((t) => (t.id === taskId ? {...t, isDone} : t)));
  };

  const changeFilter = (todolistId: string, value: FilterValuesType) => {
    const currentTodolists = todolists.find((ctd) => ctd.id === todolistId);
    if (currentTodolists) {
      currentTodolists.filter = value;
      setTodolists([...todolists]);

      // setTodolists({...currentTodolists, filter: value});
    }
  };

  const updateTask = (todolistId: string, id: string, title: string) => {
    let currentTask = tasks[todolistId];
    if (currentTask) {
      let editableTask = tasks[todolistId].find((f) => f.id === id);
      if (editableTask) {
        editableTask.title = title;
      }
      setTasks({...tasks});
    }
  }

  const updateTodolist = (todolistId: string, id: string, title: string) => {
    let currentTodolist = todolists.find((t) => t.id === todolistId);
    if (currentTodolist) {
      currentTodolist.title = title;
      setTodolists([...todolists]);
    }
  }

  return (
    <div className="App">
      <AddItemForm addTask={addTodolist} todolistId={v1()}/>

      {todolists.map((tdM) => {
        let tasksForTodoList = tasks[tdM.id];

        if (tdM.filter === 'active') {
          tasksForTodoList = tasks[tdM.id].filter((t) => !t.isDone);
        }

        if (tdM.filter === 'completed') {
          tasksForTodoList = tasks[tdM.id].filter((t) => t.isDone);
        }

        return (
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
        );
      })}
    </div>
  );
}

export default App;
