import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
      setTransactions(formattedTransaction);
    }
  };
  React.useEffect(() => {
    loadTransactions();
  }, []);

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
