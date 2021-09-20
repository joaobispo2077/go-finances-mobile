import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import { HistoryCardProps } from '.';

type ContainerProps = Pick<HistoryCardProps, 'color'>;
export const Container = styled.View<ContainerProps>`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;

  padding: ${RFValue(12)}px ${RFValue(24)}px;

  border-radius: ${RFValue(5)}px;
  border-left-width: ${RFValue(5)}px;
  border-left-color: ${({ color }) => color};

  margin-bottom: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;
