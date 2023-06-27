import { HttpStatusCode } from '~/data/http';
import { Filter, Ordination } from '~/domain/enums';
import { NoAccessError, UnexpectedError } from '~/data/errors';
import { RemoteSearchPlaces } from '~/data/useCases';
import { makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';
import searchPlacesModelFactory from '../helpers/searchPlacesModelFactory';

describe('Data: RemoteSearchPlaces', () => {
  test('should search with httpPostClient calling correct url with page param', () => {
    const page = 10;
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    sut.search(
      '',
      {
        filter: Filter.Entertainment,
        ordination: Ordination.Distance,
      },
      page,
    );

    expect(httpClient.url).toEqual(url + '?page=' + page);
  });

  test('should search with httpPostClient calling correct url with place searched', () => {
    const page = 10;
    const place = 'coffee shop';
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    sut.search(
      place,
      {
        filter: Filter.Entertainment,
        ordination: Ordination.Distance,
      },
      page,
    );

    const params = `/${place.replace(' ', '%20')}` + `?page=${page}`;
    expect(httpClient.url).toEqual(url + params);
  });

  test('should search in the body of the httpPostClient call for the correct filter and ordination params', () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const { sut, httpClient } = makeSut(url);

    sut.search('', {
      filter: filter,
      ordination: ordination,
    });

    expect(httpClient.body).toEqual({
      filter: filter,
      ordination: ordination,
    });
  });

  test('should search with httpPostClient returning noContent and returning list empty', async () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithNoContentError();

    const response = await sut.search('', {
      filter: filter,
      ordination: ordination,
    });

    expect(response).toEqual([]);
  });

  test('should search with httpPostClient returning noAccess error', async () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithForbiddenError();

    const promise = sut.search('', {
      filter: filter,
      ordination: ordination,
    });

    await expect(promise).rejects.toThrow(new NoAccessError());
  });

  test('should search with httpPostClient returning a list with success', async () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const body = searchPlacesModelFactory();
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithSuccess(HttpStatusCode.ok, body);

    const response = await sut.search('', {
      filter: filter,
      ordination: ordination,
    });

    expect(response).toEqual(body);
  });

  test('should search with httpPostClient returning unexpected error', async () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithUnexpectedError();

    const promise = sut.search('', {
      filter: filter,
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