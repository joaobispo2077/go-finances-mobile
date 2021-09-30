import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/useAuth';
import { formatToCurrency } from '../../utils/currency';
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
  LoadingContainer,
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
  lastDate: string;
}
export interface HighlightTransactions {
  income: HighlightHeader;
  outcome: HighlightHeader;
  total: HighlightHeader;
}

export function Dashboard() {
  const { user, signOut } = useAuth();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
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

  const defaultAvatar = `https://ui-avatars.com/api/?name=${
    user.name
  }&background=${theme.colors.secondary.replace(
    '#',
    '',
  )}&color=${theme.colors.primary.replace('#', '')}&length=1`;

  const formatToLongDate = (value: string | number | Date): string => {
    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
    }).format(new Date(value));
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

    const filteredIncomes = recoveredTransactions.filter(
      (transaction) => transaction.type === 'income',
    );
    const lastIncome =
      filteredIncomes && filteredIncomes.length > 0
        ? Math.max(
            ...filteredIncomes.map((transaction) =>
              new Date(transaction.date).getTime(),
            ),
          )
        : 0;

    const filteredOutcomes = recoveredTransactions.filter(
      (transaction) => transaction.type === 'outcome',
    );
    const lastOutcome =
      filteredOutcomes && filteredOutcomes.length > 0
        ? Math.max(
            ...filteredOutcomes.map((transaction) =>
              new Date(transaction.date).getTime(),
            ),
          )
        : 0;

    const totalTransactionsCurrency =
      transactionsHeaders.income - transactionsHeaders.outcome;

    const lastDate = Math.max(lastIncome, lastOutcome);
    const firstDate = Math.min(
      Math.min(
        ...recoveredTransactions
          .filter((transaction) => transaction.type === 'income')
          .map((transaction) => new Date(transaction.date).getTime()),
      ),
      Math.min(
        ...recoveredTransactions
          .filter((transaction) => transaction.type === 'outcome')
          .map((transaction) => new Date(transaction.date).getTime()),
      ),
    );

    const intervalTotal = `${formatToLongDate(firstDate)} à ${formatToLongDate(
      lastDate,
    )}`;
    console.log('running', transactionsHeaders);

    setHighlightTransactions({
      income: {
        amount: formatToCurrency(transactionsHeaders.income),
        lastDate:
          lastIncome === 0
            ? 'Não há transações'
            : `Última entrada dia ${formatToLongDate(lastIncome)}`,
      },
      outcome: {
        amount: formatToCurrency(transactionsHeaders.outcome),
        lastDate:
          lastOutcome === 0
            ? 'Não há transações'
            : `Última saída dia ${formatToLongDate(lastOutcome)}`,
      },
      total: {
        amount: formatToCurrency(totalTransactionsCurrency),
        lastDate: intervalTotal,
      },
    });
  };

  const loadTransactions = async () => {
    const collectionKey = `@gofinances:transactions_user:${user.email}`;

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
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large" />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Avatar
                  source={{
                    uri: user.photo || defaultAvatar,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCardList>
            <HighlightCard
              card="income"
              title={'Entradas'}
              amount={highlightTransactions?.income?.amount}
              lastTransaction={highlightTransactions?.income?.lastDate}
            />
            <HighlightCard
              card="outcome"
              title={'Saídas'}
              amount={highlightTransactions?.outcome?.amount}
              lastTransaction={highlightTransactions?.outcome?.lastDate}
            />
            <HighlightCard
              card="total"
              title={'Total'}
              amount={highlightTransactions?.total?.amount}
              lastTransaction={highlightTransactions?.total?.lastDate || ''}
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
        </>
      )}
    </Container>
  );
}
