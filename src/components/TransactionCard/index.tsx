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

export interface Category {
  name: string;
  label: string;
}

export interface Transaction {
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export type TransactionCardProps = {
  transaction: Transaction;
};

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Container>
      <Title>{transaction.title}</Title>
      <Amount>{transaction.amount}</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <Name>{transaction.category.label}</Name>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
};
