import styled from 'styled-components/native';

const Text = styled.Text`
  font-family: 'LexendDeca-Regular';
`;

export const GallerySummaryImageButton = styled.TouchableOpacity``;

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
