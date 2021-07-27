import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from '../Button/Button';

type PropsType = {
  todolistId: string;
  addTask: (todolistId: string ,title: string) => void;
};

export const AddItemForm: React.FC<PropsType> = ({ addTask, todolistId }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const changeAddTask = () => {
    //title.trim() - checking for spaces
    if (title.trim()) {
      addTask(todolistId, title);
    } else {
      setError(true);
    }
    setTitle('');
  };

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError(false);
  };

  const onKeyEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      changeAddTask();
    }
  };

  return (
    <div>
      <input
        value={title}
        onChange={onTitleChangeHandler}
        onKeyPress={onKeyEnterHandler}
        className={error ? 'error' : ''}
      />
      <Button callback={changeAddTask} buttonName={'+'} />
      {error && <div className="error-message">Title is required!</div>}
    </div>
  );
}
