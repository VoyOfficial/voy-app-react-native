import { NoAccessError, UnexpectedError } from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { RemoteListFavoritePlaces } from '~/data/useCases';
import favoritePlacesModelFactory from '../helpers/favoritePlacesModelFactory';
import { makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';

describe('Data: RemoteListFavoritePlaces', () => {
  test('should list with httpGetClient calling the correct url', () => {
    const url = makeUrl();
    const { sut, httpGetClient } = makeSut(url);

    sut.list();

    expect(httpGetClient.url).toEqual(url);
  });

  test('should list with httpGetClient and return unexpected exception', async () => {
    const { sut, httpGetClient } = makeSut();
    httpGetClient.completeWithUnexpectedError();

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should list with httpGetClient returning noContent error and return list empty', async () => {
    const { sut, httpGetClient } = makeSut();
    httpGetClient.completeWithNoContentError();

    const response = await sut.list();

    expect(response).toEqual([]);
  });

  test('should list with httpGetClient and return noAccess exception', async () => {
    const { sut, httpGetClient } = makeSut();
    httpGetClient.completeWithForbiddenError();

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new NoAccessError());
  });

  test('should list with httpGetClient and return content with success', async () => {
    const { sut, httpGetClient } = makeSut();
    const httpResponse = favoritePlacesModelFactory();
    httpGetClient.completeWithSuccess(HttpStatusCode.ok, httpResponse);

    const response = await sut.list();

    expect(response).toEqual(httpResponse);
  });
});

const makeSut = (url = makeUrl()) => {
  const httpGetClient = new HttpClientSpy();
  const sut = new RemoteListFavoritePlaces(url, httpGetClient);

  return { sut, httpGetClient };
};
