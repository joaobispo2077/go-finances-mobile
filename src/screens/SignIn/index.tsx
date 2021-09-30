import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';

import AppleLogo from '../../assets/apple_logo.svg';
import GoFinancesLogo from '../../assets/gofinances_logotipo.svg';
import GoogleLogo from '../../assets/google_logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/useAuth';
import {
  Container,
  Header,
  Title,
  TitleWrapper,
  SignTitle,
  Footer,
  LoginButtons,
} from './styles';

export const SignIn = () => {
  const [isLoading, setIsloading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  const handleSignInWithGoogle = async () => {
    try {
      setIsloading(true);
      return await signInWithGoogle();
    } catch (err) {
      console.error(err);
      Alert.alert('Não foi possível conectar a conta Google.');
    } finally {
      setIsloading(false);
    }
  };

  const handleSignInWithApple = async () => {
    try {
      setIsloading(true);
      return await signInWithApple();
    } catch (err) {
      console.error(err);
      Alert.alert('Não foi possível conectar a conta Apple.');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <GoFinancesLogo width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{'\n'} finanças de forma{'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignTitle>Faça seu login com{'\n'} uma das contas abaixo</SignTitle>
      </Header>
      <Footer>
        <LoginButtons>
          <SignInSocialButton
            svg={GoogleLogo}
            text="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            svg={AppleLogo}
            text="Entrar com Apple"
            onPress={handleSignInWithApple}
          />
        </LoginButtons>

        {isLoading && (
          <ActivityIndicator color={theme.colors.primary} size="large" />
        )}
      </Footer>
    </Container>
  );
};
