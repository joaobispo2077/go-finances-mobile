/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/core';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import { useAuth } from '../../hooks/useAuth';
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
  LoadingContainer,
} from './styles';

type CategoryAmount = typeof categories[0] & {
  amount: number;
  percent: string;
};

export const Resume = () => {
  const theme = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] =
    useState<CategoryAmount[]>();

  const isOutcomeTransaction = (transaction: Transaction): boolean =>
    transaction.type === 'outcome';

  const isTransactionInSelectedMonth = (transaction: Transaction): boolean =>
    new Date(transaction.date).getMonth() === new Date(selectedDate).getMonth();

  const isTransactionInSelectedYear = (transaction: Transaction): boolean =>
    new Date(transaction.date).getFullYear() ===
    new Date(selectedDate).getFullYear();

  const loadTransactionsTotalByCategory = async () => {
    setIsLoading(true);

    const transactionsKey = `@gofinances:transactions_user:${user.email}`;

    const response = await AsyncStorage.getItem(transactionsKey);
    if (response) {
      const recoveredTransactions =
        (JSON.parse(response) as Transaction[]) || [];

      const outcomeTransactions = recoveredTransactions.filter(
        (transaction) =>
          isOutcomeTransaction(transaction) &&
          isTransactionInSelectedMonth(transaction) &&
          isTransactionInSelectedYear(transaction),
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
      setIsLoading(false);
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
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large" />
        </LoadingContainer>
      ) : (
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: bottomTabBarHeight,
            }}
          >
            <MonthSelect>
              <MonthSelectButton
                onPress={() => handleChangeSelectedDate('prev')}
              >
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>
              <MonthTitle>{formatDateLong(selectedDate)}</MonthTitle>
              <MonthSelectButton
                onPress={() => handleChangeSelectedDate('next')}
              >
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories?.map(
                  (category) => category.color,
                )}
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
        </>
      )}
    </Container>
  );
};
