import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { CategorySelect } from '../../components/Forms/CategorySelect';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypeContainer,
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionSelect = (type: 'income' | 'outcome') => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Título" />
          <Input placeholder="Preço" />

          <TransactionTypeContainer>
            <TransactionTypeButton
              type="income"
              title="Entrada"
              isActive={transactionType === 'income'}
              onPress={() => handleTransactionSelect('income')}
            />
            <TransactionTypeButton
              type="outcome"
              title="Saída"
              isActive={transactionType === 'outcome'}
              onPress={() => handleTransactionSelect('outcome')}
            />
          </TransactionTypeContainer>
          <CategorySelect title="Categoria" />
        </Fields>
        <Button title="Entrada" />
      </Form>
    </Container>
  );
}
