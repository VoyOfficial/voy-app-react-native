import { PlaceModel } from '../models';

export default interface ListPlaces {
  list(): Promise<PlaceModel[]>;
}
