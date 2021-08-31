import React from 'react';
import { Transaction } from '../../screens/Dashboard';
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

export type TransactionCardProps = {
  transaction: Transaction;
};

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Container>
      <Title>{transaction.title}</Title>
      <Amount transactionType={transaction.type}>
        {transaction.type === 'outcome' && '-'}
        {transaction.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={transaction.category.icon} />
          <Name>{transaction.category.label}</Name>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
};
