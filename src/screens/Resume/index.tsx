import React, { useState, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';

import { HistoryCard } from '../../components/HistoryCard';
import config from '../../config';
import { categories } from '../../utils/categories';
import { Transaction } from '../Dashboard';
import { Container, Header, HistoryCardList, Title } from './styles';

type CategoryAmount = typeof categories[0] & { amount: string };

export const Resume = () => {
  const [categoriesAmount, setCategoriesAmount] = useState<CategoryAmount[]>();

  const loadTransactionsTotalByCategory = async () => {
    const transactionsKey = config.asyncStorage.keys.transactions;

    const response = await AsyncStorage.getItem(transactionsKey);
    if (response) {
      const recoveredTransactions =
        (JSON.parse(response) as Transaction[]) || [];

      const categoriesTotal = categories
        .map((category) => {
          const transactionsByCategory = recoveredTransactions.filter(
            (transaction) =>
              transaction.category === category.key &&
              transaction.type === 'outcome',
          );

          const amount = transactionsByCategory.reduce(
            (total, transaction) => total + Number(transaction.amount),
            0,
          );

          return { ...category, amount: String(amount) };
        })
        .filter((category) => category.amount !== '0');

      setCategoriesAmount(categoriesTotal);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactionsTotalByCategory();
    }, []),
  );
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <HistoryCardList>
        {categoriesAmount?.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.amount}
            color={category.color}
          />
        ))}
      </HistoryCardList>
    </Container>
  );
};
