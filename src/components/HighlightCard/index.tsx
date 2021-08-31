import React from 'react';
import {
  Container,
  Header,
  Title,
  TransactionIcon,
  Footer,
  Amount,
  LastTransaction,
} from './styles';

export const HighlightCard = () => {
  return (
    <Container>
      <Header>
        <Title>Entradas</Title>
        <TransactionIcon name="arrow-up-circle" />
      </Header>
      <Footer>
        <Amount>R$ 17.400,00</Amount>
        <LastTransaction>última entrada dia 13 de abril</LastTransaction>
      </Footer>
    </Container>
  );
};
