import { SearchPlaces } from '~/domain/useCases';
import { FilterParam } from '~/domain/params';
import { SearchPlaceModel } from '~/domain/models';
import { HttpPostClient, HttpStatusCode } from '../http';
import { NoAccessError, UnexpectedError } from '../errors';

export default class RemoteSearchPlaces implements SearchPlaces {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  async search(
    place: string,
    { filter, ordination }: FilterParam,
    page = 1,
  ): Promise<SearchPlaceModel[]> {
    const urlWithParams =
      this.url + (place && '/' + encodeURIComponent(place)) + '?page=' + page;
    const response = await this.httpPostClient.post({
      url: urlWithParams,
      body: { filter: filter, ordination: ordination },
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
}
