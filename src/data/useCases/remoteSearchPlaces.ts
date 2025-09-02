import { SearchPlaces } from '~/domain/useCases';
import { FilterParam } from '~/domain/params';
import { SearchPlaceModel } from '~/domain/models';
import { AnalyticsTracker } from '~/domain/analytics';
import { HttpPostClient, HttpStatusCode } from '../http';
import { NoAccessError, UnexpectedError } from '../errors';

export default class RemoteSearchPlaces implements SearchPlaces {
  constructor(
    readonly url: string,
    readonly httpPostClient: HttpPostClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  async search(
    place: string,
    { types, ordination }: FilterParam,
    nextPageToken?: string,
  ): Promise<SearchPlaceModel[]> {
    const urlWithParams = this.makeUrl(place, nextPageToken);
    const response = await this.httpPostClient.post({
      url: urlWithParams,
      body: { types: types, ordination: ordination },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        const searchResults = (response.body as SearchPlaceModel[]) || [];
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

  private makeUrl(place: string, nextPageToken?: string): string {
    let url = this.url;
    if (place) url += `/${encodeURIComponent(place)}`;
    if (nextPageToken) url += `?nextPageToken=${nextPageToken}`;

    return url;
  }
}
