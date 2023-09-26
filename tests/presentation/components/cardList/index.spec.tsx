import React from 'react';
import { Text, View } from 'react-native';
import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react-native';

describe('Components: CardList', () => {
  test('should show title of CardList with success', () => {
    const title = faker.random.word();
    const { getByTestId } = render(<CardList title={title} />);

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show button "Ver todos" correctly', () => {
    const title = faker.random.word();
    const { getByTestId } = render(<CardList title={title} />);

    expect(getByTestId('see_all_id').props.children).toEqual('Ver todos');
  });
});

type Props = {
  title: string;
};

const CardList = ({ title }: Props) => {
  return (
    <View>
      <Text testID="title_id">{title}</Text>
      <Text testID="see_all_id">{'Ver todos'}</Text>
    </View>
  );
};
