import React, {ChangeEvent, useState} from 'react';

type PropsType = {
  title: string;
  callback: (title: string) => void;
};

export const EditableSpan = (props: PropsType) => {
  const [title, setTitle] = useState(props.title);
  const [edit, setEdit] = useState(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onBlurHandler = () => {
    setEdit(false);
    props.callback(title);
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
