import styled from 'styled-components/native';
import Icon from '../../../assets/fonts/Voy';

const Text = styled.Text`
  font-family: 'LexendDeca-Regular';
`;

export const ReviewContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 22px 0;
  border-bottom-width: 1px;
  padding-bottom: 22px;
  border-color: #e6e6e6;
  border-top-width: 1px;
  padding-top: 22px;
  align-items: center;
`;

export const AmountOfReviewsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfileOfReviewProfilesWrapper = styled.View`
  flex-direction: row;
  margin-right: -11px;
`;

export const ProfileImage = styled.Image`
  width: 31px;
  height: 31px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #ffffff;
`;

export const AmountOfReviews = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  text-decoration-line: underline;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

type Props = {
  name?: string;
};

export const StarIcon = styled(Icon).attrs({
  color: '#FFAB5E',
  name: 'star',
  size: 12,
})<Props>``;

export const Rating = styled(Text)`
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  margin-left: 7px;
`;
