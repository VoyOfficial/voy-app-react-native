import { PlaceModel } from '../models';

export default interface ListPlaces {
  list(
    location: {
      long: string;
      lat: string;
    },
    page: number,
    linesPerPage?: number,
  ): Promise<PlaceModel[]>;
}
