import React from 'react';
import { Container, Title, Icon } from './styles';

export type CategorySelectProps = {
  title: string;
};
export const CategorySelect = ({ title }: CategorySelectProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Icon name="chevron-down" />
    </Container>
  );
};
