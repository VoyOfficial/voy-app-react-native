import { SearchPlaces } from '~/domain/useCases';
import { FilterParam, Location } from '~/domain/params';
import { SearchPlaceModel } from '~/domain/models';
import { AnalyticsTracker } from '~/domain/analytics';
import { HttpPostClient, HttpStatusCode } from '../http';
import { NoAccessError, UnexpectedError } from '../errors';
import {
  ApiNearbyPlace,
  mapApiNearbyPlaceToSearchPlaceModel,
} from '../helpers';

export default class RemoteSearchPlaces implements SearchPlaces {
  constructor(
    readonly url: string,
    readonly httpPostClient: HttpPostClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  async search(
    place: string,
    { types, ordination }: FilterParam,
    location: Location,
    nextPageToken?: string,
  ): Promise<SearchPlaceModel[]> {
    const urlWithParams = this.makeUrl(place, location, nextPageToken);
    const response = await this.httpPostClient.post({
      url: urlWithParams,
      body: { types: types, ordination: ordination },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        const searchResults = this.mapPlaces(response.body);
        this.trackSearchEvent(place, types, ordination, searchResults);
        return searchResults;
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new NoAccessError();
      default:
        throw new UnexpectedError();
    }
  }

  private mapPlaces(body: unknown): SearchPlaceModel[] {
    if (Array.isArray(body)) {
      return body.map((apiPlace: ApiNearbyPlace) =>
        mapApiNearbyPlaceToSearchPlaceModel(apiPlace),
      );
    }

    const places = (body as { places?: unknown[] } | null)?.places;
    if (!Array.isArray(places)) {
      return [];
    }

    return places.map((apiPlace: ApiNearbyPlace) =>
      mapApiNearbyPlaceToSearchPlaceModel(apiPlace),
    );
  }

  private trackSearchEvent(
    search: string,
    types: FilterParam['types'],
    ordination: FilterParam['ordination'],
    searchResults: SearchPlaceModel[],
  ): void {
    this.analytics.trackEvent('search', {
      search,
      types,
      ordination,
      result:
        searchResults.length > 0
          ? {
              places_title: searchResults.map((place) => place.title),
              place_count: searchResults.length,
            }
          : [],
    });
  }

  private makeUrl(
    place: string,
    location: Location,
    nextPageToken?: string,
  ): string {
    const params = new URLSearchParams({
      place,
      latitude: location.lat,
      longitude: location.long,
    });
    if (nextPageToken) {
      params.set('nextPageToken', nextPageToken);
    }
    return `${this.url}?${params.toString()}`;
  }
}
