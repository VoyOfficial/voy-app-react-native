import { PlaceDetailsModel } from '../models';

export default interface GetPlaceDetails {
  get: (id: number) => Promise<PlaceDetailsModel>;
}
