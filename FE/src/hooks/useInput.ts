import { useState } from 'react';

const useInput = <T extends HTMLInputElement | HTMLTextAreaElement>(
  initialState: string
) => {
  const [value, setValue] = useState(initialState);
  const onChange = (e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  };

  return { value, onChange, setValue };
};

export default useInput;
