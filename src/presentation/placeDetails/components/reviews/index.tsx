import React from 'react';
import {
  AmountOfReviews,
  AmountOfReviewsContainer,
  ProfileImage,
  ProfileOfReviewProfilesWrapper,
  Rating,
  RatingContainer,
  ReviewContainer,
  StarIcon,
} from './styles';

export const getStyleOfPhotoOfReviewProfile = (index: number) => {
  switch (index) {
    case 0:
      return { zIndex: 1, left: 0 };
    case 1:
      return { zIndex: 2, left: -10 };
    case 2:
      return { zIndex: 3, left: -20 };
    default:
      break;
  }
};

const Reviews = ({
  amountOfReviews,
  rating,
  photoOfReviewProfiles,
}: {
  amountOfReviews: string;
  rating: string;
  photoOfReviewProfiles: Array<string>;
}) => (
  <ReviewContainer>
    <AmountOfReviewsContainer>
      <ProfileOfReviewProfilesWrapper>
        {photoOfReviewProfiles.map((photo, index) => (
          <ProfileImage
            key={index}
            testID={`photo_of_review_profiles_${index}_id`}
            source={{ uri: photo }}
            style={getStyleOfPhotoOfReviewProfile(index)}
          />
        ))}
      </ProfileOfReviewProfilesWrapper>
      <AmountOfReviews testID="amount_of_reviews_id">
        {amountOfReviews}
      </AmountOfReviews>
    </AmountOfReviewsContainer>
    <RatingContainer>
      <StarIcon testID="star_icon_id" />
      <Rating testID="rating_id">{rating}</Rating>
    </RatingContainer>
  </ReviewContainer>
);

export default Reviews;
