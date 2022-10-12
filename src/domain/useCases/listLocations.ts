import { ListLocationsModel } from '../models';

export interface ListLocations {
  list(): Promise<ListLocationsModel>;
}
