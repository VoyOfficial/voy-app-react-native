import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import { HttpGetClient, HttpStatusCode } from '../http';
import { UnexpectedError } from '../errors';

export default class RemoteListRecommendations implements ListRecommendations {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async list(): Promise<RecommendationModel[]> {
    const { statusCode, body } = await this.httpGetClient.get({
      url: this.url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
