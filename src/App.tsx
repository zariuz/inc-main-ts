import React, {useState} from 'react';
import Todolist from './Todolist';
import './App.css';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JavaScript', isDone: true},
    {id: 3, title: 'React&Redux', isDone: false},
    {id: 4, title: 'Quick learn HTML&CSS', isDone: true},
    {id: 5, title: 'JavaScript for Kids', isDone: true},
    {id: 6, title: 'Amazing React', isDone: false},
  ]);

  const removeTask = (taskID: number) => {
    setTasks(tasks.filter((t) => t.id !== taskID));
  };

  return (
    <div className="App">
      <Todolist title="Learn" tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
