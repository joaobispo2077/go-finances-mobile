import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input, InputProps } from '../Input';
import { Container } from './styles';

export type InputFormProps = InputProps & {
  control: Control;
  name: string;
};

export const InputForm = ({ control, name, ...rest }: InputFormProps) => {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
    </Container>
  );
};
