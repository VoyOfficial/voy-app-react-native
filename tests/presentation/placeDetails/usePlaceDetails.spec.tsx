import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { GetPlaceDetails } from '~/domain/useCases';
import { PlaceDetailsModel } from '~/domain/models';
import { usePlaceDetails } from '../../../src/presentation/placeDetails';

jest.useFakeTimers();

export class GetPlaceDetailsSpy implements GetPlaceDetails {
  getCalled = 0;
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
    photoOfReviewProfiles: [],
    gallerySummaryImages: [faker.image.imageUrl()],
    rating: faker.datatype.number({ min: 1, max: 5 }).toString(),
  };
  id = 0;
  error: { status: boolean; message: string } = { message: '', status: false };
  get = async (id: number): Promise<PlaceDetailsModel> => {
    this.getCalled += 1;
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
    const { result } = makeSut({ id: 0 });

    expect(result.current.backgroundImage).toEqual('');

    const image = faker.image.imageUrl();

    await waitFor(() => {
      result.current.pressSummaryImageFromGallery(image, false);
      expect(result.current.backgroundImage).toEqual(image);
    });
  });

  test('should update isOpenImagesGallery to true when call pressSummaryImageFromGallery with showInGallery true', async () => {
    const { result } = makeSut({ id: 0 });

    expect(result.current.isOpenImagesGallery).toEqual(false);

    const image = faker.image.imageUrl();

    const showInGallery = true;

    await waitFor(() => {
      result.current.pressSummaryImageFromGallery(image, showInGallery);
      expect(result.current.isOpenImagesGallery).toEqual(true);
    });
  });

  test('should update isOpenImagesGallery to false when call closeImagesGallery', async () => {
    const { result } = makeSut({ id: 0 });

    const image = faker.image.imageUrl();

    const showInGallery = true;

    await waitFor(() => {
      result.current.pressSummaryImageFromGallery(image, showInGallery);
      expect(result.current.isOpenImagesGallery).toEqual(true);
    });

    await waitFor(() => {
      result.current.closeImagesGallery();
      expect(result.current.isOpenImagesGallery).toEqual(false);
    });
  });

  test('should update backgroundImage when initialize', async () => {
    const getPlaceDetails = new GetPlaceDetailsSpy();
    const { result } = makeSut({
      id: 0,
      getPlaceDetails,
    });

    await waitFor(() => {
      expect(result.current.backgroundImage).toEqual(
        getPlaceDetails.placeDetails.gallerySummaryImages[0],
      );
    });
  });

  test('should call get of GetPlaceDetails correctly when initialize', async () => {
    const getPlaceDetails = new GetPlaceDetailsSpy();
    const id = 0;

    makeSut({
      id,
      getPlaceDetails,
    });

    await waitFor(() => {
      expect(getPlaceDetails.id).toEqual(id);
    });
  });

  test('should get place details with success when initialize', async () => {
    const getPlaceDetails = new GetPlaceDetailsSpy();
    const id = 0;

    const { result } = makeSut({
      id,
      getPlaceDetails,
    });

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
      expect(result.current.gallerySummaryImages).toEqual(
        getPlaceDetails.placeDetails.gallerySummaryImages,
      );
      expect(result.current.businessHoursSummary).toEqual(
        'Diariamente - Acesso livre (24 horas)',
      );
    });
  });

  test('should get empty place details when GetPlaceDetails get returns error', async () => {
    const id = 0;
    const getPlaceDetails = new GetPlaceDetailsSpy();
    getPlaceDetails.completeGetWithError('ocorreu um erro');

    const { result } = makeSut({
      id,
      getPlaceDetails,
    });

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

  describe('error', () => {
    test('should the error returning true when placeDetails are empty', async () => {
      const getPlaceDetails = new GetPlaceDetailsSpy();
      getPlaceDetails.completeGetWithError('Oops. Houve um erro');
      const { result } = makeSut({ id: 0, getPlaceDetails });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });

      await waitFor(() => {
        expect(result.current.error).toEqual(true);
      });
    });

    test('should call the get from getPlaceDetails when calling the tryGetPlaceDetailsAgain function', async () => {
      const getPlaceDetails = new GetPlaceDetailsSpy();
      getPlaceDetails.completeGetWithError('Oops. Houve um erro');
      const { result } = makeSut({ id: 0, getPlaceDetails });

      await waitFor(() => {
        result.current.tryGetPlaceDetailsAgain();
      });

      expect(getPlaceDetails.getCalled).toEqual(2);
    });

    test('should the error returning false when place details are empty and finding is true', async () => {
      const getPlaceDetails = new GetPlaceDetailsSpy();
      getPlaceDetails.completeGetWithError('Oops. Houve um erro');
      const { result } = makeSut({
        id: 0,
        getPlaceDetails,
      });

      await waitFor(() => {
        expect(result.current.finding).toEqual(true);
        expect(result.current.error).toEqual(false);
      });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });
    });
  });

  describe('loading', () => {
    test('should the finding returning true correctly when it is finding the place details', async () => {
      const { result } = makeSut({ id: 0 });

      await waitFor(() => {
        expect(result.current.finding).toEqual(true);
      });

      jest.advanceTimersByTime(1200);

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });
    });

    test('should set finding to true and then back to false when calling tryGetPlaceDetailsAgain', async () => {
      const { result } = makeSut({ id: 0 });

      await waitFor(() => {
        expect(result.current.finding).toBe(false);
      });

      await waitFor(() => {
        result.current.tryGetPlaceDetailsAgain();
        expect(result.current.finding).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.finding).toBe(false);
      });
    });
  });
});

type SutProps = {
  id: number;
  getPlaceDetails?: GetPlaceDetails;
};

const makeSut = ({
  id,
  getPlaceDetails = new GetPlaceDetailsSpy(),
}: SutProps) => {
  return renderHook(() =>
    usePlaceDetails({
      getPlaceDetails,
      id,
    }),
  );
};
