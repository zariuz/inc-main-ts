import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default {
  title: 'API',
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': 'a581eddc-6b2a-4437-9b2a-cfc6d6cb8bb3',
  },
});

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    instance.get('/todo-lists')
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    instance.post('/todo-lists', {title: 'newTodolist'})
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '70c8c060-c9e0-4f6c-8df6-43ed89cf7e41';
    instance.delete(`/todo-lists/${todolistId}`)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '82fcf061-32a9-4a19-8be6-2f184cc611aa'
    instance.put(`/todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'})
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
