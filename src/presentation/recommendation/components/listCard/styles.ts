import { styled } from 'styled-components/native';
import Icon from '../../../assets/fonts/Voy';

export const Container = styled.View`
  background-color: #ffff;

  border-radius: 15px;
  height: 243px;
  width: 277px;

  overflow: hidden;
`;

export const ImageContent = styled.Image`
  width: 277px;
  height: 155px;
`;

export const ImageButton = styled.TouchableOpacity``;

export const ContentWrapper = styled.TouchableOpacity``;

export const WrapperTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WrapperLine = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 5px;
`;

export const Save = styled(Icon).attrs({
  size: 18,
  color: '#C5CACC',
  testID: 'save_icon_id',
})``;

export const IconWrapper = styled.View`
  margin-right: 7px;
`;

export const IconStartWrapper = styled.View`
  margin-left: 7px;
  margin-right: 7px;
`;

export const SaveBtn = styled.TouchableOpacity`
  background-color: #f1f5f6;
  border-radius: 11px;
  padding: 7px;
  height: 33px;
`;

export const DistanceOfLocal = styled.Text`
  font-family: 'LexendDeca-Regular';
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  color: #aeaeae;
`;

export const Title = styled.Text`
  font-family: 'LexendDeca-Regular';
  color: #212121;
  font-size: 17px;
  font-weight: 400;
  line-height: 21.25px;
`;

export const Rating = styled.Text`
  font-family: 'LexendDeca-Regular';
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  color: #212121;
`;

export const Location = styled.Text`
  font-family: 'LexendDeca-Regular';
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  color: #aeaeae;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding: 10px;
`;
