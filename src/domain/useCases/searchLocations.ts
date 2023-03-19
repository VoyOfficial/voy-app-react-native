import { Filter, Ordination } from '../enums';
import SearchLocationModel from '../models/searchLocationModel';

type SearchParam = {
  filter: Filter;
  ordination: Ordination;
};

export default interface SearchLocations {
  search({ filter, ordination }: SearchParam): Promise<SearchLocationModel[]>;
}
