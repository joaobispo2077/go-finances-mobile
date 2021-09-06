import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
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
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    key: 'default',
    name: 'Selecione uma categoria',
  });

  const handleTransactionSelect = (type: 'income' | 'outcome') => {
    setTransactionType(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
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
          <CategorySelectButton
            title={selectedCategory.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button title="Cadastrar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          selectedCategory={selectedCategory}
          setCategory={setSelectedCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
