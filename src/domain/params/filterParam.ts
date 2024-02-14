import { Filter, Ordination } from '../enums';

type FilterParam = {
  types: Array<Filter>;
  ordination: Ordination;
};

export default FilterParam;
