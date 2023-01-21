import FavoriteLocationModel from 'src/domain/models/favoriteLocationModel';
import { UnexpectedError } from '~/data/errors';
import { HttpGetClient, HttpStatusCode } from '~/data/http';
import { ListFavoriteLocations } from '~/domain/useCases';
import { makeUrl } from './helpers/testFactories';
import { HttpClientSpy } from './http/httpClientSpy';

describe('Data: RemoteListFavoriteLocations', () => {
  test('should list with httpGetClient calling the correct url', () => {
    const httpGetClient = new HttpClientSpy();
    const url = makeUrl();
    const sut = new RemoteListFavoriteLocations(url, httpGetClient);

    sut.list();

    expect(httpGetClient.url).toEqual(url);
  });

  test('should list with httpGetClient and return unexpected exception', async () => {
    const httpGetClient = new HttpClientSpy();
    const url = makeUrl();
    const sut = new RemoteListFavoriteLocations(url, httpGetClient);
    httpGetClient.completeWithUnexpectedError();

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should list with httpGetClient returning noContent error and return list empty', async () => {
    const httpGetClient = new HttpClientSpy();
    const url = makeUrl();
    const sut = new RemoteListFavoriteLocations(url, httpGetClient);
    httpGetClient.completeWithNoContentError();

    const response = await sut.list();

    expect(response).toEqual([]);
  });
});

class RemoteListFavoriteLocations implements ListFavoriteLocations {
  constructor(readonly url: string, readonly httpGetClient: HttpGetClient) {}

  async list(): Promise<Array<FavoriteLocationModel>> {
    const response = await this.httpGetClient.get({ url: this.url });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return [] as unknown as Promise<Array<FavoriteLocationModel>>;
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
