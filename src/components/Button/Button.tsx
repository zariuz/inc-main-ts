import React from 'react';

export type ButtonPropsType = {
  buttonName: string;
  callback: () => void;
  style?: string;
};

export const Button: React.FC<ButtonPropsType> = ({callback, buttonName, style}) => {
  return (
    <button onClick={callback} className={style}>
      {buttonName}
    </button>
  );
};
