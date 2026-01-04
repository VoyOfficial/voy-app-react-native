import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { ListCard } from '~/presentation/components';
import { renderWithTheme } from '../../helpers/renderWithTheme';

describe('Components: ListCard', () => {
  test('should show title with success', () => {
    const title = faker.company.name();
    const { getByTestId } = makeSut(title);

    expect(getByTestId('title_0_id').props.children).toEqual(title);
  });

  test('should show location of local correctly', () => {
    const location = faker.address.cityName();
    const { getByTestId } = makeSut('', location);

    expect(getByTestId('location_0_id').props.children).toEqual(location);
  });

  test('should show the my distance of local correctly', () => {
    const myDistanceOfLocal = faker.address.latitude();
    const { getByTestId } = makeSut('', '', myDistanceOfLocal);

    expect(getByTestId('distance_of_local_0_id').props.children).toEqual(
      myDistanceOfLocal,
    );
  });

  test('should show amount of reviews correctly', () => {
    const amountOfReviews = faker.random.word();
    const { getByTestId } = makeSut('', '', '', amountOfReviews);

    expect(getByTestId('amount_of_reviews_0_id').props.children).toEqual(
      ` (${amountOfReviews})`,
    );
  });

  test('should show rating correctly', () => {
    const rating = faker.random.numeric();
    const { getByTestId } = makeSut('', '', '', '', rating);
    expect(getByTestId('rating_0_id').props.children).toEqual(rating);
  });

  test('should show image of local with success', () => {
    const imageUri = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUri);

    expect(getByTestId('image_of_place_0_id').props.source).toEqual({
      uri: imageUri,
    });
  });

  test('should press show more details button with success', () => {
    const imageUri = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUri);

    expect(getByTestId('location_icon_id')).toBeTruthy();
  });

  test('should show walking icon with success', () => {
    const imageUri = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUri);

    expect(getByTestId('walking_icon_id')).toBeTruthy();
  });

  test('should show star icon with success', () => {
    const imageUri = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUri);

    expect(getByTestId('star_icon_id')).toBeTruthy();
  });

  test('should show save to favorites button', () => {
    const imageUri = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUri);

    expect(getByTestId('save_button_0_id')).toBeTruthy();
  });

  test('should save to favorites when pressing favorite button', () => {
    const favorite = jest.fn();
    const imageUri = faker.image.imageUrl();
    const { getByTestId } = makeSut('', '', '', '', '', imageUri, favorite);

    const saveButton = getByTestId('save_button_0_id');

    fireEvent.press(saveButton);

    expect(favorite).toHaveBeenCalledTimes(1);
  });

  test('should call showMoreDetails function when press the component', () => {
    const showMoreDetails = jest.fn();
    const favorite = () => {};
    const imageUri = faker.image.imageUrl();
    const { getByTestId } = makeSut(
      '',
      '',
      '',
      '',
      '',
      imageUri,
      favorite,
      showMoreDetails,
    );

    const component = getByTestId(`list_card_0_id`);

    fireEvent.press(component);

    expect(showMoreDetails).toHaveBeenCalledTimes(1);
  });
});

const makeSut = (
  title = '',
  location = '',
  myDistanceOfLocal = '',
  amountOfReviews = '',
  rating = '',
  imageUri = '',
  favorite = () => {},
  showMoreDetails = () => {},
) => {
  return renderWithTheme(
    <ListCard
      id={0}
      index={0}
      imageUri={imageUri}
      title={title}
      location={location}
      myDistanceOfLocal={myDistanceOfLocal}
      amountOfReviews={amountOfReviews}
      rating={rating}
      favorite={favorite}
      showMoreDetails={showMoreDetails}
    />,
  );
};
