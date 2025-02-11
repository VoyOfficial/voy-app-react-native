import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { getStyleOfPhotoOfReviewProfile } from '../../../src/presentation/placeDetails/components/reviews';
import PlaceDetails, {
  gallerySummaryImagesToImagesGallery,
} from '../../../src/presentation/placeDetails/placeDetails';

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

describe('PlaceDetails: gallerySummaryImagesToImagesGallery', () => {
  test('should convert gallerySummaryImages to imagesGallery correctly', () => {
    const gallerySummaryImages = [
      faker.image.imageUrl(),
      faker.image.imageUrl(),
      faker.image.imageUrl(),
    ];
    const images = gallerySummaryImagesToImagesGallery(gallerySummaryImages);

    expect(images).toEqual(
      gallerySummaryImages.map((image, index) => ({ id: index, url: image })),
    );
  });
});

describe('Presentation: PlaceDetails', () => {
  test('should show title with success', () => {
    const title = faker.random.word();
    const {
      sut: { getByTestId },
    } = makeSut({ title });

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show description with success', () => {
    const description = faker.lorem.paragraph();
    const {
      sut: { getByTestId },
    } = makeSut({ description });

    expect(getByTestId('description_id').props.children).toEqual(description);
  });

  test('should show location with success', () => {
    const location = faker.address.cityName();
    const {
      sut: { getByTestId },
    } = makeSut({ location });

    expect(getByTestId('location_id').props.children).toEqual(location);
  });

  test('should show my distance of local with success', () => {
    const myDistanceOfLocal = faker.random.numeric(4);
    const {
      sut: { getByTestId },
    } = makeSut({ myDistanceOfLocal });

    expect(getByTestId('distance_of_local_id').props.children).toEqual(
      myDistanceOfLocal,
    );
  });

  test('should show amount of reviews with success', () => {
    const amount = faker.random.numeric(4);
    const amountOfReviews = amount + ' avaliações';
    const {
      sut: { getByTestId },
    } = makeSut({ amountOfReviews });

    expect(getByTestId('amount_of_reviews_id').props.children).toEqual(
      amountOfReviews,
    );
  });

  test('should show rating correctly', () => {
    const rating = faker.random.numeric(1) + '/' + faker.random.numeric(1);
    const {
      sut: { getByTestId },
    } = makeSut({ rating });

    expect(getByTestId('rating_id').props.children).toEqual(rating);
  });

  test('should show business hours summary successfully', () => {
    const businessHoursSummary = 'Diariamente - Acesso livre (24 horas)';
    const {
      sut: { getByTestId },
    } = makeSut({ businessHoursSummary });

    expect(getByTestId('business_hours_summary_id').props.children).toEqual(
      businessHoursSummary,
    );
  });

  test('should show full location with success', () => {
    const fullLocation = faker.address.streetAddress();
    const {
      sut: { getByTestId },
    } = makeSut({ fullLocation });

    expect(getByTestId('full_location_id').props.children).toEqual(
      fullLocation,
    );
  });

  test('should show contact of place with success', () => {
    const contact = faker.phone.number();
    const {
      sut: { getByTestId },
    } = makeSut({ contact });

    expect(getByTestId('contact_id').props.children).toEqual(contact);
  });

  test('should show the photo of reviews profiles with success', () => {
    const photoOfReviewProfiles: Array<string> = [];
    for (let index = 0; index < 5; index++) {
      photoOfReviewProfiles.push(faker.image.avatar());
    }
    const {
      sut: { getByTestId },
    } = makeSut({ photoOfReviewProfiles });

    photoOfReviewProfiles.forEach((photo, index) => {
      expect(
        getByTestId(`photo_of_review_profiles_${index}_id`).props.source.uri,
      ).toEqual(photo);
    });
  });

  test('should show star icon with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut({});

    expect(getByTestId('star_icon_id')).toBeTruthy();
  });

  test('should show location icon with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut({});

    expect(getByTestId('location_icon_id')).toBeTruthy();
  });

  test('should show walking icon with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut({});

    expect(getByTestId('walking_icon_id')).toBeTruthy();
  });

  test('should show full location icon with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut({});

    expect(getByTestId('full_location_icon_id')).toBeTruthy();
  });

  test('should show clock icon with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut({});

    expect(getByTestId('clock_icon_id')).toBeTruthy();
  });

  test('should show phone icon with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut({});

    expect(getByTestId('phone_icon_id')).toBeTruthy();
  });

  test('should show background image correctly', () => {
    const backgroundImage = faker.image.city();
    const {
      sut: { getByTestId },
    } = makeSut({ backgroundImage });

    expect(getByTestId('background_image_id').props.source).toEqual({
      uri: backgroundImage,
    });
  });

  test('should show gallery summary images with correct images', () => {
    const gallerySummary: Array<string> = [];
    for (let index = 0; index < 6; index++) {
      gallerySummary.push(faker.image.city());
    }
    const backgroundImage = faker.image.city();
    const {
      sut: { getByTestId },
    } = makeSut({ backgroundImage, gallerySummaryImages: gallerySummary });

    for (let index = 0; index < 4; index++) {
      expect(
        getByTestId(`gallery_summary_image_${index}_id`).props.source,
      ).toEqual({
        uri: gallerySummary[index],
      });
    }
  });

  test('should show gallery summary images with correct images when the gallerySummary is less than 4', () => {
    const gallerySummary: Array<string> = [];
    for (let index = 0; index < 3; index++) {
      gallerySummary.push(faker.image.city());
    }
    const backgroundImage = faker.image.city();
    const {
      sut: { queryByTestId, getByTestId },
    } = makeSut({ backgroundImage, gallerySummaryImages: gallerySummary });

    for (let index = 0; index < gallerySummary.length; index++) {
      if (index !== 3) {
        expect(
          getByTestId(`gallery_summary_image_${index}_id`).props.source,
        ).toEqual({
          uri: gallerySummary[index],
        });
      } else {
        expect(
          queryByTestId(`gallery_summary_image_${index}_id`),
        ).not.toBeTruthy();
      }
    }
  });

  test('should show the most available number of images in the gallery correctly', () => {
    const gallerySummary = [];
    for (let index = 0; index < 8; index++) {
      gallerySummary.push(faker.image.city());
    }
    const backgroundImage = faker.image.city();
    const {
      sut: { getByTestId },
    } = makeSut({ backgroundImage, gallerySummaryImages: gallerySummary });
    expect(
      getByTestId('most_available_number_of_images_id').props.children,
    ).toEqual('+5');
  });

  test('should not show the most available number of images in the gallery', () => {
    const gallerySummary = [];
    for (let index = 0; index < 4; index++) {
      gallerySummary.push(faker.image.city());
    }
    const backgroundImage = faker.image.city();
    const {
      sut: { queryByTestId },
    } = makeSut({ backgroundImage, gallerySummaryImages: gallerySummary });
    expect(
      queryByTestId('most_available_number_of_images_id'),
    ).not.toBeTruthy();
  });

  test('should show the last image of gallery with background color black', () => {
    const gallerySummary = [];
    for (let index = 0; index < 5; index++) {
      gallerySummary.push(faker.image.city());
    }
    const backgroundImage = faker.image.city();
    const {
      sut: { getByTestId, queryByTestId },
    } = makeSut({ backgroundImage, gallerySummaryImages: gallerySummary });

    expect(
      queryByTestId('gallery_summary_image_background_2_id'),
    ).not.toBeTruthy();
    expect(getByTestId('gallery_summary_image_background_3_id')).toBeTruthy();
  });

  test('should press all images of gallery with success', () => {
    const pressSummaryImageFromGallery = jest.fn();
    const gallerySummary = [];
    for (let index = 0; index < 8; index++) {
      gallerySummary.push(faker.image.city());
    }
    const backgroundImage = faker.image.city();
    const {
      sut: { getByTestId, queryByTestId },
    } = makeSut({
      backgroundImage,
      gallerySummaryImages: gallerySummary,
      pressSummaryImageFromGallery,
    });

    for (let index = 0; index < gallerySummary.length; index++) {
      if (index <= 3) {
        fireEvent.press(
          getByTestId(`gallery_summary_image_button_${index}_id`),
        );

        expect(pressSummaryImageFromGallery).toHaveBeenCalled();
        expect(pressSummaryImageFromGallery).toHaveBeenCalledWith(
          gallerySummary[index],
          false,
        );
      } else {
        expect(
          queryByTestId(`gallery_summary_image_button_${index}_id`),
        ).not.toBeTruthy();
      }
    }
  });

  describe('error', () => {
    test('should only show message error when error is true', () => {
      const {
        sut: { getByText, queryByTestId },
      } = makeSut({ error: true });

      const title = getByText('Aaaah não');
      const description = getByText('Parece que tivemos um imprevito.');

      expect(title).toBeTruthy();
      expect(description).toBeTruthy();

      expect(queryByTestId('title_id')).not.toBeTruthy();
      expect(queryByTestId('description_id')).not.toBeTruthy();
      expect(queryByTestId('location_id')).not.toBeTruthy();
      expect(queryByTestId('distance_of_local_id')).not.toBeTruthy();
      expect(queryByTestId('background_image_id')).not.toBeTruthy();
    });

    test('should not show message error when error is false', () => {
      const {
        sut: { queryByText, queryByTestId },
      } = makeSut({ error: false });

      const title = queryByText('Aaaah não');
      const description = queryByText('Parece que tivemos um imprevito.');

      expect(title).not.toBeTruthy();
      expect(description).not.toBeTruthy();

      expect(queryByTestId('title_id')).toBeTruthy();
      expect(queryByTestId('description_id')).toBeTruthy();
      expect(queryByTestId('location_id')).toBeTruthy();
      expect(queryByTestId('distance_of_local_id')).toBeTruthy();
      expect(queryByTestId('background_image_id')).toBeTruthy();
    });

    test('should call the tryAgain function when pressing the "Tente novamente"', () => {
      const tryGetPlaceDetailsAgain = jest.fn();
      const {
        sut: { getByTestId },
      } = makeSut({ error: true, tryGetPlaceDetailsAgain });

      fireEvent.press(getByTestId('button_try_again_id'));

      expect(tryGetPlaceDetailsAgain).toHaveBeenCalledTimes(1);
    });
  });
});

type SutProps = {
  description?: string;
  location?: string;
  myDistanceOfLocal?: string;
  amountOfReviews?: string;
  rating?: string;
  businessHoursSummary?: string;
  fullLocation?: string;
  contact?: string;
  title?: string;
  photoOfReviewProfiles?: Array<string>;
  backgroundImage?: string;
  gallerySummaryImages?: Array<string>;
  error?: boolean;
  tryGetPlaceDetailsAgain?: () => Promise<void>;
  pressSummaryImageFromGallery?: () => void;
};

const makeSut = ({
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
  error = false,
  pressSummaryImageFromGallery = () => {},
  tryGetPlaceDetailsAgain = async () => {},
}: SutProps) => {
  const sut = render(
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
      pressSummaryImageFromGallery={pressSummaryImageFromGallery}
      isOpenImagesGallery={false}
      closeImagesGallery={() => {}}
      error={error}
      tryGetPlaceDetailsAgain={tryGetPlaceDetailsAgain}
    />,
  );

  return { sut };
};
