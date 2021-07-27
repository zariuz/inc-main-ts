import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import {Button} from '../Button/Button';
import './Todolist.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';

type TodolistPropsType = {
  titleName: string;
  todolistId: string;
  tasks: Array<TaskType>;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
  filter: FilterValuesType;
  updateTask: (todolistId: string, id: string, title: string) => void;
  updateTodolist: (todolistId: string, id: string, title: string) => void;
};

const Todolist = ({
  titleName,
  todolistId,
  tasks,
  addTask,
  removeTask,
  removeTodolist,
  changeFilter,
  changeTaskStatus,
  filter,
  updateTask,
  updateTodolist,
}: TodolistPropsType) => {

  const generalOnClickHandler = (value: FilterValuesType) => {
    changeFilter(todolistId, value);
  };

  const onClickRemoveTodolist = () => removeTodolist(todolistId);

  const tasksElement = tasks.map((t) => {
    const onClickRemoveTask = () => removeTask(todolistId, t.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
    };

    return (
      <li key={t.id}>
        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
        <EditableSpan
          title={t.title}
          updateTask={updateTask}
          todolistId={todolistId}
          id={t.id}
        />
        <Button callback={onClickRemoveTask} buttonName={'X'}/>
      </li>
    );
  });

  return (
    <div>
      <div className="titleName">
        <h3>
          <EditableSpan
            title={titleName}
            updateTask={updateTodolist}
            todolistId={todolistId}
            id={''}
          />
        </h3>
        <Button callback={onClickRemoveTodolist} buttonName={'X'}/>
      </div>

      <AddItemForm addTask={addTask} todolistId={todolistId}/>

      <ul>{tasksElement}</ul>
      <div>
        <Button
          buttonName={'All'}
          callback={() => generalOnClickHandler('all')}
          style={filter === 'all' ? 'active-filter' : ''}
        />
        <Button
          buttonName={'Active'}
          callback={() => generalOnClickHandler('active')}
          style={filter === 'active' ? 'active-filter' : ''}
        />
        <Button
          buttonName={'Completed'}
          callback={() => generalOnClickHandler('completed')}
          style={filter === 'completed' ? 'active-filter' : ''}
        />
      </div>
    </div>
  );
};

export default Todolist;
