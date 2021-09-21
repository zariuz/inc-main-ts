import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a581eddc-6b2a-4437-9b2a-cfc6d6cb8bb3',
  },
});

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type ResponseType<D> = {
  resultCode: number
  messages: Array<string>
  data: D
}

export const todolistAPI = {
  getTodos() {
    return instance.get<TodolistType[]>(`todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
  },
}
