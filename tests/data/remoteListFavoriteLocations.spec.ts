import FavoriteLocationModel from 'src/domain/models/favoriteLocationModel';
import { HttpGetClient } from '~/data/http';
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
});

class RemoteListFavoriteLocations implements ListFavoriteLocations {
  constructor(readonly url: string, readonly httpGetClient: HttpGetClient) {}

  list(): Promise<Array<FavoriteLocationModel>> {
    this.httpGetClient.get({ url: this.url });

    return [] as unknown as Promise<Array<FavoriteLocationModel>>;
  }
}
