/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/core';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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
  Content,
  Title,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  MonthTitle,
} from './styles';

type CategoryAmount = typeof categories[0] & {
  amount: number;
  percent: string;
};

export const Resume = () => {
  const theme = useTheme();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] =
    useState<CategoryAmount[]>();

  const loadTransactionsTotalByCategory = async () => {
    const transactionsKey = config.asyncStorage.keys.transactions;

    const response = await AsyncStorage.getItem(transactionsKey);
    if (response) {
      const recoveredTransactions =
        (JSON.parse(response) as Transaction[]) || [];

      const outcomeTransactions = recoveredTransactions.filter(
        (transaction) =>
          transaction.type === 'outcome' &&
          new Date(transaction.date).getMonth() ===
            new Date(selectedDate).getMonth() &&
          new Date(transaction.date).getFullYear() ===
            new Date(selectedDate).getFullYear(),
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

  const formatDateLong = (date: Date) => {
    return format(date, 'MMMM, yyyy', { locale: ptBR });
  };

  const handleChangeSelectedDate = (changer: 'prev' | 'next') => {
    if (changer === 'prev') {
      setSelectedDate((previousDate) => addMonths(previousDate, 1));
    }

    if (changer === 'next') {
      setSelectedDate((previousDate) => subMonths(previousDate, 1));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactionsTotalByCategory();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]),
  );
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleChangeSelectedDate('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>
          <MonthTitle>{formatDateLong(selectedDate)}</MonthTitle>
          <MonthSelectButton onPress={() => handleChangeSelectedDate('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

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
        {totalByCategories?.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={formatToCurrency(category.amount)}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
};
