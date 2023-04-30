import { PlaceModel } from '~/domain/models';
import { ListPlaces } from '~/domain/useCases';
import { UnexpectedError, ValidationError } from '../errors';
import { HttpGetClient, HttpStatusCode } from '../http';

export default class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async list(): Promise<PlaceModel[]> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
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
  }
}
