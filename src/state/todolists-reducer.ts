import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST';
  todolistId: string;
}

export type AddTodoListAT = {
  type: 'ADD-TODOLIST';
  title: string;
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

export const todolistsReducer = (todolists: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter((tl) => tl.id !== action.todolistId)
    case 'ADD-TODOLIST':
      const newTodoList: TodolistsType = {
        id: v1(),
        title: action.title,
        filter: 'all',
      }
      return [...todolists, newTodoList]
    case 'CHANGE-TODOLIST-TITLE':
      return todolists.map((tl) => (tl.id === action.todolistId ? {...tl, title: action.title} : tl))
    case 'CHANGE-TODOLIST-FILTER':
      return todolists.map((tl) => (tl.id === action.todolistId ? {...tl, filter: action.filter} : tl))
    default:
      return todolists
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