import PlaceModel from './placeModel';
import UserModel from './userModel';

type RoadmapModel = {
  title: string;
  description: string;
  created: UserModel;
  places: Array<PlaceModel>;
  quantitySaved: number;
  quantityLocation: number;
};

export default RoadmapModel;
