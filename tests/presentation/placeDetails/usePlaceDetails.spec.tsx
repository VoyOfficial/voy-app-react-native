import { useState } from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { Routes } from '~/main/navigation';
import { PlaceDetailsViewModel } from '../../../src/presentation/placeDetails';
import { GenericObject } from '../../../src/main/types/genericObject';

describe('Presentation: usePlaceDetails', () => {
  test('should update the backgroundImage correctly when call pressSummaryImageFromGallery function', async () => {
    const { result } = renderHook(() =>
      usePlaceDetails({ navigate: () => {} }),
    );

    expect(result.current.backgroundImage).toEqual('');

    const image = faker.image.imageUrl();

    result.current.pressSummaryImageFromGallery(image, false);

    await waitFor(() => {
      expect(result.current.backgroundImage).toEqual(image);
    });
  });

  test('should call navigate function correctly when call pressSummaryImageFromGallery with showInGallery true', async () => {
    const navigate = jest.fn();
    const { result } = renderHook(() => usePlaceDetails({ navigate }));

    expect(result.current.backgroundImage).toEqual('');

    const image = faker.image.imageUrl();

    const showInGallery = true;
    result.current.pressSummaryImageFromGallery(image, showInGallery);

    expect(navigate).toHaveBeenCalledWith(Routes.GALLERY, {
      images: result.current.gallerySummaryImages,
    });
  });
});

type Props = {
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
};

const usePlaceDetails = ({ navigate }: Props): PlaceDetailsViewModel => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const gallerySummaryImages: never[] = [];

  const pressSummaryImageFromGallery = (
    image: string,
    showInGallery: boolean,
  ) => {
    if (showInGallery) {
      navigate(Routes.GALLERY, { images: gallerySummaryImages });
    }

    if (!showInGallery) {
      setBackgroundImage(image);
    }
  };

  return {
    amountOfReviews: '',
    backgroundImage,
    businessHoursSummary: '',
    contact: '',
    description: '',
    fullLocation: '',
    gallerySummaryImages,
    location: '',
    myDistanceOfLocal: '',
    photoOfReviewProfiles: [],
    pressSummaryImageFromGallery,
    rating: '',
    title: '',
  };
};
