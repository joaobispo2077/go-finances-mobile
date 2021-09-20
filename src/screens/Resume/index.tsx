import React, { useState, useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import config from '../../config';
import { categories } from '../../utils/categories';
import { formatToCurrency } from '../../utils/currency';
import { Transaction } from '../Dashboard';
import {
  ChartContainer,
  Container,
  Header,
  HistoryCardList,
  Title,
} from './styles';

type CategoryAmount = typeof categories[0] & {
  amount: number;
  percent: string;
};

export const Resume = () => {
  const theme = useTheme();

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

      const outcomeTotal = outcomeTransactions.reduce(
        (accumulator, transaction) => accumulator + Number(transaction.amount),
        0,
      );

      const categoriesTotal = categories.map((category) => {
        const transactionsByCategory = outcomeTransactions.filter(
          (transaction) => transaction.category === category.key,
        );

        const categoryAmount = transactionsByCategory.reduce(
          (total, transaction) => total + Number(transaction.amount),
          0,
        );

        const percent = ((categoryAmount / outcomeTotal) * 100).toFixed(2);

        return {
          ...category,
          amount: Number(categoryAmount),
          percent: `${percent}%`,
        };
      });

      const filteredCategoriesTotal = categoriesTotal.filter(
        (category) => category.amount !== 0,
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
      <ChartContainer>
        <VictoryPie
          data={totalByCategories}
          colorScale={totalByCategories?.map((category) => category.color)}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape,
            },
          }}
          labelRadius={50}
          x="percent"
          y="amount"
        />
      </ChartContainer>
      <HistoryCardList>
        {totalByCategories?.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={formatToCurrency(category.amount)}
            color={category.color}
          />
        ))}
      </HistoryCardList>
    </Container>
  );
};
