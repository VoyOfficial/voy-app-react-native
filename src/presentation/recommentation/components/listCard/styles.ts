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

export const Wrapper = styled.View`
  padding: 10px;
`;

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

export const SaveBtn = styled.TouchableOpacity``;
