import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';

describe('Presentation: PlaceDetails', () => {
  test('should show title with success', () => {
    const title = faker.random.word();
    const { getByTestId } = render(
      <PlaceDetails title={title} description="" />,
    );

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show description with success', () => {
    const description = faker.lorem.paragraph();
    const { getByTestId } = render(
      <PlaceDetails title="" description={description} />,
    );

    expect(getByTestId('description_id').props.children).toEqual(description);
  });
});

type Props = {
  title: string;
  description: string;
};

const PlaceDetails = ({ title, description }: Props) => {
  return (
    <View>
      <Text testID="title_id">{title}</Text>
      <Text testID="description_id">{description}</Text>
    </View>
  );
};
