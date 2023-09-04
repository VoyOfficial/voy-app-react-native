import { styled } from 'styled-components/native';

export const Container = styled.View`
  background-color: #ffffff;
  flex-direction: row;
  border-radius: 15px;
  height: 115px;

  overflow: hidden;
`;

export const ImagePlace = styled.Image`
  width: 115px;
  height: 115px;
`;

export const ContentWrapper = styled.View`
  margin: 12px;
  justify-content: space-around;
`;

export const Title = styled.Text`
  font-family: 'LexendDeca-Regular';
  color: #212121;
  font-size: 17px;
  font-weight: 400;
  line-height: 21.25px;
`;

export const LineWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Location = styled.Text`
  font-family: 'LexendDeca-Regular';
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  color: #aeaeae;
`;

export const DistanceOfLocal = styled.Text`
  font-family: 'LexendDeca-Regular';
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  color: #aeaeae;
`;

export const Rating = styled.Text`
  font-family: 'BaiJamjuree-Bold';
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  color: #212121;
`;

export const AmountOfReviews = styled.Text`
  font-family: 'LexendDeca-Regular';
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  color: #aeaeae;
`;

export const IconWrapper = styled.View`
  margin-right: 7px;
`;

export const FavoriteButton = styled.TouchableOpacity`
  background-color: #f1f5f6;
  padding: 7px;
  border-radius: 11px;
`;

export const FavoriteWrapper = styled.View`
  margin: 12px;
`;

export const PlaceWithContentWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;
