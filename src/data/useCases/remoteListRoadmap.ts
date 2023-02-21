import { RoadmapModel } from '~/domain/models';
import { ListRoadmap } from '~/domain/useCases';
import { NoAccessError, UnexpectedError } from '../errors';
import { HttpGetClient, HttpStatusCode } from '../http';

export default class RemoteListRoadmap implements ListRoadmap {
  constructor(readonly url: string, readonly httpGetClient: HttpGetClient) {}

  async list(): Promise<RoadmapModel[]> {
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
