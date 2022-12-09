import { LocationModel } from '../models';

export interface ListLocations {
  list(): Promise<LocationModel[]>;
}
