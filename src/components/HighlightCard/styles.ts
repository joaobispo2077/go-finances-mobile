import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { HighlightCardProps } from '.';

export type TransactionCardStyleProps = {
  card: HighlightCardProps['card'];
};

export const Container = styled.View<TransactionCardStyleProps>`
  background-color: ${({ theme, card }) =>
    card === 'total' ? theme.colors.secondary : theme.colors.shape};
  width: ${RFValue(300)}px;
  height: ${RFValue(200)}px;

  border-radius: ${RFValue(5)}px;

  padding: ${RFValue(19)}px ${RFValue(23)}px;
  padding-bottom: ${RFValue(42)}px;

  justify-content: space-between;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TransactionCardStyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
  color: ${({ theme, card }) =>
    card === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const TransactionIcon = styled(Feather)<TransactionCardStyleProps>`
  font-size: ${RFValue(40)}px;

  ${({ card }) =>
    card === 'income' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ card }) =>
    card === 'outcome' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}

  ${({ card }) =>
    card === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View`
  width: 100%;
  margin-top: ${RFValue(38)}px;
`;

export const Amount = styled.Text<TransactionCardStyleProps>`
  color: ${({ theme, card }) =>
    card === 'total' ? theme.colors.shape : theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  line-height: ${RFValue(48)}px;
`;

export const LastTransaction = styled.Text<TransactionCardStyleProps>`
  color: ${({ theme, card }) =>
    card === 'total' ? theme.colors.shape : theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(18)}px;
`;
