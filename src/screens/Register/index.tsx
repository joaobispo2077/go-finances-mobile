import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
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

interface FormData {
  title: string;
  amount: string;
}

const schema = yup.object().shape({
  title: yup.string().required('O título é obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor deve ser positivo')
    .required('O preço é obrigatório'),
});

export function Register() {
  const collectionKey = '@gofinances:transactions';

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    key: 'default',
    name: 'Selecione uma categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  const handleRegister = async (form: FormData) => {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (selectedCategory.key === 'default') {
      return Alert.alert('Selecione uma categoria');
    }

    const transaction = {
      title: form.title,
      amount: Number(form.amount),
      type: transactionType,
      category: selectedCategory.key,
    };

    console.log(transaction);

    try {
      // const oldTransactions = AsyncStorage.getItem(collectionKey);
      // const newTransactions = oldTransactions
      //   ? JSON.parse(oldTransactions)
      //   : [];
      await AsyncStorage.setItem(collectionKey, JSON.stringify([transaction]));
    } catch (error) {
      Alert.alert('Não foi possível salvar');
    }
  };

  useEffect(() => {
    async function loadTransactions() {
      const recoverTransactions = await AsyncStorage.getItem(collectionKey);
      console.log(JSON.parse(recoverTransactions ? recoverTransactions : '[]'));
    }
    loadTransactions();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Título"
              name="title"
              control={control}
              error={errors.title && errors.title.message}
              autoCapitalize="sentences"
              autoCorrect={false}
            />
            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              error={errors.amount && errors.amount.message}
              keyboardType="numeric"
            />

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
          <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            selectedCategory={selectedCategory}
            setCategory={setSelectedCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
