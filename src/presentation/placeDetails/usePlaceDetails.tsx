/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { GetPlaceDetails } from '~/domain/useCases';
import { PlaceDetailsModel } from '~/domain/models';
import { PlaceDetailsViewModel } from './placeDetails';

type Props = {
  gallerySummaryImages: Array<string>;
  getPlaceDetails: GetPlaceDetails;
  id: string;
};

const usePlaceDetails = ({
  gallerySummaryImages,
  getPlaceDetails,
  id,
}: Props): PlaceDetailsViewModel => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isOpenImagesGallery, setIsOpenImagesGallery] = useState(false);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetailsModel>({
    amountOfReviews: '',
    businessHoursSummary: {
      friday: { start: '', end: '' },
      monday: { start: '', end: '' },
      saturday: { start: '', end: '' },
      sunday: { start: '', end: '' },
      thursday: { start: '', end: '' },
      tuesday: { start: '', end: '' },
      wednesday: { start: '', end: '' },
    },
    contact: '',
    description: '',
    distance: '',
    fullLocation: '',
    location: '',
    photoOfReviewProfiles: [''],
    rating: '',
    title: '',
  });

  useEffect(() => {
    setBackgroundImage(gallerySummaryImages[0]);
    updatePlaceDetails();
  }, []);

  const updatePlaceDetails = async () => {
    await getPlaceDetails.get(id);
  };

  const pressSummaryImageFromGallery = (
    image: string,
    showInGallery: boolean,
  ) => {
    if (showInGallery) {
      setIsOpenImagesGallery(true);
    }

    if (!showInGallery) {
      setBackgroundImage(image);
    }
  };

  const closeImagesGallery = () => {
    setIsOpenImagesGallery(false);
  };

  return {
    amountOfReviews: '',
    backgroundImage,
    businessHoursSummary: '',
    contact: '',
    description: '',
    fullLocation: '',
    gallerySummaryImages,
    location: '',
    myDistanceOfLocal: '',
    photoOfReviewProfiles: [],
    pressSummaryImageFromGallery,
    closeImagesGallery,
    rating: '',
    title: '',
    isOpenImagesGallery,
  };
};

export default usePlaceDetails;
