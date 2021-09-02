import React, {ChangeEvent} from 'react';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskType} from '../../AppWithRedux';
import {EditableSpan} from '../EditableSpan/EditableSpan';


export type TaskPropsType = {
  task: TaskType
  todolistId: string
  removeTask: (taskId: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  updateTask: (todolistId: string, taskId: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({
  task,
  removeTask,
  changeTaskStatus,
  updateTask,
  todolistId,
}) => {
  const onClickRemoveTask = () => removeTask(task.id, todolistId);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(task.id, e.currentTarget.checked, todolistId);
  };
  const updateTaskHandler = (title: string) => {
    updateTask(todolistId, task.id, title);
  };

  return (
    <li key={task.id} className={'todo__item'}>
      <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
      <EditableSpan title={task.title} callback={updateTaskHandler}/>
      <IconButton onClick={onClickRemoveTask} aria-label="delete">
        <Delete fontSize="medium"/>
      </IconButton>
    </li>
  );
})