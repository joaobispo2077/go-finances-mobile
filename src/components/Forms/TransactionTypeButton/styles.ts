import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

import { TransactionTypeButtonProps } from '.';

export type ButtonContainerProps = Omit<TransactionTypeButtonProps, 'title'>;

type ContainerProps = Pick<ButtonContainerProps, 'isActive' | 'type'>;
export const Container = styled.View<ContainerProps>`
  width: 48%;

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

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)<Pick<TransactionTypeButtonProps, 'type'>>`
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
