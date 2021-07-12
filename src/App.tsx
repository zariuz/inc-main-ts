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

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JavaScript', isDone: true},
    {id: v1(), title: 'React&Redux', isDone: false},
    {id: v1(), title: 'Quick learn HTML&CSS', isDone: true},
    {id: v1(), title: 'JavaScript for Kids', isDone: true},
    {id: v1(), title: 'Amazing React', isDone: false},
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all');

  const addTask = (title: string) => {
    // const newTask: TaskType = {
    //   id: v1(),
    //   title: title,
    //   isDone: false,
    // };
    // const copyTasks = [...tasks];
    // copyTasks.push(newTask);
    // setTasks(copyTasks);
    setTasks([{id: v1(), title: title, isDone: false}, ...tasks]);
  };

  const removeTask = (taskID: string) => {
    setTasks(tasks.filter((t) => t.id !== taskID));
  };

  let tasksForTodoList = tasks;

  if (filter === 'active') {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    // const updatedTask = tasks.map((t) => {
    //   if (t.id === taskId) {
    //     return {...t, isDone: isDone};
    //   }
    //   return t;
    // });
    // setTasks(updatedTask);
    setTasks(tasks.map((t) => (t.id === taskId ? {...t, isDone} : t)));
  };

  return (
    <div className="App">
      <Todolist
        name="Learn"
        tasks={tasksForTodoList}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
