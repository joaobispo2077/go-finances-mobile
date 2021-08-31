import React from 'react';
import {
  Container,
  Title,
  Amount,
  Footer,
  Icon,
  Category,
  Name,
  Date,
} from './styles';

export const TransactionCard = () => {
  return (
    <Container>
      <Title>Desenvolvimento de site</Title>
      <Amount>R$ 12.000,00</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <Name>Vendas</Name>
        </Category>
        <Date>13/04/2020</Date>
      </Footer>
    </Container>
  );
};
