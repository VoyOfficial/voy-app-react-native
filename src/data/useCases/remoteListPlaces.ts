import { PlaceModel } from '~/domain/models';
import { ListPlaces } from '~/domain/useCases';
import { AnalyticsTracker } from '~/domain/analytics';
import { NoPermissionError, UnexpectedError } from '../errors';
import { HttpGetClient, HttpStatusCode } from '../http';

export default class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
    private readonly analytics: AnalyticsTracker,
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
        const places: Array<PlaceModel> = httpResponse.body || [];

        if (Array.isArray(places)) {
          await this.trackEvent('list_places', {
            long: location.long,
            lat: location.lat,
            places_title: places?.map((place: PlaceModel) => place.title) || '',
            place_count: places.length,
          });
        }
        return places;
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new NoPermissionError();
      default:
        throw new UnexpectedError();
    }
  };

  trackEvent = async (event: string, params?: Record<string, any>) => {
    await this.analytics.trackEvent(event, params);
  };
}
