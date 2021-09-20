import React, { useState, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserInfo,
  User,
  Avatar,
  UserGreeting,
  UserName,
  UserWrapper,
  LogoutButton,
  Icon,
  HighlightCardList,
  Transactions,
  Title,
  TransactionList,
} from './styles';

export interface Transaction {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
  type: 'income' | 'outcome';
}

export function Dashboard() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [incomeTransactionsBalance, setIncomeTransactionsBalance] =
    useState('');
  const [outcomeTransactionsBalance, setOutcomeTransactionsBalance] =
    useState('');
  const [totalTransactionsBalance, setTotalTransactionsBalance] = useState('');

  const loadTransactions = async () => {
    const collectionKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(collectionKey);
    if (response) {
      const recoveredTransactions =
        (JSON.parse(response) as Transaction[]) || [];

      const formattedTransaction = recoveredTransactions.map((transaction) => ({
        ...transaction,
        amount: Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date: Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date)),
      }));

      const transactionsHeaders = recoveredTransactions.reduce(
        (acc, transaction) => {
          if (transaction.type === 'income') {
            acc.total += Number(transaction.amount);
            acc.income += Number(transaction.amount);
          }

          if (transaction.type === 'outcome') {
            acc.total -= Number(transaction.amount);
            acc.outcome -= Number(transaction.amount);
          }

          return acc;
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      );

      setIncomeTransactionsBalance(
        Number(transactionsHeaders.income).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      );

      setOutcomeTransactionsBalance(
        Number(transactionsHeaders.outcome).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      );

      setTotalTransactionsBalance(
        Number(transactionsHeaders.total).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      );

      setTransactions(formattedTransaction);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

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
          <LogoutButton>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCardList>
        <HighlightCard
          card="income"
          title={'Entradas'}
          amount={incomeTransactionsBalance}
          lastTransaction={'última entrada dia 13 de abril'}
        />
        <HighlightCard
          card="outcome"
          title={'Saídas'}
          amount={outcomeTransactionsBalance}
          lastTransaction={'última entrada dia 19 de abril'}
        />
        <HighlightCard
          card="total"
          title={'Total'}
          amount={totalTransactionsBalance}
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
