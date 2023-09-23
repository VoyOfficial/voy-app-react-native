import { PlaceModel } from '~/domain/models';
import { ListPlaces } from '~/domain/useCases';
import { NoPermissionError, UnexpectedError } from '../errors';
import { HttpGetClient, HttpStatusCode } from '../http';

export default class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  list = async (
    location: {
      long: string;
      lat: string;
    },
    nextPageToken?: string,
  ): Promise<PlaceModel[]> => {
    let url = this.url + '?long=' + location.long + '&lat=' + location.lat;
    if (nextPageToken) url += '&nextPageToken=' + nextPageToken;

    const httpResponse = await this.httpGetClient.get({
      url: url,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse?.body || [];
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new NoPermissionError();
      default:
        throw new UnexpectedError();
    }
  };
}
