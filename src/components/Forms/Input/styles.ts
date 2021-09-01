import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.shape};

  width: 100%;

  padding: ${RFValue(16)}px ${RFValue(18)}px;
  margin-bottom: ${RFValue(8)}px;
  border-radius: ${RFValue(5)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
