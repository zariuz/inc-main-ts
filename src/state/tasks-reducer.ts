import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';

export type RemoveTaskAT = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string;
}

export type AddTaskAT = {
  type: 'ADD-TASK';
  title: string;
  todolistId: string;
}

export type ChangeTaskStatusAT = {
  type: 'CHANGE-TASK-STATUS';
  taskId: string;
  isDone: boolean;
  todolistId: string;
}

export type ChangeTaskTitleAT = {
  type: 'CHANGE-TASK-TITLE';
  todolistId: string;
  taskId: string;
  title: string;
}

export type ActionType =
  RemoveTaskAT
  | AddTaskAT
  | ChangeTaskStatusAT
  | ChangeTaskTitleAT
  | AddTodoListAT
  | RemoveTodoListAT

const initialState:TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId)}
    case 'ADD-TASK':
      return {
        ...state,
        [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]],
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map((t) => (t.id === action.taskId ? {...t, isDone: action.isDone} : t)),
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? {...t, title: action.title} : t,
        ),
      }
    case 'ADD-TODOLIST':
      return {
        ...state, [action.todolistId]: [],
      }
    case 'REMOVE-TODOLIST': {
      let copyState = {...state}
      delete copyState[action.todolistId]
      return copyState
    }
    default:
      return state
  }
}

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => (
  {
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId,
  }
)

export const AddTaskAC = (title: string, todolistId: string): AddTaskAT => (
  {
    type: 'ADD-TASK',
    title,
    todolistId,
  }
)

export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => (
  {
    type: 'CHANGE-TASK-STATUS',
    taskId,
    isDone,
    todolistId,
  }
)

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAT => (
  {
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    title,
  }
)
