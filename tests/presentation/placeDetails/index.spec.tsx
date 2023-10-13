import React from 'react';
import { render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import PlaceDetails from '../../../src/presentation/placeDetails';

describe('Presentation: PlaceDetails', () => {
  test('should show title with success', () => {
    const title = faker.random.word();
    const { getByTestId } = makeSut('', '', '', '', '', '', '', '', title);

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show description with success', () => {
    const description = faker.lorem.paragraph();
    const { getByTestId } = makeSut(description, '', '', '', '', '', '', '');

    expect(getByTestId('description_id').props.children).toEqual(description);
  });

  test('should show location with success', () => {
    const location = faker.address.cityName();
    const { getByTestId } = makeSut('', location, '', '', '', '', '', '');

    expect(getByTestId('location_id').props.children).toEqual(location);
  });

  test('should show my distance of local with success', () => {
    const myDistanceOfLocal = faker.random.numeric(4);
    const { getByTestId } = makeSut(
      '',
      '',
      myDistanceOfLocal,
      '',
      '',
      '',
      '',
      '',
    );

    expect(getByTestId('distance_of_local_id').props.children).toEqual(
      myDistanceOfLocal,
    );
  });

  test('should show amount of reviews with success', () => {
    const amount = faker.random.numeric(4);
    const amountOfReviews = amount + ' avaliações';
    const { getByTestId } = makeSut(
      '',
      '',
      '',
      amountOfReviews,
      '',
      '',
      '',
      '',
    );

    expect(getByTestId('amount_of_reviews_id').props.children).toEqual(
      amountOfReviews,
    );
  });

  test('should show rating correctly', () => {
    const rating = faker.random.numeric(1) + '/' + faker.random.numeric(1);
    const { getByTestId } = makeSut('', '', '', '', rating, '', '', '');

    expect(getByTestId('rating_id').props.children).toEqual(rating);
  });

  test('should show business hours summary successfully', () => {
    const businessHoursSummary = 'Diariamente - Acesso livre (24 horas)';
    const { getByTestId } = makeSut(
      '',
      '',
      '',
      '',
      '',
      businessHoursSummary,
      '',
      '',
    );

    expect(getByTestId('business_hours_summary_id').props.children).toEqual(
      businessHoursSummary,
    );
  });

  test('should show full location with success', () => {
    const fullLocation = faker.address.streetAddress();
    const { getByTestId } = makeSut('', '', '', '', '', '', fullLocation, '');

    expect(getByTestId('full_location_id').props.children).toEqual(
      fullLocation,
    );
  });

  test('should show contact of place with success', () => {
    const contact = faker.phone.number();
    const { getByTestId } = makeSut('', '', '', '', '', '', '', contact);

    expect(getByTestId('contact_id').props.children).toEqual(contact);
  });

  test('should show the photo of reviews profiles with success', () => {
    const photoOfReviewProfiles: Array<string> = [];
    for (let index = 0; index < 5; index++) {
      photoOfReviewProfiles.push(faker.image.avatar());
    }
    const { getByTestId } = makeSut(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      photoOfReviewProfiles,
    );

    photoOfReviewProfiles.forEach((photo, index) => {
      expect(
        getByTestId(`photo_of_review_profiles_${index}_id`).props.source.uri,
      ).toEqual(photo);
    });
  });
});

const makeSut = (
  description = '',
  location = '',
  myDistanceOfLocal = '',
  amountOfReviews = '',
  rating = '',
  businessHoursSummary = '',
  fullLocation = '',
  contact = '',
  title = '',
  photoOfReviewProfiles = [''],
) => {
  return render(
    <PlaceDetails
      title={title}
      description={description}
      location={location}
      myDistanceOfLocal={myDistanceOfLocal}
      amountOfReviews={amountOfReviews}
      rating={rating}
      businessHoursSummary={businessHoursSummary}
      fullLocation={fullLocation}
      contact={contact}
      photoOfReviewProfiles={photoOfReviewProfiles}
    />,
  );
};
