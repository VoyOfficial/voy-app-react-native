import { PlaceModel } from '~/domain/models';
import { Location } from '~/domain/params';
import { ListPlaces } from '~/domain/useCases';
import { AnalyticsTracker } from '~/domain/analytics';
import { NoPermissionError, UnexpectedError } from '../errors';
import { formatBase64Image } from '../helpers';
import { HttpGetClient, HttpStatusCode } from '../http';

export default class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  list = async (
    location: Location,
    nextPageToken?: string,
  ): Promise<PlaceModel[]> => {
    let url =
      this.url + '?longitude=' + location.long + '&latitude=' + location.lat;
    if (nextPageToken) url += '&nextPageToken=' + nextPageToken;

    const httpResponse = await this.httpGetClient.get({
      url: url,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const responseBody = httpResponse.body || { places: [] };
        const placesArray = Array.isArray(responseBody)
          ? responseBody
          : responseBody.places || [];

        const places: Array<PlaceModel> = placesArray.map((apiPlace: any) => ({
          id: apiPlace.googlePlaceId,
          imageUri: formatBase64Image(
            apiPlace.photo || apiPlace.photoReference || '',
          ),
          title: apiPlace.name || '',
          location: apiPlace.address || '',
          myDistanceOfLocal: '0',
          amountOfReviews: String(apiPlace.userRatingsTotal || 0),
          rating: String(apiPlace.rating || 0),
        }));

        if (places.length > 0) {
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
