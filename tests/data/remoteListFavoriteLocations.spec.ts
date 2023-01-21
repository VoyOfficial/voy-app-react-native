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
});

class RemoteListFavoriteLocations implements ListFavoriteLocations {
  constructor(readonly url: string, readonly httpGetClient: HttpGetClient) {}

  async list(): Promise<Array<FavoriteLocationModel>> {
    const response = await this.httpGetClient.get({ url: this.url });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return [] as unknown as Promise<Array<FavoriteLocationModel>>;
      default:
        throw new UnexpectedError();
    }
  }
}
