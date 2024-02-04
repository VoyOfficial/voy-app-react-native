import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { usePlaceDetails } from '../../../src/presentation/placeDetails';

describe('Presentation: usePlaceDetails', () => {
  test('should update the backgroundImage correctly when call pressSummaryImageFromGallery function', async () => {
    const { result } = renderHook(() =>
      usePlaceDetails({ gallerySummaryImages: [''] }),
    );

    expect(result.current.backgroundImage).toEqual('');

    const image = faker.image.imageUrl();

    result.current.pressSummaryImageFromGallery(image, false);

    await waitFor(() => {
      expect(result.current.backgroundImage).toEqual(image);
    });
  });

  test('should update isOpenImagesGallery to true when call pressSummaryImageFromGallery with showInGallery true', async () => {
    const { result } = renderHook(() =>
      usePlaceDetails({ gallerySummaryImages: [''] }),
    );

    expect(result.current.isOpenImagesGallery).toEqual(false);

    const image = faker.image.imageUrl();

    const showInGallery = true;
    result.current.pressSummaryImageFromGallery(image, showInGallery);

    await waitFor(() => {
      expect(result.current.isOpenImagesGallery).toEqual(true);
    });
  });

  test('should update backgroundImage when initialize', async () => {
    const backgroundImage = faker.image.imageUrl();
    const { result } = renderHook(() =>
      usePlaceDetails({
        gallerySummaryImages: [faker.image.imageUrl()],
      }),
    );

    expect(result.current.backgroundImage).toEqual(backgroundImage);
  });
});
