import React from 'react';
import { Image, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';

describe('Components: CardList', () => {
  test('should show title with success', () => {
    const title = faker.company.name();
    const { getByTestId } = render(
      <CardList
        imageUrl=""
        title={title}
        location=""
        myDistanceOfLocal=""
        ratingComments=""
        reviews=""
      />,
    );

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show location of local correctly', () => {
    const location = faker.address.cityName();
    const { getByTestId } = render(
      <CardList
        imageUrl=""
        title=""
        location={location}
        myDistanceOfLocal=""
        ratingComments=""
        reviews=""
      />,
    );

    expect(getByTestId('location_id').props.children).toEqual(location);
  });

  test('should show the my distance of local correctly', () => {
    const myDistanceOfLocal = faker.address.latitude();
    const { getByTestId } = render(
      <CardList
        imageUrl=""
        title=""
        location=""
        myDistanceOfLocal={myDistanceOfLocal}
        ratingComments=""
        reviews=""
      />,
    );

    expect(getByTestId('distance_of_local_id').props.children).toEqual(
      myDistanceOfLocal,
    );
  });

  test('should show rating comments correctly', () => {
    const ratingComments = faker.random.word();
    const { getByTestId } = render(
      <CardList
        imageUrl=""
        title=""
        location=""
        myDistanceOfLocal=""
        ratingComments={ratingComments}
        reviews=""
      />,
    );

    expect(getByTestId('rating_comments_id').props.children).toEqual(
      ratingComments,
    );
  });

  test('should show reviews correctly', () => {
    const reviews = faker.random.numeric();
    const { getByTestId } = render(
      <CardList
        imageUrl=""
        title=""
        location=""
        myDistanceOfLocal=""
        ratingComments=""
        reviews={reviews}
      />,
    );
    expect(getByTestId('reviews_id').props.children).toEqual(reviews);
  });

  test('should show image of local with success', () => {
    const imageUrl = faker.image.imageUrl();
    const { getByTestId } = render(
      <CardList
        imageUrl={imageUrl}
        title=""
        location=""
        myDistanceOfLocal=""
        ratingComments=""
        reviews=""
      />,
    );

    expect(getByTestId('image_of_place_id').props.source).toEqual({
      uri: imageUrl,
    });
  });
});

type Props = {
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  ratingComments: string;
  reviews: string;
};

const CardList = ({
  imageUrl,
  title,
  location,
  myDistanceOfLocal,
  ratingComments,
  reviews,
}: Props) => {
  return (
    <View>
      <Image testID="image_of_place_id" source={{ uri: imageUrl }} />
      <Text testID="title_id">{title}</Text>
      <Text testID="location_id">{location}</Text>
      <Text testID="distance_of_local_id">{myDistanceOfLocal}</Text>
      <Text testID="rating_comments_id">{ratingComments}</Text>
      <Text testID="reviews_id">{reviews}</Text>
    </View>
  );
};
