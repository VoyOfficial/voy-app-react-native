import { ListFavoriteLocations } from '~/domain/useCases';
import { FavoriteLocationModel } from '~/domain/models';
import { HttpGetClient, HttpStatusCode } from '../http';
import { NoAccessError, UnexpectedError } from '../errors';

export default class RemoteListFavoriteLocations
  implements ListFavoriteLocations
{
  constructor(readonly url: string, readonly httpGetClient: HttpGetClient) {}

  async list(): Promise<Array<FavoriteLocationModel>> {
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
