import BusinessHoursModel from './businessHoursModel';

type PlaceDetailsModel = {
  title: string;
  description: string;
  location: string;
  distance: string;
  amountOfReviews: string;
  rating: string;
  businessHoursSummary: BusinessHoursModel;
  fullLocation: string;
  contact: string;
  photoOfReviewProfiles: Array<string>;
};

export default PlaceDetailsModel;
