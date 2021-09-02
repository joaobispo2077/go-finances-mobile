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

export const Form = styled.View`
  flex: 1;

  width: 100%;

  padding: ${RFValue(24)}px;

  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionTypeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-top: ${RFValue(8)}px;
`;
