import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;
  width: ${RFValue(311)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: ${RFValue(4)};
  margin-bottom: ${RFValue(16)}px;
`;

export const SvgContainer = styled.View`
  border-right-color: ${({ theme }) => theme.colors.background};
  border-right-width: ${RFValue(1)};

  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  height: 100%;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;

  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
