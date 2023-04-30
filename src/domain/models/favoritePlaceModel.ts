import BusinessHoursModel from './businessHoursModel';

type FavoritePlaceModel = {
  name: string;
  about: string;
  address: string;
  businessHours: BusinessHoursModel;
  contact: string;
  rating: number;
  comments: string[];
  images: string[];
};

export default FavoritePlaceModel;
