import React from 'react';
import { render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { CardList } from '~/presentation/components';

describe('Components: CardList', () => {
  test('should show title with success', () => {
    const title = faker.company.name();
    const { getByTestId } = makeSut(title);

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show location of local correctly', () => {
    const location = faker.address.cityName();
    const { getByTestId } = makeSut('', location);

    expect(getByTestId('location_id').props.children).toEqual(location);
  });

  test('should show the my distance of local correctly', () => {
    const myDistanceOfLocal = faker.address.latitude();
    const { getByTestId } = makeSut('', '', myDistanceOfLocal);

    expect(getByTestId('distance_of_local_id').props.children).toEqual(
      myDistanceOfLocal,
    );
  });

  test('should show amount of reviews correctly', () => {
    const amountOfReviews = faker.random.word();
    const { getByTestId } = makeSut('', '', '', amountOfReviews);

    expect(getByTestId('amount_of_reviews_id').props.children).toEqual(
      ` (${amountOfReviews})`,
    );
  });

  test('should show rating correctly', () => {
    const rating = faker.random.numeric();
    const { getByTestId } = makeSut('', '', '', '', rating);
    expect(getByTestId('rating_id').props.children).toEqual(rating);
  });

  test('should show image of local with success', () => {
    const imageUrl = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUrl);

    expect(getByTestId('image_of_place_id').props.source).toEqual({
      uri: imageUrl,
    });
  });

  test('should show location icon with success', () => {
    const imageUrl = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUrl);

    expect(getByTestId('location_icon_id')).toBeTruthy();
  });

  test('should show walking icon with success', () => {
    const imageUrl = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUrl);

    expect(getByTestId('walking_icon_id')).toBeTruthy();
  });

  test('should show star icon with success', () => {
    const imageUrl = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUrl);

    expect(getByTestId('star_icon_id')).toBeTruthy();
  });
});

const makeSut = (
  title = '',
  location = '',
  myDistanceOfLocal = '',
  amountOfReviews = '',
  rating = '',
  imageUrl = '',
) => {
  return render(
    <CardList
      imageUrl={imageUrl}
      title={title}
      location={location}
      myDistanceOfLocal={myDistanceOfLocal}
      amountOfReviews={amountOfReviews}
      rating={rating}
    />,
  );
};
