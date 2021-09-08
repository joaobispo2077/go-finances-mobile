import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${RFValue(5)}px;

  justify-content: center;
  align-items: center;

  padding: ${RFValue(18)}px 0;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
