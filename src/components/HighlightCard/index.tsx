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

export type HighlightCardProps = {
  title: string;
  amount: string;
  lastTransaction: string;
  card: 'income' | 'outcome' | 'total';
};

const iconByCard: Record<HighlightCardProps['card'], string> = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  total: 'dollar-sign',
};

export const HighlightCard = ({
  title,
  amount,
  lastTransaction,
  card,
}: HighlightCardProps) => {
  return (
    <Container card={card}>
      <Header>
        <Title card={card}>{title}</Title>
        <TransactionIcon name={iconByCard[card]} card={card} />
      </Header>
      <Footer>
        <Amount card={card}>{amount}</Amount>
        <LastTransaction card={card}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};
