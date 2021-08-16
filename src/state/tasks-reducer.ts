export const tasksReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return state
    }
    default:
      return state
  }
}

export const removeTaskAC = () => {
  return {
    type: 'REMOVE-TASK'
  }
}