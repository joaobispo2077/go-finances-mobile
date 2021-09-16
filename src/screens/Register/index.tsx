import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import uuid from 'react-native-uuid';

import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { RootBottomTabParamList } from '../../routes/app.routes';
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
  const navigation =
    useNavigation<BottomTabNavigationProp<RootBottomTabParamList>>();

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    key: 'default',
    name: 'Selecione uma categoria',
  });

  const {
    control,
    handleSubmit,
    reset,
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

  const resetForm = () => {
    setTransactionType('');
    setSelectedCategory({
      key: 'default',
      name: 'Selecione uma categoria',
    });
    reset();
  };

  const handleRegister = async (form: FormData) => {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (selectedCategory.key === 'default') {
      return Alert.alert('Selecione uma categoria');
    }

    const transaction = {
      id: uuid.v4(),
      title: form.title,
      amount: Number(form.amount),
      type: transactionType,
      category: selectedCategory.key,
      date: new Date(),
    };

    console.log(transaction);

    try {
      const collectionKey = '@gofinances:transactions';

      const oldTransactions = await AsyncStorage.getItem(collectionKey);
      const newTransactions = oldTransactions
        ? JSON.parse(oldTransactions).concat(transaction)
        : [transaction];

      await AsyncStorage.setItem(
        collectionKey,
        JSON.stringify(newTransactions),
      );

      resetForm();
      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  };

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
