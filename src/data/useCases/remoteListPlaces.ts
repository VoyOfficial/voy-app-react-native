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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    page?: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    linesPerPage?: number | undefined,
  ): Promise<PlaceModel[]> => {
    const url = this.url + '?long=' + location.long + '&lat=' + location.lat;

    const httpResponse = await this.httpGetClient.get({
      url: url,
    });
    const remotePlaces = httpResponse?.body || [];

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remotePlaces;
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new ValidationError();
      default:
        throw new UnexpectedError();
    }
  };
}
