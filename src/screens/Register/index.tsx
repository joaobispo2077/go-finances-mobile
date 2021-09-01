import React from 'react';
import { Button } from '../../components/Forms/Button';
import { Input } from '../../components/Forms/Input';
import { Container, Header, Title, Form, Fields } from './styles';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Título" />
          <Input placeholder="Preço" />
        </Fields>
        <Button title="Entrada" />
      </Form>
    </Container>
  );
}
