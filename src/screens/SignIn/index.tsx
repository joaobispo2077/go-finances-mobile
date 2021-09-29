import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

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
  const auth = useAuth();
  console.log(auth);

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
          <SignInSocialButton svg={GoogleLogo} text="Entrar com Google" />
          <SignInSocialButton svg={AppleLogo} text="Entrar com Apple" />
        </LoginButtons>
      </Footer>
    </Container>
  );
};
