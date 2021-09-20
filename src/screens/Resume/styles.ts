import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;

  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.background};
`;

export const HistoryCardList = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
