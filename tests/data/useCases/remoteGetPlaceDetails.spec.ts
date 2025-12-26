import { faker } from '@faker-js/faker';
import { HttpStatusCode } from '~/data/http';
import {
  NotHaveAccessToPlaceDetailsError,
  PlaceDetailsNotFoundError,
  UnexpectedError,
} from '~/data/errors';
import { RemoteGetPlaceDetails } from '~/data/useCases';
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

    expect(httpClient.url).toEqual(`${url}/${id}`);
  });

  test('should get with httpGetClient returning the place details with success', async () => {
    const mockApiResponse = {
      name: faker.company.name(),
      about: faker.lorem.paragraph(),
      address: faker.address.streetAddress(),
      rating: faker.datatype.number({ min: 1, max: 5 }),
      userRatingsTotal: faker.datatype.number(),
      businessHours: {
        sunday: { start: '08:00', end: '12:00' },
        monday: { start: '08:00', end: '12:00' },
        tuesday: { start: '08:00', end: '12:00' },
        wednesday: { start: '08:00', end: '12:00' },
        thursday: { start: '08:00', end: '12:00' },
        friday: { start: '08:00', end: '12:00' },
        saturday: { start: '08:00', end: '12:00' },
      },
      contact: faker.phone.number(),
      photos: [
        {
          imageBase64:
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        },
      ],
    };
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithSuccess(HttpStatusCode.ok, mockApiResponse);

    const sut = new RemoteGetPlaceDetails(url, httpClient, analyticsTrackerSpy);

    const id = faker.datatype.uuid();
    const placeDetails = await sut.get(id);

    expect(placeDetails.title).toEqual(mockApiResponse.name);
    expect(placeDetails.description).toEqual(mockApiResponse.about);
    expect(placeDetails.location).toEqual(mockApiResponse.address);
    expect(placeDetails.fullLocation).toEqual(mockApiResponse.address);
    expect(placeDetails.rating).toEqual(mockApiResponse.rating.toString());
    expect(placeDetails.amountOfReviews).toEqual(
      mockApiResponse.userRatingsTotal.toString(),
    );
    expect(placeDetails.contact).toEqual(mockApiResponse.contact);
    expect(placeDetails.businessHoursSummary).toEqual(
      mockApiResponse.businessHours,
    );
    expect(placeDetails.photoOfReviewProfiles).toEqual([]);
    expect(placeDetails.gallerySummaryImages).toHaveLength(1);
    expect(placeDetails.gallerySummaryImages[0]).toContain(
      'data:image/png;base64',
    );
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
        place_title: placeDetails.name,
        place_location: placeDetails.address,
        place_rating: placeDetails.rating.toString(),
        place_distance: '',
        place_amount_of_reviews: placeDetails.userRatingsTotal.toString(),
      });
    });
  });
});

const mockRemotePlaceDetails = (): any => {
  return {
    name: faker.company.name(),
    about: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    userRatingsTotal: faker.datatype.number(),
    businessHours: {
      sunday: { start: '08:00', end: '12:00' },
      monday: { start: '08:00', end: '12:00' },
      tuesday: { start: '08:00', end: '12:00' },
      wednesday: { start: '08:00', end: '12:00' },
      thursday: { start: '08:00', end: '12:00' },
      friday: { start: '08:00', end: '12:00' },
      saturday: { start: '08:00', end: '12:00' },
    },
    contact: faker.phone.number(),
    photos: [
      {
        imageBase64:
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      },
    ],
  };
};
