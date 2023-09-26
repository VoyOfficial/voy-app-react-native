import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { faker } from '@faker-js/faker';
import { fireEvent, render } from '@testing-library/react-native';

describe('Components: CardList', () => {
  test('should show title of CardList with success', () => {
    const title = faker.random.word();
    const { getByTestId } = render(
      <CardList title={title} seeAll={() => {}} />,
    );

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show button "Ver todos" correctly', () => {
    const title = faker.random.word();
    const { getByTestId } = render(
      <CardList title={title} seeAll={() => {}} />,
    );

    expect(getByTestId('see_all_id').props.children).toEqual('Ver todos');
  });

  test('should press button "Ver todos" with success', () => {
    const title = faker.random.word();
    const seeAll = jest.fn();
    const { getByTestId } = render(<CardList title={title} seeAll={seeAll} />);

    fireEvent.press(getByTestId('see_all_button_id'));

    expect(seeAll).toHaveBeenCalledTimes(1);
  });
});

type Props = {
  title: string;
  seeAll: () => void;
};

const CardList = ({ title, seeAll }: Props) => {
  return (
    <View>
      <Text testID="title_id">{title}</Text>
      <TouchableOpacity testID="see_all_button_id" onPress={seeAll}>
        <Text testID="see_all_id">{'Ver todos'}</Text>
      </TouchableOpacity>
    </View>
  );
};
