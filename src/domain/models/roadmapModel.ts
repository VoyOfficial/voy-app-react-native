import LocationModel from './locationModel';
import UserModel from './userModel';

type RoadmapModel = {
  title: string;
  description: string;
  created: UserModel;
  locations: Array<LocationModel>;
  quantitySaved: number;
  quantityLocation: number;
};

export default RoadmapModel;
