import { faker } from '@faker-js/faker';
import { HttpStatusCode } from '~/data/http';
import { Filter, Ordination } from '~/domain/enums';
import { NoAccessError, UnexpectedError } from '~/data/errors';
import { RemoteSearchPlaces } from '~/data/useCases';
import { SearchPlaceModel } from '~/domain/models';
import { AnalyticsTracker } from '~/domain/analytics';
import { makeNextPageToken, makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';
import searchPlacesModelFactory from '../helpers/searchPlacesModelFactory';
import AnalyticsTrackerSpy from '../analytics/analyticsTrackerSpy';

describe('Data: RemoteSearchPlaces', () => {
  test('should search with httpPostClient calling correct url with nextPageToken param', () => {
    const nextPageToken = makeNextPageToken();
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    sut.search(
      '',
      {
        types: [Filter.Entertainment],
        ordination: Ordination.Closer,
      },
      nextPageToken,
    );

    expect(httpClient.url).toEqual(url + '?nextPageToken=' + nextPageToken);
  });

  test('should search with httpPostClient calling correct url without nextPageToken param', () => {
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    sut.search('', {
      types: [Filter.Entertainment],
      ordination: Ordination.Closer,
    });

    expect(httpClient.url).toEqual(url);
  });

  test('should search with httpPostClient calling correct url with place searched', () => {
    const nextPageToken = makeNextPageToken();
    const place = 'coffee shop';
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    sut.search(
      place,
      {
        types: [Filter.Entertainment],
        ordination: Ordination.Closer,
      },
      nextPageToken,
    );

    const params =
      `/${place.replace(' ', '%20')}` + `?nextPageToken=${nextPageToken}`;
    expect(httpClient.url).toEqual(url + params);
  });

  test('should search in the body of the httpPostClient call for the correct type and ordination params', () => {
    const url = makeUrl();
    const types = [Filter.Entertainment];
    const ordination = Ordination.Closer;
    const { sut, httpClient } = makeSut(url);

    sut.search('', {
      types: types,
      ordination: ordination,
    });

    expect(httpClient.body).toEqual({
      types: types,
      ordination: ordination,
    });
  });

  test('should search with httpPostClient returning noContent and returning list empty', async () => {
    const url = makeUrl();
    const types = [Filter.Entertainment];
    const ordination = Ordination.Closer;
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithNoContentError();

    const response = await sut.search('', {
      types: types,
      ordination: ordination,
    });

    expect(response).toEqual([]);
  });

  test('should search with httpPostClient returning noAccess error', async () => {
    const url = makeUrl();
    const types = [Filter.Entertainment];
    const ordination = Ordination.Closer;
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithForbiddenError();

    const promise = sut.search('', {
      types: types,
      ordination: ordination,
    });

    await expect(promise).rejects.toThrow(new NoAccessError());
  });

  test('should search with httpPostClient returning a list with success', async () => {
    const url = makeUrl();
    const types = [Filter.Entertainment];
    const ordination = Ordination.Closer;
    const body = searchPlacesModelFactory();
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithSuccess(HttpStatusCode.ok, body);

    const response = await sut.search('', {
      types: types,
      ordination: ordination,
    });

    expect(response).toEqual(body);
  });

  test('should search with httpPostClient returning unexpected error', async () => {
    const url = makeUrl();
    const types = [Filter.Entertainment];
    const ordination = Ordination.Closer;
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithUnexpectedError();

    const promise = sut.search('', {
      types: types,
      ordination: ordination,
    });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  describe('Analytics', () => {
    test('should track the search event with correct parameters', async () => {
      const analytics = new AnalyticsTrackerSpy();
      const url = makeUrl();
      const search = mockSearchPlaceModel();
      const httpClient = new HttpClientSpy();
      httpClient.response = {
        statusCode: HttpStatusCode.ok,
        body: search,
      };
      const sut = new RemoteSearchPlaces(url, httpClient, analytics);

      const types = [Filter.Entertainment];
      const ordination = Ordination.Closer;
      const place = 'coffee shop';
      await sut.search(place, { types: types, ordination: ordination });

      expect(analytics.event).toEqual('search');
      expect(analytics.params).toEqual({
        search: place,
        types,
        ordination,
        result: search,
      });
    });
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

const mockSearchPlaceModel = (): Array<SearchPlaceModel> => {
  const place: SearchPlaceModel = {
    id: faker.datatype.number(),
    rating: faker.datatype
      .number({ min: 1, max: 10, precision: 0.1 })
      .toString(),
    isSaved: faker.datatype.boolean(),
    amountOfReviews: faker.datatype.number().toString(),
    imageUrl: faker.image.city(),
    location: faker.address.cityName(),
    title: faker.company.name(),
    myDistanceOfLocal: faker.datatype.number().toString(),
  };

  return [place];
};
