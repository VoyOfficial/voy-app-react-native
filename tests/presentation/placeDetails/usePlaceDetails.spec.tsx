import { useState } from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { Props } from '../../../src/presentation/placeDetails';

describe('Presentation: usePlaceDetails', () => {
  test('should update the backgroundImage correctly when call pressSummaryImageFromGallery function', async () => {
    const { result } = renderHook(() => usePlaceDetails());

    expect(result.current.backgroundImage).toEqual('');

    const image = faker.image.imageUrl();

    result.current.pressSummaryImageFromGallery(image);

    await waitFor(() => {
      expect(result.current.backgroundImage).toEqual(image);
    });
  });
});

const usePlaceDetails = (): Props => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const pressSummaryImageFromGallery = (image: string) => {
    setBackgroundImage(image);
  };

  return {
    amountOfReviews: '',
    backgroundImage,
    businessHoursSummary: '',
    contact: '',
    description: '',
    fullLocation: '',
    gallerySummaryImages: [],
    location: '',
    myDistanceOfLocal: '',
    photoOfReviewProfiles: [],
    pressSummaryImageFromGallery,
    rating: '',
    title: '',
  };
};
