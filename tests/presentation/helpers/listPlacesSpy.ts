import { ListPlaces } from '~/domain/useCases';
import { PlaceModel } from '~/domain/models';
import placeListFactory from './placeListFactory';

export class ListPlacesSpy implements ListPlaces {
  listCalled = 0;
  timeout = 0;

  constructor(readonly places: Array<PlaceModel> = placeListFactory(5)) {}

  async list(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    location: { long: string; lat: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextPageToken?: string | undefined,
  ): Promise<PlaceModel[]> {
    let places: Array<PlaceModel> = [];
    const complete = () => {
      this.listCalled += 1;
      places = this.places;
    };

    if (this.timeout > 0) {
      setTimeout(() => {
        complete();
      }, this.timeout);
    } else {
      complete();
    }

    return places;
  }

  addTimeout(timeout: number): void {
    this.timeout = timeout;
  }
}
