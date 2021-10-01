import {TodolistsType} from '../api/todolist-api';

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

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    case 'REMOVE-TODOLIST':
      return state.filter((tl) => tl.id !== action.todolistId)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((tl) => (tl.id === action.todolistId ? {...tl, title: action.title} : tl))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((tl) => (tl.id === action.todolistId ? {...tl, filter: action.filter} : tl))
    default:
      return state
  }
}

// actions
export const setTodolistsAC = (todolists: Array<TodolistsType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (todolist: TodolistsType) => ({type: 'ADD-TODOLIST', todolist} as const)

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

// thunks

// types
// Типизируем сразу возвращаемый тип, плюс сокращаем код.
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

type ActionType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodoListTitleAT
  | ChangeTodoListFilterAT
  | SetTodolistsActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistsType & {
  filter: FilterValuesType
}


