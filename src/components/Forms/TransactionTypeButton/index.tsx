import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title } from './styles';

export type TransactionTypeButtonProps = RectButtonProps & {
  type: 'income' | 'outcome';
  title: string;
  isActive: boolean;
};

const iconByType = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

export function TransactionTypeButton({
  type,
  title,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={iconByType[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
