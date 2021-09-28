import React from 'react';

import AppleLogo from '../../assets/apple_logo.svg';
import GoFinancesLogo from '../../assets/gofinances_logotipo.svg';
import GoogleLogo from '../../assets/google_logo.svg';
import {
  Container,
  Header,
  Title,
  TitleWrapper,
  SignTitle,
  Footer,
} from './styles';

export const SignIn = () => {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <GoFinancesLogo width={120} height={68} />
          <Title>
            Controle suas{'\n'} finanças de forma{'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignTitle>Faça seu login com{'\n'} uma das contas abaixo</SignTitle>
      </Header>
      <Footer>
        <GoogleLogo width={200} height={200} />
        <AppleLogo width={200} height={200} />
      </Footer>
    </Container>
  );
};
