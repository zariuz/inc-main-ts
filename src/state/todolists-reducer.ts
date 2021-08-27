import {FilterValuesType, TodolistsType} from '../AppWithRedux';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST';
  todolistId: string;
}

export type AddTodoListAT = {
  type: 'ADD-TODOLIST';
  title: string;
  todolistId: string;
}

export type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE';
  todolistId: string;
  title: string;
}

export type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER';
  todolistId: string;
  filter: FilterValuesType;
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((tl) => tl.id !== action.todolistId)
    case 'ADD-TODOLIST':
      return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((tl) => (tl.id === action.todolistId ? {...tl, title: action.title} : tl))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((tl) => (tl.id === action.todolistId ? {...tl, filter: action.filter} : tl))
    default:
      return state
  }
}

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListAT => (
  {
    type: 'REMOVE-TODOLIST',
    todolistId: todolistId,
  }
)

export const AddTodoListAC = (title: string): AddTodoListAT => (
  {
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1(),
  }
)

export const ChangeTodoListTitleAC = (todolistId: string, title: string): ChangeTodoListTitleAT => (
  {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: todolistId,
    title: title,
  }
)

export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterAT => (
  {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: todolistId,
    filter: filter,
  }
)
