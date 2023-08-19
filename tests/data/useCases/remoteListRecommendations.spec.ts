import { HttpStatusCode } from '~/data/http';
import { NoPermissionError, UnexpectedError } from '~/data/errors';
import { RemoteListRecommendations } from '~/data/useCases';
import { HttpClientSpy } from '../http/httpClientSpy';
import { makeUrl } from '../helpers/testFactories';
import { mockRemoteListPlace } from '../mocks/mockRemotePlaces';

describe('Data: ListRecommendations', () => {
  test('should list with httpGetClient calling correct url', () => {
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);
    sut.list();
    expect(httpClient.url).toEqual(url);
  });

  test('should return a list of recommendations if HttpGetClient returns ok', async () => {
    const httpResult = mockRemoteListPlace();
    const { sut, httpClient } = makeSut();
    httpClient.completeWithSuccess(HttpStatusCode.ok, httpResult);
    const listRecommendations = await sut.list();

    for (let index = 0; index < listRecommendations.length; index++) {
      expect(listRecommendations[index]).toEqual(httpResult[index]);
    }
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();
    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();
    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an empty list if HttpGetClient returns no content', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithNoContentError();
    const httpResult = await sut.list();

    expect(httpResult).toEqual([]);
  });

  test('should throw NoPermission exception if HttpClient return is forbidden status', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new NoPermissionError());
  });
});

const makeSut = (url = makeUrl()) => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteListRecommendations(url, httpClient);
  return { sut, httpClient };
};
