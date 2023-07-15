import { PlaceModel } from '~/domain/models';
import { ListPlaces } from '~/domain/useCases';
import { UnexpectedError, ValidationError } from '../errors';
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
    page?: number,
    linesPerPage?: number | undefined,
  ): Promise<PlaceModel[]> => {
    let url = this.url + '?long=' + location.long + '&lat=' + location.lat;
    if (page) url += '&page=' + page;
    if (linesPerPage) url += '&linesPerPage=' + linesPerPage;

    const httpResponse = await this.httpGetClient.get({
      url: url,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse?.body || [];
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new ValidationError();
      default:
        throw new UnexpectedError();
    }
  };
}
