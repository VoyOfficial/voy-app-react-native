import { PlaceModel } from '../models';
import { Location } from '../params';

export default interface ListPlaces {
  list(location: Location, nextPageToken?: string): Promise<PlaceModel[]>;
}
