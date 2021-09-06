import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  CategoryTitle,
  Separator,
  Footer,
} from './styles';

interface Category {
  key: string;
  name: string;
}

export type CategorySelectProps = {
  selectedCategory: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
};

export const CategorySelect = ({
  selectedCategory,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) => {
  const handleCategorySelect = (category: Category) => {
    setCategory(category);
  };

  return (
    <Container>
      <Header>
        <Title>Selecione uma categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            isActive={selectedCategory.key === item.key}
            onPress={() => handleCategorySelect(item)}
          >
            <Icon name={item.icon} />
            <CategoryTitle>{item.name}</CategoryTitle>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecioanr" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
};
