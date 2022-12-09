import { ListLocations } from 'src/domain/useCases/listLocations';
import { LocationModel } from '~/domain/models';
import { UnexpectedError, ValidationError } from '../errors';
import { HttpGetClient, HttpStatusCode } from '../http';

export default class RemoteListLocations implements ListLocations {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async list(): Promise<LocationModel[]> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
    });
    const remoteLocations = httpResponse?.body || [];

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteLocations;
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new ValidationError();
      default:
        throw new UnexpectedError();
    }
  }
}
