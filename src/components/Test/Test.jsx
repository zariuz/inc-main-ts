import React, {useEffect, useState} from 'react';
//Тут value будет равно 1

export const Test = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(1);

    return () => {
      setValue(2);
    };
  }, []);

  return <div>{value}</div>;
};
