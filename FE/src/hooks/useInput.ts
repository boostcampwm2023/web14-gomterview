import { useEffect, useState } from 'react';

const useInput = <T extends HTMLInputElement | HTMLTextAreaElement>(
  initialState: string
) => {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    setValue(initialState);
  }, [initialState]);

  const onChange = (e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  };

  const isEmpty = () => {
    return value === '';
  };

  const clearInput = () => {
    setValue('');
  };

  return { value, onChange, setValue, isEmpty, clearInput };
};

export default useInput;
