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
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCardList>
    </Container>
  );
}
