import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';

describe('Presentation: PlaceDetails', () => {
  test('should show title with success', () => {
    const title = faker.random.word();
    const { getByTestId } = render(<PlaceDetails title={title} />);

    expect(getByTestId('title_id').props.children).toEqual(title);
  });
});

type Props = {
  title: string;
};

const PlaceDetails = ({ title }: Props) => {
  return (
    <View>
      <Text testID="title_id">{title}</Text>
    </View>
  );
};
