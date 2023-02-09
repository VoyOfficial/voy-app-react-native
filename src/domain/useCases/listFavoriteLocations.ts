import FavoriteLocationModel from '../models/favoriteLocationModel';

export default interface ListFavoriteLocations {
  list(): Promise<Array<FavoriteLocationModel>>;
}
