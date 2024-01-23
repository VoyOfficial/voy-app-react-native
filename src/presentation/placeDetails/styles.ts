import styled from 'styled-components/native';
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

type Props = {
  name?: string;
};

export const LocationIcon = styled(Icon).attrs({
  color: '#212121',
  name: 'location',
  size: 11,
})<Props>``;

export const WalkingIcon = styled(Icon).attrs({
  color: '#212121',
  name: 'walking',
  size: 11,
})<Props>``;

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

export const BlurOfGallerySummaryImages = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
