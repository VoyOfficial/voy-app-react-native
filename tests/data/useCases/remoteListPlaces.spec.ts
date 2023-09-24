import { NoPermissionError, UnexpectedError } from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { RemoteListPlaces } from '~/data/useCases';
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
});

const makeSut = (url = makeUrl()) => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteListPlaces(url, httpClient);

  return { sut, httpClient };
};
