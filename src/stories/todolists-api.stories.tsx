import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
  title: 'API Todo',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodos()
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.createTodolist('newTodolist')
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '82fcf061-32a9-4a19-8be6-2f184cc611aa';
    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '8df6e4f4-9b90-4813-b660-df42e4a3aacc'
    todolistAPI.updateTodolist(todolistId, 'REACT!!!!!')
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
