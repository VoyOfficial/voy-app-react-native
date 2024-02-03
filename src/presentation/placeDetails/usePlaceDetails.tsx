import { useEffect, useState } from 'react';
import { Routes } from '~/main/navigation';
import { GenericObject } from '../../../src/main/types/genericObject';
import { PlaceDetailsViewModel } from './placeDetails';

type Props = {
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
  gallerySummaryImages: Array<string>;
};

const usePlaceDetails = ({
  navigate,
  gallerySummaryImages,
}: Props): PlaceDetailsViewModel => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(gallerySummaryImages[0]);
  }, []);

  const pressSummaryImageFromGallery = (
    image: string,
    showInGallery: boolean,
  ) => {
    if (showInGallery) {
      navigate(Routes.GALLERY, { images: gallerySummaryImages });
    }

    if (!showInGallery) {
      setBackgroundImage(image);
    }
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
    rating: '',
    title: '',
  };
};

export default usePlaceDetails;
