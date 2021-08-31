import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};

  padding: ${RFValue(18)}px ${RFValue(24)}px;

  border-radius: ${RFValue(5)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;

  color: ${({ theme }) => theme.colors.title};
`;
export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(30)}px;

  /* .income { */
  color: ${({ theme }) => theme.colors.success};
  /* } */

  /* .outcome {
    color: ${({ theme }) => theme.colors.attention};
  } */
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
