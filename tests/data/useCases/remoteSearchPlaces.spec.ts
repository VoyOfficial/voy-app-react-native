import { HttpStatusCode } from '~/data/http';
import { Filter, Ordination } from '~/domain/enums';
import { NoAccessError, UnexpectedError } from '~/data/errors';
import { RemoteSearchPlaces } from '~/data/useCases';
import { makeNextPageToken, makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';
import searchPlacesModelFactory from '../helpers/searchPlacesModelFactory';

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
});

const makeSut = (url = makeUrl()) => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteSearchPlaces(url, httpClient);

  return { sut, httpClient };
};
