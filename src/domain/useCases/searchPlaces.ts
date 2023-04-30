import SearchPlaceModel from '../models/searchPlaceModel';
import { FilterParam } from '../params';

export default interface SearchPlaces {
  search(
    place: string,
    { filter, ordination }: FilterParam,
    page: number,
  ): Promise<SearchPlaceModel[]>;
}
