import RoadmapModel from 'src/domain/models/roadmapModel';
import { NoAccessError, UnexpectedError } from '~/data/errors';
import { HttpGetClient, HttpStatusCode } from '~/data/http';
import { ListRoadmap } from '../../src/domain/useCases';
import roadmapModelFactory from './helpers/roadmapModelFactory';
import { makeUrl } from './helpers/testFactories';
import { HttpClientSpy } from './http/httpClientSpy';

class RemoteListRoadmap implements ListRoadmap {
  constructor(readonly url: string, readonly httpGetClient: HttpGetClient) {}

  async list(): Promise<RoadmapModel[]> {
    const response = await this.httpGetClient.get({ url: this.url });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new NoAccessError();
      default:
        throw new UnexpectedError();
    }
  }
}

describe('Data: RemoteListRoadmap', () => {
  test('should list with httpGetClient calling the correct url', async () => {
    const url = makeUrl();
    const { sut, httpGetClient } = makeSut(url);

    sut.list();

    expect(httpGetClient.url).toEqual(url);
  });

  test('should list with httpGetClient and return noContent error and return list empty', async () => {
    const { sut, httpGetClient } = makeSut();
    httpGetClient.completeWithNoContentError();

    const response = await sut.list();

    expect(response).toEqual([]);
  });

  test('should list with httpGetClient and return uneExpected error', async () => {
    const { sut, httpGetClient } = makeSut();
    httpGetClient.completeWithUnexpectedError();

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should list with httpGetClient and return noAccess error', async () => {
    const { sut, httpGetClient } = makeSut();
    httpGetClient.completeWithForbiddenError();

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new NoAccessError());
  });

  test('should list with httpGetClient and return content with success', async () => {
    const { sut, httpGetClient } = makeSut();
    const httpResponse = roadmapModelFactory();
    httpGetClient.completeWithSuccess(HttpStatusCode.ok, httpResponse);

    const response = await sut.list();

    expect(response).toEqual(httpResponse);
  });
});

const makeSut = (url = makeUrl()) => {
  const httpGetClient = new HttpClientSpy();
  const sut = new RemoteListRoadmap(url, httpGetClient);

  return { sut, httpGetClient };
};
