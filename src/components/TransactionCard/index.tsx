import React from 'react';

import { Transaction } from '../../screens/Dashboard';
import { categories } from '../../utils/categories';
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
  const category = categories.find(
    (category) => category.key === transaction.category,
  );

  return (
    <Container>
      <Title>{transaction.title}</Title>
      <Amount transactionType={transaction.type}>
        {transaction.type === 'outcome' && '- '}
        {transaction.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <Name>{category?.name}</Name>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
};
