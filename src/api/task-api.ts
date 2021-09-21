import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a581eddc-6b2a-4437-9b2a-cfc6d6cb8bb3',
  },
});

type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: number
  deadline: number
  id: string
  todoListId: string
  order: number
  addedDate: number
}

type TasksType = {
  items: Array<TaskType>
  totalCount: number
  error: string
}

type ResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: T
}

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType>(`/todo-lists/${todolistId}/tasks`, {title: title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, title: string, taskId: string) {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
  },
}