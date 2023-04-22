import { SearchLocations } from '~/domain/useCases';
import { FilterParam } from '~/domain/params';
import { SearchLocationModel } from '~/domain/models';
import { HttpPostClient, HttpStatusCode } from '../http';
import { NoAccessError, UnexpectedError } from '../errors';

export default class RemoteSearchLocations implements SearchLocations {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  async search(
    { filter, ordination }: FilterParam,
    page = 1,
  ): Promise<SearchLocationModel[]> {
    const urlWithParams = this.url + '?page=' + page;
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
