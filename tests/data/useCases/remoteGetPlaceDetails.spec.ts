import { faker } from '@faker-js/faker';
import { HttpStatusCode } from '~/data/http';
import {
  NotHaveAccessToPlaceDetailsError,
  PlaceDetailsNotFoundError,
  UnexpectedError,
} from '~/data/errors';
import { RemoteGetPlaceDetails } from '~/data/useCases';
import { PlaceDetailsModel } from '~/domain/models';
import { makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';
import AnalyticsTrackerSpy from '../analytics/analyticsTrackerSpy';

const analyticsTrackerSpy = new AnalyticsTrackerSpy();

describe('Data: RemoteGetPlaceDetails', () => {
  test('should get with httpGetClient calling correct url', () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    const sut = new RemoteGetPlaceDetails(url, httpClient, analyticsTrackerSpy);

    const id = faker.datatype.uuid();
    sut.get(id);

    expect(httpClient.url).toEqual(`${url}?id=${id}`);
  });

  test('should get with httpGetClient returning the place details with success', async () => {
    const placeDetailsResponse = {
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
      rating: faker.datatype.number().toString(),
    };
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithSuccess(HttpStatusCode.ok, placeDetailsResponse);

    const sut = new RemoteGetPlaceDetails(url, httpClient, analyticsTrackerSpy);

    const id = faker.datatype.uuid();
    const placeDetails = await sut.get(id);

    expect(placeDetails).toEqual(placeDetailsResponse);
  });

  test('must try get the place details through of httpGetClient, returning exception unexpected', async () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithUnexpectedError();

    const sut = new RemoteGetPlaceDetails(url, httpClient, analyticsTrackerSpy);

    const id = faker.datatype.uuid();
    const promise = sut.get(id);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('must try get the place details through of httpGetClient, returning place details not found exception', async () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithPlaceDetailsNotFound();

    const sut = new RemoteGetPlaceDetails(url, httpClient, analyticsTrackerSpy);

    const id = faker.datatype.uuid();
    const promise = sut.get(id);

    await expect(promise).rejects.toThrow(new PlaceDetailsNotFoundError());
  });

  test('must try get the place details through of httpGetClient, returning not have access exception', async () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithForbiddenError();

    const sut = new RemoteGetPlaceDetails(url, httpClient, analyticsTrackerSpy);

    const id = faker.datatype.uuid();
    const promise = sut.get(id);

    await expect(promise).rejects.toThrow(
      new NotHaveAccessToPlaceDetailsError(),
    );
  });

  describe('Analytics', () => {
    test('should track the place details event with correct parameters', async () => {
      const analytics = new AnalyticsTrackerSpy();
      const url = makeUrl();
      const placeDetails = mockRemotePlaceDetails();
      const httpClient = new HttpClientSpy();
      httpClient.response = {
        statusCode: HttpStatusCode.ok,
        body: placeDetails,
      };
      const sut = new RemoteGetPlaceDetails(url, httpClient, analytics);

      const id = faker.datatype.uuid();
      await sut.get(id);

      expect(analytics.event).toEqual('place_details');
      expect(analytics.params).toEqual({
        place_title: placeDetails.title,
        place_location: placeDetails.fullLocation,
        place_rating: placeDetails.rating,
        place_distance: placeDetails.distance,
        place_amount_of_reviews: placeDetails.amountOfReviews,
      });
    });
  });
});

const mockRemotePlaceDetails = (): PlaceDetailsModel => {
  return {
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
};
