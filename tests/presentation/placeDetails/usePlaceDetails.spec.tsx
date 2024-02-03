import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { Routes } from '~/main/navigation';
import { usePlaceDetails } from '../../../src/presentation/placeDetails';

describe('Presentation: usePlaceDetails', () => {
  test('should update the backgroundImage correctly when call pressSummaryImageFromGallery function', async () => {
    const { result } = renderHook(() =>
      usePlaceDetails({ navigate: () => {}, gallerySummaryImages: [''] }),
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
    const { result } = renderHook(() =>
      usePlaceDetails({ navigate, gallerySummaryImages: [''] }),
    );

    expect(result.current.backgroundImage).toEqual('');

    const image = faker.image.imageUrl();

    const showInGallery = true;
    result.current.pressSummaryImageFromGallery(image, showInGallery);

    expect(navigate).toHaveBeenCalledWith(Routes.GALLERY, {
      images: result.current.gallerySummaryImages,
    });
  });

  test('should update backgroundImage when initialize', async () => {
    const navigate = jest.fn();
    const backgroundImage = faker.image.imageUrl();
    const { result } = renderHook(() =>
      usePlaceDetails({
        navigate,
        gallerySummaryImages: [faker.image.imageUrl()],
      }),
    );

    expect(result.current.backgroundImage).toEqual(backgroundImage);
  });
});
