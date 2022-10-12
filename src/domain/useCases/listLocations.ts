import { LocationsModel } from '../models';

export interface ListLocations {
  list(): Promise<LocationsModel[]>;
}
