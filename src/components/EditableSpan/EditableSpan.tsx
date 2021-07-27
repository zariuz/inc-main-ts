import React, {ChangeEvent, useState} from 'react';

type PropsType = {
  title: string;
  updateTask: (todolistId: string, id: string, title: string) => void;
  todolistId: string;
  id: string;
};

export const EditableSpan = (props: PropsType) => {
  const [title, setTitle] = useState(props.title);
  const [edit, setEdit] = useState(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onBlurHandler = () => {
    setEdit(false);
    props.updateTask(props.todolistId, props.id, title);
  };

  return edit ? (
    <input value={title} onBlur={onBlurHandler} onChange={onChangeHandler} autoFocus />
  ) : (
    <span
      onDoubleClick={() => {
        setEdit(true);
      }}>
      {props.title}
    </span>
  );
};
