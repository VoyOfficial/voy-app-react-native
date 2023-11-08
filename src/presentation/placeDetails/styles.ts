import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';
import Icon from '../assets/fonts/Voy';

const Text = styled.Text`
  font-family: 'LexendDeca-Regular';
`;

export const Title = styled(Text)`
  font-size: 20px;
  line-height: 25px;
  font-weight: 500;
  margin-top: 22px;
  margin-bottom: 25px;
`;

export const Description = styled(Text)`
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: #b3b3b3;
  margin-bottom: 18px;
`;

export const LocationContainer = styled.View`
  background-color: #f1f5f6;
  padding: 8px;
  border-radius: 10px;
  margin-right: 11px;
  flex-direction: row;
  align-items: center;
`;

export const DistanceOfLocalContainer = styled.View`
  background-color: #f1f5f6;
  padding: 8px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

export const DistanceOfLocal = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #b3b3b3;
  margin-left: 7px;
`;

export const Location = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #b3b3b3;
  margin-left: 7px;
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

export const Rating = styled(Text)`
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  margin-left: 7px;
`;

export const BusinessHoursSummaryContainer = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const BusinessHourIconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f1f5f6;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 7px;
`;

export const BusinessHours = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
`;

export const FullLocationContainer = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const FullLocationIconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f1f5f6;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 7px;
`;

export const FullLocation = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
`;

export const PhoneContainer = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const PhoneIconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f1f5f6;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 7px;
`;

export const Phone = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
`;

export const ProfileOfReviewProfilesWrapper = styled.View`
  flex-direction: row;
  margin-right: -11px;
`;

export const AmountOfReviewsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const ContentContainer = styled.View`
  padding: 0 26px;
  flex: 0.6;
  z-index: 2;
  background-color: #ffffff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  top: -20px;
`;

export const DistanceDetailsContainer = styled.View`
  flex-direction: row;
  padding-bottom: 22px;
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

export const ClockOutlineIcon = styled(Icon).attrs({
  color: '#000000',
  name: 'clock_outline',
  size: 16,
})<Props>``;

export const LocationOutlineIcon = styled(Icon).attrs({
  color: '#000000',
  name: 'location_outline',
  size: 16,
})<Props>``;

export const LocationIcon = styled(Icon).attrs({
  color: '#212121',
  name: 'location',
  size: 11,
})<Props>``;

export const PhoneOutlineIcon = styled(Icon).attrs({
  color: '#000000',
  name: 'phone_outline',
  size: 16,
})<Props>``;

export const WalkingIcon = styled(Icon).attrs({
  color: '#212121',
  name: 'walking',
  size: 11,
})<Props>``;

export const GallerySummaryImageBackground = styled.View`
  width: 56px;
  height: 54px;
  position: absolute;
  background-color: #000000;
  right: 0;
  z-index: 1;
  border-radius: 10px;
  opacity: 0.5;
  margin-right: 5px;
`;

export const GallerySummaryImage = styled.Image.attrs({
  style: { shadowOpacity: 0.5 },
})`
  width: 56px;
  height: 54px;
  border-radius: 10px;
  margin: 0 5px;
`;

export const BackgroundImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ImagesWrapper = styled.View`
  height: 360px;
  z-index: 1;
  top: 0;
`;

export const GallerySummaryImagesWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  align-self: center;
  padding: 15px 10px;
  margin-bottom: 36px;
`;

export const BlurOfGallerySummaryImages = styled(BlurView).attrs({
  blurType: 'light',
  blurAmount: 10,
  reducedTransparencyFallbackColor: 'white',
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const MostAvailableNumberOfImages = styled(Text)`
  color: #ffffff;
  font-weight: 400;
  line-height: 21.25px;
  font-size: 17px;
`;

export const WrapperMostAvailableNumberOfImages = styled.View`
  position: absolute;
  z-index: 2;
  width: 56px;
  height: 54px;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
`;

export const GallerySummaryImageButton = styled.TouchableOpacity``;
