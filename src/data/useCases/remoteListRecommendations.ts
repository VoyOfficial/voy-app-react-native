import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import { AnalyticsTracker } from '~/domain/analytics';
import { HttpGetClient, HttpStatusCode } from '../http';
import { NoPermissionError, UnexpectedError } from '../errors';

export default class RemoteListRecommendations implements ListRecommendations {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  async list(): Promise<RecommendationModel[]> {
    const { statusCode, body } = await this.httpGetClient.get({
      url: this.url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        const recommendations: Array<RecommendationModel> = body || [];
        await this.analytics.trackEvent('list_recommendations', {
          recommendations: recommendations.map((recommendation) => {
            return { id: recommendation.id, name: recommendation.title };
          }),
        });
        return recommendations;
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new NoPermissionError();
      default:
        throw new UnexpectedError();
    }
  }
}
