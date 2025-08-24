import { GetPlaceDetails } from '~/domain/useCases';
import { PlaceDetailsModel } from '~/domain/models';
import { AnalyticsTracker } from '~/domain/analytics';
import { HttpGetClient, HttpStatusCode } from '../http';
import {
  NotHaveAccessToPlaceDetailsError,
  PlaceDetailsNotFoundError,
  UnexpectedError,
} from '../errors';

export default class RemoteGetPlaceDetails implements GetPlaceDetails {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
    private readonly analytics: AnalyticsTracker,
  ) {}
  get = async (id: string): Promise<PlaceDetailsModel> => {
    const { statusCode, body } = await this.httpGetClient.get({
      url: `${this.url}?id=${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        const placeDetails = body as PlaceDetailsModel;
        this.trackPlaceDetailsEvent(placeDetails);
        return placeDetails;
      case HttpStatusCode.notFound:
        throw new PlaceDetailsNotFoundError();
      case HttpStatusCode.forbidden:
        throw new NotHaveAccessToPlaceDetailsError();
      default:
        throw new UnexpectedError();
    }
  };

  private trackPlaceDetailsEvent(placeDetails: PlaceDetailsModel): void {
    this.analytics.trackEvent('place_details', {
      place_title: placeDetails.title,
      place_location: placeDetails.fullLocation,
      place_rating: placeDetails.rating,
      place_distance: placeDetails.distance,
      place_amount_of_reviews: placeDetails.amountOfReviews,
    });
  }
}
