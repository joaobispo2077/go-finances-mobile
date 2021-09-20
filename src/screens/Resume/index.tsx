import React, { useState, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';

import { HistoryCard } from '../../components/HistoryCard';
import config from '../../config';
import { categories } from '../../utils/categories';
import { formatToCurrency } from '../../utils/currency';
import { Transaction } from '../Dashboard';
import { Container, Header, HistoryCardList, Title } from './styles';

type CategoryAmount = typeof categories[0] & { amount: string };

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] =
    useState<CategoryAmount[]>();

  const loadTransactionsTotalByCategory = async () => {
    const transactionsKey = config.asyncStorage.keys.transactions;

    const response = await AsyncStorage.getItem(transactionsKey);
    if (response) {
      const recoveredTransactions =
        (JSON.parse(response) as Transaction[]) || [];

      const outcomeTransactions = recoveredTransactions.filter(
        (transaction) => transaction.type === 'outcome',
      );

      const categoriesTotal = categories.map((category) => {
        const transactionsByCategory = outcomeTransactions.filter(
          (transaction) => transaction.category === category.key,
        );

        const categoryAmount = transactionsByCategory.reduce(
          (total, transaction) => total + Number(transaction.amount),
          0,
        );

        return { ...category, amount: formatToCurrency(categoryAmount) };
      });

      const filteredCategoriesTotal = categoriesTotal.filter(
        (category) => category.amount !== formatToCurrency('0'),
      );

      setTotalByCategories(filteredCategoriesTotal);
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
        {totalByCategories?.map((category) => (
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
