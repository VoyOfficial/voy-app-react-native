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
      />,
    );

    expect(getByTestId('business_hours_summary_id').props.children).toEqual(
      businessHoursSummary,
    );
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
};

const PlaceDetails = ({
  title,
  description,
  location,
  myDistanceOfLocal,
  amountOfReviews,
  rating,
  businessHoursSummary,
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
    </View>
  );
};
