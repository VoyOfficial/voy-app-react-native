import SearchLocationModel from '../models/searchLocationModel';
import { SearchParam } from '../params';

export default interface SearchLocations {
  search({ filter, ordination }: SearchParam): Promise<SearchLocationModel[]>;
}
