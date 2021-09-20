import React from 'react';

import { Container, Title, Amount } from './styles';

export type HistoryCardProps = {
  title: string;
  amount: string;
  color: string;
};

export const HistoryCard = ({ title, amount, color }: HistoryCardProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
