import React from 'react';

import {
  Container,
  Header,
  UserInfo,
  User,
  Avatar,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCardList,
  Transactions,
  Title,
  TransactionList,
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

export interface Category {
  icon: string;
  label: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: string;
  category: Category;
  date: string;
  type: 'income' | 'outcome';
}

export function Dashboard() {
  const transactions: Transaction[] = [
    {
      id: '1',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        icon: 'dollar-sign',
        label: 'Vendas',
      },
      date: '20/04/2020',
      type: 'income',
    },
    {
      id: '2',
      title: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      category: {
        icon: 'coffee',
        label: 'Alimentação',
      },
      date: '10/04/2020',
      type: 'outcome',
    },
    {
      id: '3',
      title: 'Aluguel',
      amount: 'R$ 1.200,00',
      category: {
        icon: 'home',
        label: 'Casa',
      },
      date: '10/04/2020',
      type: 'outcome',
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Avatar source={{ uri: 'https://github.com/joaobispo2077.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>João</UserName>
            </User>
          </UserInfo>
          <Icon icon="power" />
        </UserWrapper>
      </Header>

      <HighlightCardList>
        <HighlightCard
          card="income"
          title={'Entradas'}
          amount={'R$ 17.400,00'}
          lastTransaction={'última entrada dia 13 de abril'}
        />
        <HighlightCard
          card="outcome"
          title={'Saídas'}
          amount={'R$ 10.000,00'}
          lastTransaction={'última entrada dia 19 de abril'}
        />
        <HighlightCard
          card="total"
          title={'Total'}
          amount={'R$ 7.000,00'}
          lastTransaction={'01 à 16 de abril'}
        />
      </HighlightCardList>
      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />
      </Transactions>
    </Container>
  );
}
