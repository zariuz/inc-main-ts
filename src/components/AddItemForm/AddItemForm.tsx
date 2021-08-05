import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from '../Button/Button';

type PropsType = {
  callback: (title: string) => void;
};

export const AddItemForm: React.FC<PropsType> = ({callback}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const changeAddTask = () => {
    //title.trim() - checking for spaces
    if (title.trim()) {
      callback(title);
    } else {
      setError(true);
    }
    setTitle('');
  };

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
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
};
