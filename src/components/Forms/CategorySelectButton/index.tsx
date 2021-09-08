import React from 'react';

import { Container, Title, Icon } from './styles';

export type CategorySelectButtonProps = {
  title: string;
  onPress: () => void;
};

export const CategorySelectButton = ({
  title,
  onPress,
}: CategorySelectButtonProps) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <Icon name="chevron-down" />
    </Container>
  );
};
