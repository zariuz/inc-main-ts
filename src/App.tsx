import React, {useState} from 'react';
import Todolist from './components/Todolist/Todolist';
import './App.css';
import {v1} from 'uuid';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';
type todolistsType = {id: string; title: string; filter: FilterValuesType};

export type tasksGeneralType = {[key: string]: Array<TaskType>};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ]);

  let [tasks, setTasks] = useState<tasksGeneralType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'HTML&CSS2', isDone: true},
      {id: v1(), title: 'JS2', isDone: true},
      {id: v1(), title: 'ReactJS2', isDone: false},
      {id: v1(), title: 'Rest API2', isDone: false},
      {id: v1(), title: 'GraphQL2', isDone: false},
    ],
  });

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

  return (
    <div className="App">
      {todolists.map((tdM) => {
        let tasksForTodoList = tasks[tdM.id];

        if (tdM.filter === 'active') {
          tasksForTodoList = tasks[tdM.id].filter((t) => t.isDone === false);
        }

        if (tdM.filter === 'completed') {
          tasksForTodoList = tasks[tdM.id].filter((t) => t.isDone === true);
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
          />
        );
      })}
    </div>
  );
}

export default App;
