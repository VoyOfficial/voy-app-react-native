import { useCallback, useEffect, useState } from 'react';
import { GetPlaceDetails } from '~/domain/useCases';
import { PlaceDetailsViewModel } from './placeDetails';

type Props = {
  gallerySummaryImages: Array<string>;
  getPlaceDetails: GetPlaceDetails;
  id: number;
};

type PlaceDetails = {
  amountOfReviews: string;
  businessHoursSummary: string;
  contact: string;
  description: string;
  myDistanceOfLocal: string;
  fullLocation: string;
  location: string;
  photoOfReviewProfiles: Array<string>;
  rating: string;
  title: string;
};

const emptyPlaceDetails = {
  amountOfReviews: '',
  businessHoursSummary: '',
  contact: '',
  description: '',
  myDistanceOfLocal: '',
  fullLocation: '',
  location: '',
  photoOfReviewProfiles: [],
  rating: '',
  title: '',
};

const usePlaceDetails = ({
  gallerySummaryImages,
  getPlaceDetails,
  id,
}: Props): PlaceDetailsViewModel => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isOpenImagesGallery, setIsOpenImagesGallery] = useState(false);
  const [placeDetails, setPlaceDetails] =
    useState<PlaceDetails>(emptyPlaceDetails);

  useEffect(() => {
    setBackgroundImage(gallerySummaryImages[0]);
    updatePlaceDetails();
  }, []);

  const updatePlaceDetails = async () => {
    try {
      const response = await getPlaceDetails.get(id);
      setPlaceDetails({
        amountOfReviews: response.amountOfReviews + ' avaliações',
        businessHoursSummary: 'Diariamente - Acesso livre (24 horas)',
        contact: response.contact,
        description: response.description,
        myDistanceOfLocal: 'a ' + response.distance + 'm',
        fullLocation: response.fullLocation,
        location: response.location,
        photoOfReviewProfiles: response.photoOfReviewProfiles,
        rating: response.rating + '/5',
        title: response.title,
      });
    } catch (error) {
      setPlaceDetails(emptyPlaceDetails);
    }
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

  const placeDetailsAreEmpty = useCallback((): boolean => {
    return !!(placeDetails === emptyPlaceDetails);
  }, [placeDetails]);

  const getError = useCallback(() => {
    return placeDetailsAreEmpty();
  }, [placeDetailsAreEmpty]);

  const tryGetPlaceDetailsAgain = async () => {
    await updatePlaceDetails();
  };

  return {
    amountOfReviews: placeDetails.amountOfReviews,
    backgroundImage,
    businessHoursSummary: placeDetails.businessHoursSummary,
    contact: placeDetails.contact,
    description: placeDetails.description,
    fullLocation: placeDetails.fullLocation,
    gallerySummaryImages,
    location: placeDetails.location,
    myDistanceOfLocal: placeDetails.myDistanceOfLocal,
    photoOfReviewProfiles: placeDetails.photoOfReviewProfiles,
    pressSummaryImageFromGallery,
    closeImagesGallery,
    rating: placeDetails.rating,
    title: placeDetails.title,
    isOpenImagesGallery,
    error: getError(),
    tryGetPlaceDetailsAgain,
  };
};

export default usePlaceDetails;
