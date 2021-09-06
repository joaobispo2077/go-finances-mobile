import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { Input, InputProps } from '../Input';
import { Container, Error } from './styles';

export type InputFormProps = InputProps & {
  control: Control;
  name: string;
  error: string;
};

export const InputForm = ({
  control,
  name,
  error,
  ...rest
}: InputFormProps) => {
  return (
    <Container>
      {error && <Error>{error}</Error>}
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
