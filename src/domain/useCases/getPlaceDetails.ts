import { PlaceDetailsModel } from '../models';

export default interface GetPlaceDetails {
  get: (id: string) => Promise<PlaceDetailsModel>;
}
