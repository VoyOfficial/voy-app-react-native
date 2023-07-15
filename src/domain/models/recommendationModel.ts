import BusinessHoursModel from './businessHoursModel';

type RecommendationModel = {
  name: string;
  about: string;
  address: string;
  businessHours: BusinessHoursModel;
  contact: string;
  rating: number;
  isSaved: boolean;
  comments: string[];
  images: string[];
};

export default RecommendationModel;
