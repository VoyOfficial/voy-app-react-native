import { SearchPlaces } from '~/domain/useCases';
import { FilterParam } from '~/domain/params';
import { SearchPlaceModel } from '~/domain/models';
import { HttpPostClient, HttpStatusCode } from '../http';
import { NoAccessError, UnexpectedError } from '../errors';

export default class RemoteSearchPlaces implements SearchPlaces {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  async search(
    place: string,
    { types, ordination }: FilterParam,
    nextPageToken?: string,
  ): Promise<SearchPlaceModel[]> {
    const urlWithParams = this.makeUrl(place, nextPageToken);
    const response = await this.httpPostClient.post({
      url: urlWithParams,
      body: { types: types, ordination: ordination },
    });

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

  private makeUrl(place: string, nextPageToken?: string): string {
    let url = this.url;
    if (place) url += `/${encodeURIComponent(place)}`;
    if (nextPageToken) url += `?nextPageToken=${nextPageToken}`;

    return url;
  }
}
