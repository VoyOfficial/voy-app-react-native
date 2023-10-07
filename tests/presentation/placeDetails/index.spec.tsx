import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';

describe('Presentation: PlaceDetails', () => {
  test('should show title with success', () => {
    const title = faker.random.word();
    const { getByTestId } = render(
      <PlaceDetails
        title={title}
        description=""
        location={''}
        myDistanceOfLocal={''}
        amountOfReviews={''}
        rating={''}
        businessHoursSummary={''}
        fullLocation=""
        contact=""
      />,
    );

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show description with success', () => {
    const description = faker.lorem.paragraph();
    const { getByTestId } = render(
      <PlaceDetails
        title=""
        description={description}
        location={''}
        myDistanceOfLocal={''}
        amountOfReviews={''}
        rating={''}
        businessHoursSummary={''}
        fullLocation=""
        contact=""
      />,
    );

    expect(getByTestId('description_id').props.children).toEqual(description);
  });

  test('should show location with success', () => {
    const description = faker.lorem.paragraph();
    const location = faker.address.cityName();
    const { getByTestId } = render(
      <PlaceDetails
        title=""
        description={description}
        location={location}
        myDistanceOfLocal={''}
        amountOfReviews={''}
        rating={''}
        businessHoursSummary={''}
        fullLocation=""
        contact=""
      />,
    );

    expect(getByTestId('location_id').props.children).toEqual(location);
  });

  test('should show my distance of local with success', () => {
    const description = faker.lorem.paragraph();
    const location = faker.address.cityName();
    const myDistanceOfLocal = faker.random.numeric(4);
    const { getByTestId } = render(
      <PlaceDetails
        title=""
        description={description}
        location={location}
        myDistanceOfLocal={myDistanceOfLocal}
        amountOfReviews={''}
        rating={''}
        businessHoursSummary={''}
        fullLocation=""
        contact=""
      />,
    );

    expect(getByTestId('distance_of_local_id').props.children).toEqual(
      myDistanceOfLocal,
    );
  });

  test('should show amount of reviews with success', () => {
    const description = faker.lorem.paragraph();
    const location = faker.address.cityName();
    const myDistanceOfLocal = faker.random.numeric(4);
    const amount = faker.random.numeric(4);
    const amountOfReviews = amount + ' avaliações';
    const { getByTestId } = render(
      <PlaceDetails
        title=""
        description={description}
        location={location}
        myDistanceOfLocal={myDistanceOfLocal}
        amountOfReviews={amountOfReviews}
        rating={''}
        businessHoursSummary={''}
        fullLocation=""
        contact=""
      />,
    );

    expect(getByTestId('amount_of_reviews_id').props.children).toEqual(
      amountOfReviews,
    );
  });

  test('should show rating correctly', () => {
    const description = faker.lorem.paragraph();
    const location = faker.address.cityName();
    const myDistanceOfLocal = faker.random.numeric(4);
    const amount = faker.random.numeric(4);
    const amountOfReviews = amount + ' avaliações';
    const rating = faker.random.numeric(1) + '/' + faker.random.numeric(1);
    const { getByTestId } = render(
      <PlaceDetails
        title=""
        description={description}
        location={location}
        myDistanceOfLocal={myDistanceOfLocal}
        amountOfReviews={amountOfReviews}
        rating={rating}
        businessHoursSummary={''}
        fullLocation=""
        contact=""
      />,
    );

    expect(getByTestId('rating_id').props.children).toEqual(rating);
  });

  test('should show business hours summary successfully', () => {
    const description = faker.lorem.paragraph();
    const location = faker.address.cityName();
    const myDistanceOfLocal = faker.random.numeric(4);
    const amount = faker.random.numeric(4);
    const amountOfReviews = amount + ' avaliações';
    const rating = faker.random.numeric(1) + '/' + faker.random.numeric(1);
    const businessHoursSummary = 'Diariamente - Acesso livre (24 horas)';
    const { getByTestId } = render(
      <PlaceDetails
        title=""
        description={description}
        location={location}
        myDistanceOfLocal={myDistanceOfLocal}
        amountOfReviews={amountOfReviews}
        rating={rating}
        businessHoursSummary={businessHoursSummary}
        fullLocation=""
        contact=""
      />,
    );

    expect(getByTestId('business_hours_summary_id').props.children).toEqual(
      businessHoursSummary,
    );
  });

  test('should show full location with success', () => {
    const description = faker.lorem.paragraph();
    const location = faker.address.cityName();
    const myDistanceOfLocal = faker.random.numeric(4);
    const amount = faker.random.numeric(4);
    const amountOfReviews = amount + ' avaliações';
    const rating = faker.random.numeric(1) + '/' + faker.random.numeric(1);
    const businessHoursSummary = 'Diariamente - Acesso livre (24 horas)';
    const fullLocation = faker.address.streetAddress();
    const { getByTestId } = render(
      <PlaceDetails
        title=""
        description={description}
        location={location}
        myDistanceOfLocal={myDistanceOfLocal}
        amountOfReviews={amountOfReviews}
        rating={rating}
        businessHoursSummary={businessHoursSummary}
        fullLocation={fullLocation}
        contact=""
      />,
    );

    expect(getByTestId('full_location_id').props.children).toEqual(
      fullLocation,
    );
  });

  test('should show contact of place with success', () => {
    const description = faker.lorem.paragraph();
    const location = faker.address.cityName();
    const myDistanceOfLocal = faker.random.numeric(4);
    const amount = faker.random.numeric(4);
    const amountOfReviews = amount + ' avaliações';
    const rating = faker.random.numeric(1) + '/' + faker.random.numeric(1);
    const businessHoursSummary = 'Diariamente - Acesso livre (24 horas)';
    const fullLocation = faker.address.streetAddress();
    const contact = faker.phone.number();
    const { getByTestId } = render(
      <PlaceDetails
        title=""
        description={description}
        location={location}
        myDistanceOfLocal={myDistanceOfLocal}
        amountOfReviews={amountOfReviews}
        rating={rating}
        businessHoursSummary={businessHoursSummary}
        fullLocation={fullLocation}
        contact={contact}
      />,
    );

    expect(getByTestId('contact_id').props.children).toEqual(contact);
  });
});

type Props = {
  title: string;
  description: string;
  location: string;
  myDistanceOfLocal: string;
  amountOfReviews: string;
  rating: string;
  businessHoursSummary: string;
  fullLocation: string;
  contact: string;
};

const PlaceDetails = ({
  title,
  description,
  location,
  myDistanceOfLocal,
  amountOfReviews,
  rating,
  businessHoursSummary,
  fullLocation,
  contact,
}: Props) => {
  return (
    <View>
      <Text testID="title_id">{title}</Text>
      <Text testID="description_id">{description}</Text>
      <Text testID="location_id">{location}</Text>
      <Text testID="distance_of_local_id">{myDistanceOfLocal}</Text>
      <Text testID="amount_of_reviews_id">{amountOfReviews}</Text>
      <Text testID="rating_id">{rating}</Text>
      <Text testID="business_hours_summary_id">{businessHoursSummary}</Text>
      <Text testID="full_location_id">{fullLocation}</Text>
      <Text testID="contact_id">{contact}</Text>
    </View>
  );
};
