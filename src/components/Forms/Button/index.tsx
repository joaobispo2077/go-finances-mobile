import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

export type ButtonProps = RectButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
