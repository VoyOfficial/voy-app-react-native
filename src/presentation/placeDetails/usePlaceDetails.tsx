import { useEffect, useState } from 'react';
import { PlaceDetailsViewModel } from './placeDetails';

type Props = {
  gallerySummaryImages: Array<string>;
};

const usePlaceDetails = ({
  gallerySummaryImages,
}: Props): PlaceDetailsViewModel => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isOpenImagesGallery, setIsOpenImagesGallery] = useState(false);

  useEffect(() => {
    setBackgroundImage(gallerySummaryImages[0]);
  }, []);

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
