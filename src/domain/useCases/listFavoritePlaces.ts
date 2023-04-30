import FavoritePlaceModel from '../models/favoritePlaceModel';

export default interface ListFavoritePlaces {
  list(): Promise<Array<FavoritePlaceModel>>;
}
