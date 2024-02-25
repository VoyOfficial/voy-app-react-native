import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { GetPlaceDetails } from '~/domain/useCases';
import { PlaceDetailsModel } from '~/domain/models';
import { usePlaceDetails } from '../../../src/presentation/placeDetails';

export class GetPlaceDetailsFake implements GetPlaceDetails {
  placeDetails: PlaceDetailsModel = {
    title: faker.company.name(),
    amountOfReviews: faker.datatype.number().toString(),
    businessHoursSummary: {
      sunday: {
        start: '08:00',
        end: '12:00',
      },
      monday: {
        start: '08:00',
        end: '12:00',
      },
      tuesday: {
        start: '08:00',
        end: '12:00',
      },
      wednesday: {
        start: '08:00',
        end: '12:00',
      },
      thursday: {
        start: '08:00',
        end: '12:00',
      },
      friday: {
        start: '08:00',
        end: '12:00',
      },
      saturday: {
        start: '08:00',
        end: '12:00',
      },
    },
    contact: faker.phone.number(),
    description: faker.lorem.paragraph(),
    distance: faker.datatype.number().toString(),
    fullLocation: faker.address.streetAddress(),
    location: faker.address.cityName(),
    photoOfReviewProfiles: [faker.image.imageUrl()],
    rating: faker.datatype.number({ min: 1, max: 5 }).toString(),
  };
  id = '';
  error: { status: boolean; message: string } = { message: '', status: false };
  get = async (id: string): Promise<PlaceDetailsModel> => {
    this.id = id;

    if (this.error.status) {
      throw new Error(this.error.message);
    }
    return this.placeDetails;
  };

  completeGetWithError = (message: string) => {
    this.error = { status: true, message };
  };
}

describe('Presentation: usePlaceDetails', () => {
  test('should update the backgroundImage correctly when call pressSummaryImageFromGallery function', async () => {
    const { result } = renderHook(() =>
      usePlaceDetails({
        gallerySummaryImages: [''],
        getPlaceDetails: new GetPlaceDetailsFake(),
        id: '',
      }),
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
      usePlaceDetails({
        gallerySummaryImages: [''],
        getPlaceDetails: new GetPlaceDetailsFake(),
        id: '',
      }),
    );

    expect(result.current.isOpenImagesGallery).toEqual(false);

    const image = faker.image.imageUrl();

    const showInGallery = true;
    result.current.pressSummaryImageFromGallery(image, showInGallery);

    await waitFor(() => {
      expect(result.current.isOpenImagesGallery).toEqual(true);
    });
  });

  test('should update isOpenImagesGallery to false when call closeImagesGallery', async () => {
    const { result } = renderHook(() =>
      usePlaceDetails({
        gallerySummaryImages: [''],
        getPlaceDetails: new GetPlaceDetailsFake(),
        id: '',
      }),
    );

    const image = faker.image.imageUrl();

    const showInGallery = true;
    result.current.pressSummaryImageFromGallery(image, showInGallery);

    await waitFor(() => {
      expect(result.current.isOpenImagesGallery).toEqual(true);
    });

    result.current.closeImagesGallery();

    await waitFor(() => {
      expect(result.current.isOpenImagesGallery).toEqual(false);
    });
  });

  test('should update backgroundImage when initialize', async () => {
    const backgroundImage = faker.image.imageUrl();
    const { result } = renderHook(() =>
      usePlaceDetails({
        gallerySummaryImages: [faker.image.imageUrl()],
        getPlaceDetails: new GetPlaceDetailsFake(),
        id: '',
      }),
    );

    expect(result.current.backgroundImage).toEqual(backgroundImage);
  });

  test('should call get of GetPlaceDetails correctly when initialize', async () => {
    const getPlaceDetails = new GetPlaceDetailsFake();
    const id = 'any_id';
    renderHook(() =>
      usePlaceDetails({
        gallerySummaryImages: [faker.image.imageUrl()],
        getPlaceDetails,
        id,
      }),
    );

    expect(getPlaceDetails.id).toEqual(id);
  });

  test('should get place details with success when initialize', async () => {
    const getPlaceDetails = new GetPlaceDetailsFake();
    const id = 'any_id';
    const { result } = renderHook(() =>
      usePlaceDetails({
        gallerySummaryImages: [faker.image.imageUrl()],
        getPlaceDetails,
        id,
      }),
    );

    await waitFor(() => {
      expect(result.current.amountOfReviews).toEqual(
        getPlaceDetails.placeDetails.amountOfReviews + ' avaliações',
      );
      expect(result.current.title).toEqual(getPlaceDetails.placeDetails.title);
      expect(result.current.contact).toEqual(
        getPlaceDetails.placeDetails.contact,
      );
      expect(result.current.description).toEqual(
        getPlaceDetails.placeDetails.description,
      );
      expect(result.current.fullLocation).toEqual(
        getPlaceDetails.placeDetails.fullLocation,
      );
      expect(result.current.myDistanceOfLocal).toEqual(
        'a ' + getPlaceDetails.placeDetails.distance + 'm',
      );
      expect(result.current.location).toEqual(
        getPlaceDetails.placeDetails.location,
      );
      expect(result.current.rating).toEqual(
        getPlaceDetails.placeDetails.rating + '/5',
      );
      expect(result.current.photoOfReviewProfiles).toEqual(
        getPlaceDetails.placeDetails.photoOfReviewProfiles,
      );
      expect(result.current.businessHoursSummary).toEqual(
        'Diariamente - Acesso livre (24 horas)',
      );
    });
  });

  test('should get empty place details when GetPlaceDetails get returns error', async () => {
    const getPlaceDetails = new GetPlaceDetailsFake();
    getPlaceDetails.completeGetWithError('ocorreu um erro');
    const id = 'any_id';
    const { result } = renderHook(() =>
      usePlaceDetails({
        gallerySummaryImages: [faker.image.imageUrl()],
        getPlaceDetails,
        id,
      }),
    );

    await waitFor(() => {
      expect(result.current.amountOfReviews).toEqual('');
      expect(result.current.title).toEqual('');
      expect(result.current.contact).toEqual('');
      expect(result.current.description).toEqual('');
      expect(result.current.fullLocation).toEqual('');
      expect(result.current.myDistanceOfLocal).toEqual('');
      expect(result.current.location).toEqual('');
      expect(result.current.rating).toEqual('');
      expect(result.current.photoOfReviewProfiles).toEqual([]);
      expect(result.current.businessHoursSummary).toEqual('');
    });
  });
});
