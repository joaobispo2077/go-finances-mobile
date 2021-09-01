import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
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
