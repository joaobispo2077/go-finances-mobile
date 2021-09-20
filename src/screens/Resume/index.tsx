import React from 'react';

import { HistoryCard } from '../../components/HistoryCard';
import { Container, Header, Title } from './styles';

export const Resume = () => {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <HistoryCard title="compras" amount="150" color="red" />
    </Container>
  );
};
