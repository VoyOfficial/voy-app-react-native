import { HttpStatusCode } from '~/data/http';
import { Filter, Ordination } from '~/domain/enums';
import { NoAccessError, UnexpectedError } from '~/data/errors';
import { RemoteSearchPlaces } from '~/data/useCases';
import { AnalyticsTracker } from '~/domain/analytics';
import { formatBase64Image } from '~/data/helpers';
import { makeNextPageToken, makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';
import searchPlacesModelFactory from '../helpers/searchPlacesModelFactory';
import AnalyticsTrackerSpy from '../analytics/analyticsTrackerSpy';

const location = { lat: '-29.385436', long: '-50.877608' };
const filterParam = {
  types: [Filter.Entertainment],
  ordination: Ordination.Closer,
};

describe('Data: RemoteSearchPlaces', () => {
  test('should search with httpPostClient calling correct url with location and nextPageToken', async () => {
    const nextPageToken = makeNextPageToken();
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    await sut.search('coffee shop', filterParam, location, nextPageToken);

    const expected = new URLSearchParams({
      place: 'coffee shop',
      latitude: location.lat,
      longitude: location.long,
      nextPageToken,
    }).toString();
    expect(httpClient.url).toEqual(`${url}?${expected}`);
  });

  test('should search with httpPostClient calling correct url without nextPageToken', async () => {
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    await sut.search('', filterParam, location);

    const expected = new URLSearchParams({
      place: '',
      latitude: location.lat,
      longitude: location.long,
    }).toString();
    expect(httpClient.url).toEqual(`${url}?${expected}`);
  });

  test('should search in the body of the httpPostClient call for the correct type and ordination params', async () => {
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    await sut.search('', filterParam, location);

    expect(httpClient.body).toEqual({
      types: filterParam.types,
      ordination: filterParam.ordination,
    });
  });

  test('should search with httpPostClient returning noContent and returning list empty', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithNoContentError();

    const response = await sut.search('', filterParam, location);

    expect(response).toEqual([]);
  });

  test('should search with httpPostClient returning noAccess error', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithForbiddenError();

    const promise = sut.search('', filterParam, location);

    await expect(promise).rejects.toThrow(new NoAccessError());
  });

  test('should search with httpPostClient returning a mapped list with success', async () => {
    const body = searchPlacesModelFactory(2);
    const { sut, httpClient } = makeSut();
    httpClient.completeWithSuccess(HttpStatusCode.ok, body);

    const response = await sut.search('', filterParam, location);

    expect(response).toEqual(
      body.places.map((apiPlace) => ({
        id: String(apiPlace.googlePlaceId),
        rating: String(apiPlace.rating || 0),
        isSaved: Boolean(apiPlace.isSaved),
        amountOfReviews: String(apiPlace.userRatingsTotal || 0),
        imageUri: formatBase64Image(
          apiPlace.photo || apiPlace.photoReference || '',
        ),
        location: apiPlace.address || '',
        title: apiPlace.name || '',
        myDistanceOfLocal: apiPlace.distanceFromUserLocation || '0',
      })),
    );
  });

  test('should search with httpPostClient returning unexpected error', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();

    const promise = sut.search('', filterParam, location);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  describe('Analytics', () => {
    test('should track the search event with correct parameters', async () => {
      const analytics = new AnalyticsTrackerSpy();
      const url = makeUrl();
      const body = searchPlacesModelFactory(1);
      const httpClient = new HttpClientSpy();
      httpClient.response = {
        statusCode: HttpStatusCode.ok,
        body,
      };
      const sut = new RemoteSearchPlaces(url, httpClient, analytics);
      const place = 'coffee shop';

      await sut.search(place, filterParam, location);

      expect(analytics.event).toEqual('search');
      expect(analytics.params).toEqual({
        search: place,
        types: filterParam.types,
        ordination: filterParam.ordination,
        result: {
          places_title: body.places.map((item) => item.name),
          place_count: body.places.length,
        },
      });
    });

    test('should track the search event with empty body', async () => {
      const analytics = new AnalyticsTrackerSpy();
      const url = makeUrl();
      const httpClient = new HttpClientSpy();
      httpClient.response = {
        statusCode: HttpStatusCode.ok,
        body: null,
      };
      const sut = new RemoteSearchPlaces(url, httpClient, analytics);
      const place = 'coffee shop';

      await sut.search(place, filterParam, location);

      expect(analytics.event).toEqual('search');
      expect(analytics.params).toEqual({
        search: place,
        types: filterParam.types,
        ordination: filterParam.ordination,
        result: [],
      });
    });

    test.each([HttpStatusCode.noContent, HttpStatusCode.forbidden])(
      'should not track the search event when httpClient returns different of 200',
      async (statusCode) => {
        const analytics = new AnalyticsTrackerSpy();
        const url = makeUrl();
        const httpClient = new HttpClientSpy();
        httpClient.response = {
          statusCode: statusCode,
          body: null,
        };
        const sut = new RemoteSearchPlaces(url, httpClient, analytics);
        const place = 'coffee shop';

        if (statusCode === HttpStatusCode.forbidden) {
          await expect(
            sut.search(place, filterParam, location),
          ).rejects.toThrow();
        } else {
          await sut.search(place, filterParam, location);
        }

        expect(analytics.event).toBe('');
        expect(analytics.params).toEqual({});
      },
    );
  });
});

const makeSut = (
  url = makeUrl(),
  analytics: AnalyticsTracker = new AnalyticsTrackerSpy(),
) => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteSearchPlaces(url, httpClient, analytics);

  return { sut, httpClient };
};
