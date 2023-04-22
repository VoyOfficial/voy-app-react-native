import { UnexpectedError, ValidationError } from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { RemoteListPlaces } from '~/data/useCases';
import { makeUrl } from './helpers/testFactories';
import { HttpClientSpy } from './http/httpClientSpy';
import { mockRemoteListPlace } from './mocks/mockRemotePlaces';

describe('Data: RemoteListPlaces', () => {
  test('should add with httpPostClient call correct url', async () => {
    const url = makeUrl();
    const { httpClient, sut } = makeSut(url);

    await sut.list();

    expect(httpClient.url).toBe(url);
  });

  test('should throw ValidationError if HttpClient return 403', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new ValidationError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.internalServerError,
    };

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a list of SurveyModels if HttpClient returns 200', async () => {
    const { sut, httpClient } = makeSut();
    const httpResult = mockRemoteListPlace();
    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const placeList = await sut.list();

    expect(placeList).toEqual([
      {
        about: httpResult[0].about,
        address: httpResult[0].address,
        businessHours: httpResult[0].businessHours,
        comments: httpResult[0].comments,
        contact: httpResult[0].contact,
        images: httpResult[0].images,
        isSaved: httpResult[0].isSaved,
        name: httpResult[0].name,
        rating: httpResult[0].rating,
      },
    ]);
  });

  test('Should return an empty list if HttpClient returns 204', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.noContent,
    };

    const placeList = await sut.list();

    expect(placeList).toEqual([]);
  });
});

const makeSut = (url = makeUrl()) => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteListPlaces(url, httpClient);

  return { sut, httpClient };
};
