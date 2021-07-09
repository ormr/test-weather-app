import React from 'react';
import { FormControl } from 'react-bootstrap';

interface InputProps {
  value: string;
  type?: string;
  placeHolder?: string;
  required?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  type,
  placeHolder,
  required,
  name,
  onChange,
  onKeyPress,
}) => {
  return (
    <FormControl
      placeholder={placeHolder}
      value={value}
      type={type}
      name={name}
      onChange={onChange}
      onKeyPress={onKeyPress}
      required={required}
    />
  );
};
