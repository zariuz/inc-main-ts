import {instance} from './axios';

export type TodolistsType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type ResponseTodoType<T> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: T
}

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistsType[]>(`todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<ResponseTodoType<{ item: TodolistsType }>>(`todo-lists`, {title: title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseTodoType<{}>>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseTodoType<{}>>(`todo-lists/${todolistId}`, {title: title})
  },
}
