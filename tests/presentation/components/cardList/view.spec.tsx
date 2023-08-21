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

  test('should show rating comments correctly', () => {
    const ratingComments = faker.random.word();
    const { getByTestId } = makeSut('', '', '', ratingComments);

    expect(getByTestId('rating_comments_id').props.children).toEqual(
      ` (${ratingComments})`,
    );
  });

  test('should show reviews correctly', () => {
    const reviews = faker.random.numeric();
    const { getByTestId } = makeSut('', '', '', '', reviews);
    expect(getByTestId('reviews_id').props.children).toEqual(reviews);
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
  ratingComments = '',
  reviews = '',
  imageUrl = '',
) => {
  return render(
    <CardList
      imageUrl={imageUrl}
      title={title}
      location={location}
      myDistanceOfLocal={myDistanceOfLocal}
      ratingComments={ratingComments}
      reviews={reviews}
    />,
  );
};
