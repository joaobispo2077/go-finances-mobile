import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

import { TransactionTypeButtonProps } from '.';

export type ButtonContainerProps = Omit<TransactionTypeButtonProps, 'title'>;

export const Container = styled(RectButton)<ButtonContainerProps>`
  width: 48%;

  padding: ${RFValue(16)}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: ${({ isActive, theme }) => {
    if (isActive) {
      return 'none';
    }

    return `1px solid ${theme.colors.text}`;
  }};

  border-radius: ${RFValue(5)}px;

  border: ${({ isActive, theme }) => {
    if (isActive) {
      return 'none';
    }

    return `1px solid ${theme.colors.text}`;
  }};

  ${({ isActive, theme, type }) =>
    isActive &&
    type === 'outcome' &&
    css`
      background-color: ${theme.colors.attention_light};
    `}

  ${({ isActive, theme, type }) =>
    isActive &&
    type === 'income' &&
    css`
      background-color: ${theme.colors.success_light};
    `}
`;

export const Icon = styled(Feather)<TransactionTypeButtonProps>`
  font-size: ${RFValue(24)}px;

  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  margin-left: ${RFValue(24)}px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;
