import React, {useEffect, useState} from 'react'
import {taskAPI} from '../api/task-api';

export default {
  title: 'API Task',
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'a527dedd-6141-47de-a95e-0fc2395d3b35'
    taskAPI.getTasks(todolistId)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'a527dedd-6141-47de-a95e-0fc2395d3b35'
    const title = 'Vue.js!'
    taskAPI.createTask(todolistId, title)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'a527dedd-6141-47de-a95e-0fc2395d3b35';
    const taskId = '3a7e9c18-0b3d-40e2-817a-10ba648aadef'
    taskAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'a527dedd-6141-47de-a95e-0fc2395d3b35'
    const model = {
      title: 'Node.JS',
      description: 'Node.JS',
      status: 1,
      priority: 1,
      startDate: '2021',
      deadline: '2022',
    }
    const taskId = '77f81b01-2039-4550-91c1-cb784778d0eb'

    taskAPI.updateTask(todolistId, taskId, model)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
