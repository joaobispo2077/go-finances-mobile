import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';

import { Button, SvgContainer, Text } from './styles';

export type SignInSocialButtonProps = RectButtonProps & {
  text: string;
  svg: React.FC<SvgProps>;
};

export const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  text,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) => {
  return (
    <Button {...rest}>
      <SvgContainer>
        <Svg width={RFValue(24)} height={RFValue(24)} />
      </SvgContainer>
      <Text>{text}</Text>
    </Button>
  );
};
