import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import { Location } from '~/domain/params';
import { AnalyticsTracker } from '~/domain/analytics';
import { HttpGetClient, HttpStatusCode } from '../http';
import { NoPermissionError, UnexpectedError } from '../errors';

export default class RemoteListRecommendations implements ListRecommendations {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  async list(location: Location): Promise<RecommendationModel[]> {
    const url =
      this.url + '?latitude=' + location.lat + '&longitude=' + location.long;

    const { statusCode, body } = await this.httpGetClient.get({
      url: url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        const responseBody = body || { data: [] };
        const recommendationsArray = Array.isArray(responseBody)
          ? responseBody
          : responseBody.data || [];

        const recommendations: Array<RecommendationModel> =
          recommendationsArray.map((apiRec: any) => ({
            id: apiRec.id,
            imageUrl: apiRec.photoReference || '',
            title: apiRec.name || '',
            location: apiRec.address || '',
            myDistanceOfLocal: apiRec.distanceFromUserLocation || '0',
            rating: String(apiRec.rating || 0),
          }));

        if (recommendations.length > 0) {
          await this.analytics.trackEvent('list_recommendations', {
            recommendations_title: recommendations.map((rec) => rec.title),
            recommendation_count: recommendations.length,
          });
        }
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
