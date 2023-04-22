import SearchLocationModel from '../models/searchLocationModel';
import { FilterParam } from '../params';

export default interface SearchLocations {
  search(
    { filter, ordination }: FilterParam,
    page: number,
  ): Promise<SearchLocationModel[]>;
}
