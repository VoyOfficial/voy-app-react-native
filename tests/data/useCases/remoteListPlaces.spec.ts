import { NoPermissionError, UnexpectedError } from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { RemoteListPlaces } from '~/data/useCases';
import { makeNextPageToken, makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';
import { mockApiListPlaces } from '../mocks/mockApiPlaces';
import AnalyticsTrackerSpy from '../analytics/analyticsTrackerSpy';

describe('Data: RemoteListPlaces', () => {
  test('should list with httpPostClient call correct url', async () => {
    const url = makeUrl();
    const location = { long: '-1213242432', lat: '-2324546432' };
    const { httpClient, sut } = makeSut(url);

    await sut.list(location);

    expect(httpClient.url).toBe(
      url + '?longitude=' + location.long + '&latitude=' + location.lat,
    );
  });

  test('should list with httpPostClient calling correct url with nextPageToken', async () => {
    const url = makeUrl();
    const nextPageToken = makeNextPageToken();
    const location = { long: '-1213242432', lat: '-2324546432' };
    const { httpClient, sut } = makeSut(url);

    await sut.list(location, nextPageToken);

    expect(httpClient.url).toBe(
      url +
        '?longitude=' +
        location.long +
        '&latitude=' +
        location.lat +
        '&nextPageToken=' +
        nextPageToken,
    );
  });

  test('should throw NoPermissionError if HttpClient return 403', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.list({ long: '', lat: '' });

    await expect(promise).rejects.toThrow(NoPermissionError);
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.internalServerError,
    };

    const promise = sut.list({ long: '', lat: '' });

    await expect(promise).rejects.toThrow(UnexpectedError);
  });

  test('Should return a list of places if HttpClient returns 200', async () => {
    const { sut, httpClient } = makeSut();
    const apiPlaces = mockApiListPlaces(3);
    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: { places: apiPlaces },
    };

    const placeList = await sut.list({ long: '', lat: '' });

    expect(placeList.length).toBe(apiPlaces.length);
    placeList.forEach((place, index) => {
      expect(place.title).toBe(apiPlaces[index].name);
      expect(place.location).toBe(apiPlaces[index].address);
      expect(place.rating).toBe(String(apiPlaces[index].rating));
      expect(place.amountOfReviews).toBe(
        String(apiPlaces[index].userRatingsTotal),
      );
    });
  });

  test('Should return a list of places empty if HttpClient returns 200', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: undefined,
    };

    const placeList = await sut.list({ long: '', lat: '' });

    expect(placeList).toEqual([]);
  });

  test('Should return an empty list if HttpClient returns 204', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.noContent,
    };

    const placeList = await sut.list({ long: '', lat: '' });

    expect(placeList).toEqual([]);
  });

  describe('Analytics', () => {
    const emptyParameters = [
      {
        long: '-1213242432',
        lat: '-2324546432',
        place: null,
      },
      {
        long: '',
        lat: '',
        place: null,
      },
    ];

    test('should track the list places event with correct parameters', async () => {
      const { sut, httpClient, analytics } = makeSut();
      const apiPlaces = mockApiListPlaces(2);
      httpClient.response = {
        statusCode: HttpStatusCode.ok,
        body: { places: apiPlaces },
      };

      const location = { long: '-1213242432', lat: '-2324546432' };
      const nextPageToken = makeNextPageToken();
      await sut.list(location, nextPageToken);

      expect(analytics.event).toBe('list_places');
      expect(analytics.params).toEqual({
        long: location.long,
        lat: location.lat,
        places_title: apiPlaces.map((place) => place.name),
        place_count: apiPlaces.length,
      });
    });

    test.each(emptyParameters)(
      'should track the list places event with empty parameters',
      async (parameters) => {
        const { sut, httpClient, analytics } = makeSut();
        httpClient.response = {
          statusCode: HttpStatusCode.ok,
          body: { places: parameters.place || [] },
        };

        const location = { long: parameters.long, lat: parameters.lat };
        const nextPageToken = makeNextPageToken();
        await sut.list(location, nextPageToken);

        expect(analytics.event).toBe('');
        expect(analytics.params).toEqual({});
      },
    );

    test.each([HttpStatusCode.noContent, HttpStatusCode.forbidden])(
      'should not track the list places event when httpClient returns different of 200',
      async (statusCode) => {
        const { sut, httpClient, analytics } = makeSut();
        httpClient.response = {
          statusCode: statusCode,
          body: null,
        };

        const location = { long: '-1213242432', lat: '-2324546432' };
        const nextPageToken = makeNextPageToken();

        if (statusCode === HttpStatusCode.forbidden) {
          await expect(sut.list(location, nextPageToken)).rejects.toThrow();
        } else {
          await sut.list(location, nextPageToken);
        }

        expect(analytics.event).toBe('');
        expect(analytics.params).toEqual({});
      },
    );
  });
});

const makeSut = (url = makeUrl()) => {
  const analytics = new AnalyticsTrackerSpy();
  const httpClient = new HttpClientSpy();
  const sut = new RemoteListPlaces(url, httpClient, analytics);

  return { sut, httpClient, analytics };
};
