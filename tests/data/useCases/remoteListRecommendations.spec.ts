import { RecommendationModel } from '~/domain/models';
import { ListRecommendations } from '~/domain/useCases';
import { HttpGetClient, HttpStatusCode } from '~/data/http';
import { UnexpectedError } from '~/data/errors';
import { HttpClientSpy } from '../http/httpClientSpy';
import { makeUrl } from '../helpers/testFactories';
import { mockRemoteListPlace } from '../mocks/mockRemotePlaces';

describe('Data: ListRecommendations', () => {
  test('should list with httpGetClient calling correct url', () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    const sut = new RemoteListRecommendations(url, httpClient);
    sut.list();
    expect(httpClient.url).toEqual(url);
  });

  test('should return a list of recommendations if HttpGetClient returns ok', async () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    const httpResult = mockRemoteListPlace();
    httpClient.completeWithSuccess(HttpStatusCode.ok, httpResult);
    const sut = new RemoteListRecommendations(url, httpClient);
    const listRecommendations = await sut.list();

    for (let index = 0; index < listRecommendations.length; index++) {
      expect(listRecommendations[index]).toEqual(httpResult[index]);
    }
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithUnexpectedError();
    const sut = new RemoteListRecommendations(url, httpClient);
    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithUnexpectedError();
    const sut = new RemoteListRecommendations(url, httpClient);
    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an empty list if HttpGetClient returns no content', async () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithNoContentError();
    const sut = new RemoteListRecommendations(url, httpClient);
    const httpResult = await sut.list();

    expect(httpResult).toEqual([]);
  });
});

class RemoteListRecommendations implements ListRecommendations {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async list(): Promise<RecommendationModel[]> {
    const { statusCode, body } = await this.httpGetClient.get({
      url: this.url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
