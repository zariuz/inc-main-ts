import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button, TextField} from '@material-ui/core';
import styles from './AddItemForm.module.css';

type PropsType = {
  callback: (title: string) => void;
};

export const AddItemForm: React.FC<PropsType> = React.memo(({callback}) => {
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
      <TextField
        id="outlined-basic"
        label={error ? 'Title is required' : 'Title'}
        variant="outlined"
        size="small"
        value={title}
        onChange={onTitleChangeHandler}
        onKeyPress={onKeyEnterHandler}
        className={error ? 'error' : ''}
        error={!!error}
      />

      <Button
        className={styles.currentButton}
        variant="contained"
        color="primary"
        onClick={changeAddTask}
        style={{
          maxWidth: '38px',
          maxHeight: '38px',
          minWidth: '38px',
          minHeight: '38px',
        }}>
        +
      </Button>
    </div>
  );
});
