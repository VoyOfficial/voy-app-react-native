import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import { Location } from '~/domain/params';
import { AnalyticsTracker } from '~/domain/analytics';
import { HttpGetClient, HttpStatusCode } from '../http';
import {
  ApiNearbyPlace,
  mapApiNearbyPlaceToRecommendationModel,
} from '../helpers';
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
        const responseBody = body || { places: [] };
        const recommendationsArray = Array.isArray(responseBody)
          ? responseBody
          : responseBody.places || responseBody.data || [];

        const recommendations: Array<RecommendationModel> =
          recommendationsArray.map((apiRec: ApiNearbyPlace) =>
            mapApiNearbyPlaceToRecommendationModel(apiRec),
          );

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
