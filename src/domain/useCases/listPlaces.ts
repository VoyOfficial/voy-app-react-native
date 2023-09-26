import { PlaceModel } from '../models';

export default interface ListPlaces {
  list(
    location: {
      long: string;
      lat: string;
    },
    nextPageToken?: string,
  ): Promise<PlaceModel[]>;
}
