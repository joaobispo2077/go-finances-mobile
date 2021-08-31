import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Transaction } from '.';

export type TransactionCardStyleProps = {
  transactionType: Transaction['type'];
};

const amountColorByTransactionType = {
  income: 'success',
  outcome: 'attention',
} as const;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};

  padding: ${RFValue(18)}px ${RFValue(24)}px;

  border-radius: ${RFValue(5)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text<TransactionCardStyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(30)}px;

  color: ${({ theme, transactionType }) => {
    const selectedTransactionType =
      amountColorByTransactionType[transactionType];

    return theme.colors[selectedTransactionType ?? 'text'];
  }};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${RFValue(20)}px;
`;

export const Category = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text};

  margin-left: ${RFValue(17)}px;
`;
export const Date = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text};
`;
