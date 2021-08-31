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
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard() {
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
          <Icon name="power" />
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
    </Container>
  );
}
