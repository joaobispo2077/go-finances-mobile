import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme: theme }) => theme.fonts.regular};
  color: ${({ theme: theme }) => theme.colors.attention};

  margin: ${RFValue(7)}px 0;
`;
