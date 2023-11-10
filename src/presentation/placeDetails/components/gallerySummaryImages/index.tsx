import React from 'react';
import {
  GallerySummaryImage,
  GallerySummaryImageBackground,
  GallerySummaryImageButton,
  MostAvailableNumberOfImages,
  WrapperMostAvailableNumberOfImages,
} from './styles';

const GallerySummaryImages = ({
  images,
  press,
}: {
  images: Array<string>;
  press: (image: string) => void;
}) => {
  const gallerySummaryImages = [];
  const showMinimalGallerySummary = images.length <= 3;

  if (showMinimalGallerySummary) {
    for (let index = 0; index < images.length; index++) {
      gallerySummaryImages.push(
        <GallerySummaryImageButton
          key={index}
          testID={`gallery_summary_image_button_${index}_id`}
          onPress={() => press(images[index])}
        >
          <GallerySummaryImage
            testID={`gallery_summary_image_${index}_id`}
            source={{ uri: images[index] }}
          />
        </GallerySummaryImageButton>,
      );
    }
  }

  if (!showMinimalGallerySummary) {
    const mostAvailableNumberOfImages = images.length - 4;
    const showMostAvailableNumberOfImages = (index: number) =>
      index === 3 && mostAvailableNumberOfImages > 0;

    for (let index = 0; index < 4; index++) {
      gallerySummaryImages.push(
        <GallerySummaryImageButton
          key={index}
          testID={`gallery_summary_image_button_${index}_id`}
          onPress={() => press(images[index])}
        >
          {showMostAvailableNumberOfImages(index) && (
            <>
              <WrapperMostAvailableNumberOfImages>
                <MostAvailableNumberOfImages testID="most_available_number_of_images_id">
                  {`+${mostAvailableNumberOfImages + 1}`}
                </MostAvailableNumberOfImages>
              </WrapperMostAvailableNumberOfImages>
              <GallerySummaryImageBackground
                testID={`gallery_summary_image_background_${index}_id`}
              />
            </>
          )}

          <GallerySummaryImage
            key={index}
            testID={`gallery_summary_image_${index}_id`}
            source={{ uri: images[index] }}
          />
        </GallerySummaryImageButton>,
      );
    }
  }

  return gallerySummaryImages;
};

export default GallerySummaryImages;
