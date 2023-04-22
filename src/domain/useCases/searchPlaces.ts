import SearchPlaceModel from '../models/searchPlaceModel';
import { FilterParam } from '../params';

export default interface SearchPlaces {
  search(
    { filter, ordination }: FilterParam,
    page: number,
  ): Promise<SearchPlaceModel[]>;
}
