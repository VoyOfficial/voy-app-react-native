import SearchPlaceModel from '../models/searchPlaceModel';
import { FilterParam } from '../params';

export default interface SearchPlaces {
  search(
    place: string,
    { types, ordination }: FilterParam,
    nextPageToken?: string,
  ): Promise<SearchPlaceModel[]>;
}
