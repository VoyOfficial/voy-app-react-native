import React from 'react';
import { render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import PlaceDetails, {
  getStyleOfPhotoOfReviewProfile,
} from '../../../src/presentation/placeDetails';

describe('PlaceDetails: getStyleOfPhotoOfReviewProfile', () => {
  test('should get style of photo of review profile when index equals 0', () => {
    const index = 0;
    const style = getStyleOfPhotoOfReviewProfile(index);

    expect(style).toEqual({ zIndex: 1, left: 0 });
  });

  test('should get style of photo of review profile when index equals 1', () => {
    const index = 1;
    const style = getStyleOfPhotoOfReviewProfile(index);

    expect(style).toEqual({ zIndex: 2, left: -10 });
  });

  test('should get style of photo of review profile when index equals 2', () => {
    const index = 2;
    const style = getStyleOfPhotoOfReviewProfile(index);

    expect(style).toEqual({ zIndex: 3, left: -20 });
  });
});

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

  test('should show star icon with success', () => {
    const { getByTestId } = makeSut('', '', '', '', '', '', '', '', '', ['']);

    expect(getByTestId('star_icon_id')).toBeTruthy();
  });

  test('should show location icon with success', () => {
    const { getByTestId } = makeSut('', '', '', '', '', '', '', '', '', ['']);

    expect(getByTestId('location_icon_id')).toBeTruthy();
  });

  test('should show walking icon with success', () => {
    const { getByTestId } = makeSut('', '', '', '', '', '', '', '', '', ['']);

    expect(getByTestId('walking_icon_id')).toBeTruthy();
  });

  test('should show full location icon with success', () => {
    const { getByTestId } = makeSut('', '', '', '', '', '', '', '', '', ['']);

    expect(getByTestId('full_location_icon_id')).toBeTruthy();
  });

  test('should show clock icon with success', () => {
    const { getByTestId } = makeSut('', '', '', '', '', '', '', '', '', ['']);

    expect(getByTestId('clock_icon_id')).toBeTruthy();
  });

  test('should show phone icon with success', () => {
    const { getByTestId } = makeSut('', '', '', '', '', '', '', '', '', ['']);

    expect(getByTestId('phone_icon_id')).toBeTruthy();
  });

  test('should show background image correctly', () => {
    const backgroundImage = faker.image.city();
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
      [''],
      backgroundImage,
    );

    expect(getByTestId('background_image_id').props.source).toEqual({
      uri: backgroundImage,
    });
  });

  test('should show gallery summary images with correct images', () => {
    const gallerySummary = [''];
    for (let index = 0; index < 6; index++) {
      gallerySummary.push(faker.image.city());
    }
    const backgroundImage = faker.image.city();
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
      [''],
      backgroundImage,
      gallerySummary,
    );

    for (let index = 0; index < 4; index++) {
      expect(
        getByTestId(`gallery_summary_image_${index}_id`).props.source,
      ).toEqual({
        uri: gallerySummary[index],
      });
    }
  });

  test('should show the most available number of images in the gallery correctly', () => {
    const gallerySummary = [''];
    for (let index = 0; index < 8; index++) {
      gallerySummary.push(faker.image.city());
    }
    const backgroundImage = faker.image.city();
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
      [''],
      backgroundImage,
      gallerySummary,
    );
    expect(
      getByTestId('most_available_number_of_images_id').props.children,
    ).toEqual('+6');
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
  backgroundImage = '',
  gallerySummaryImages = [''],
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
      backgroundImage={backgroundImage}
      gallerySummaryImages={gallerySummaryImages}
    />,
  );
};
