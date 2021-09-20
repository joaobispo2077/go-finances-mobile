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

export interface HighlightHeader {
  amount: string;
  lastDate: string | undefined;
}
export interface HighlightTransactions {
  income: HighlightHeader;
  outcome: HighlightHeader;
  total: HighlightHeader;
}

export function Dashboard() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [highlightTransactions, setHighlightTransactions] =
    useState<HighlightTransactions>({
      income: {
        amount: '',
        lastDate: '',
      },
      outcome: {
        amount: '',
        lastDate: '',
      },
      total: {
        amount: '',
        lastDate: '',
      },
    });

  const formatToCurrency = (value: number | string): string => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const loadTransactionsHighlight = (recoveredTransactions: Transaction[]) => {
    const transactionsHeaders = recoveredTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += Number(transaction.amount);
        }

        if (transaction.type === 'outcome') {
          acc.outcome += Number(transaction.amount);
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const lastIncome = recoveredTransactions
      .reverse()
      .find((transaction) => transaction.type === 'income');

    const lastOutcome = recoveredTransactions
      .reverse()
      .find((transaction) => transaction.type === 'outcome');

    const totalTransactionsCurrency =
      transactionsHeaders.income - transactionsHeaders.outcome;

    setHighlightTransactions({
      income: {
        amount: formatToCurrency(transactionsHeaders.income),
        lastDate: lastIncome?.date,
      },
      outcome: {
        amount: formatToCurrency(transactionsHeaders.outcome),
        lastDate: lastOutcome?.date,
      },
      total: {
        amount: formatToCurrency(totalTransactionsCurrency),
        lastDate: lastIncome?.date,
      },
    });
  };

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

      loadTransactionsHighlight(recoveredTransactions);
      setTransactions(formattedTransaction);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
          amount={highlightTransactions?.income?.amount}
          lastTransaction={'última entrada dia 13 de abril'}
        />
        <HighlightCard
          card="outcome"
          title={'Saídas'}
          amount={highlightTransactions?.outcome?.amount}
          lastTransaction={'última entrada dia 19 de abril'}
        />
        <HighlightCard
          card="total"
          title={'Total'}
          amount={highlightTransactions?.total?.amount}
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
