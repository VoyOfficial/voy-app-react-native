import { NoPermissionError, UnexpectedError } from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { RemoteListPlaces } from '~/data/useCases';
import { AnalyticsTracker } from '~/domain/analytics';
import { makeNextPageToken, makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';
import { mockRemoteListPlace } from '../mocks/mockRemotePlaces';

describe('Data: RemoteListPlaces', () => {
  test('should list with httpPostClient call correct url', async () => {
    const url = makeUrl();
    const location = { long: '-1213242432', lat: '-2324546432' };
    const { httpClient, sut } = makeSut(url);

    await sut.list(location);

    expect(httpClient.url).toBe(
      url + '?long=' + location.long + '&lat=' + location.lat,
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
        '?long=' +
        location.long +
        '&lat=' +
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

    await expect(promise).rejects.toThrow(new NoPermissionError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.internalServerError,
    };

    const promise = sut.list({ long: '', lat: '' });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a list of places if HttpClient returns 200', async () => {
    const { sut, httpClient } = makeSut();
    const httpResult = mockRemoteListPlace();
    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const placeList = await sut.list({ long: '', lat: '' });

    for (let index = 0; index < placeList.length; index++) {
      expect(placeList[index]).toEqual(httpResult[index]);
    }
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
      const httpResult = mockRemoteListPlace();
      httpClient.response = {
        statusCode: HttpStatusCode.ok,
        body: httpResult,
      };

      const location = { long: '-1213242432', lat: '-2324546432' };
      const nextPageToken = makeNextPageToken();
      await sut.list(location, nextPageToken);

      expect(analytics.event).toBe('list_places');
      expect(analytics.params).toEqual({
        long: location.long,
        lat: location.lat,
        places: httpResult,
      });
    });

    test.each(emptyParameters)(
      'should track the list places event with empty parameters',
      async (parameters) => {
        const { sut, httpClient, analytics } = makeSut();
        httpClient.response = {
          statusCode: HttpStatusCode.ok,
          body: parameters.place,
        };

        const location = { long: parameters.long, lat: parameters.lat };
        const nextPageToken = makeNextPageToken();
        await sut.list(location, nextPageToken);

        expect(analytics.event).toBe('list_places');
        expect(analytics.params).toEqual({
          long: parameters.long,
          lat: parameters.lat,
          places: [],
        });
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

        if (statusCode === HttpStatusCode.forbidden)
          await expect(sut.list(location, nextPageToken)).rejects.toThrow();

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

class AnalyticsTrackerSpy implements AnalyticsTracker {
  event = '';
  params: Record<string, any> = {};

  trackEvent = async (
    event: string,
    params: Record<string, any>,
  ): Promise<boolean> => {
    this.event = event;
    this.params = { ...params };
    return false;
  };
}
