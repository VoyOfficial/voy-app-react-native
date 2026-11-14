import SearchPlaceModel from '../models/searchPlaceModel';
import { FilterParam, Location } from '../params';

export default interface SearchPlaces {
  search(
    place: string,
    { types, ordination }: FilterParam,
    location: Location,
    nextPageToken?: string,
  ): Promise<SearchPlaceModel[]>;
}
