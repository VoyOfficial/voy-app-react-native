import styled from 'styled-components/native';
import Icon from '../../assets/fonts/Voy';

export const OptionButton = styled.TouchableOpacity`
  padding: 14px 0px;
  border-bottom-width: 1px;
  border-color: #e6e6e6;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 42px;
  margin-right: 23px;
`;

export const OptionLabel = styled.Text`
  font-family: 'LexendDeca-Regular';
  color: #aeaeae;
  font-size: 15px;
`;

type OptionSelectionIconProps = {
  selected?: boolean;
};

export const OptionSelectionIcon = styled.View<OptionSelectionIconProps>`
  width: 12px;
  height: 12px;
  border-width: 1px;
  border-radius: 6px;
  border-color: ${(props) => (props.selected ? '#5742E0' : '#C5CACC')};
  background-color: ${(props) => (props.selected ? '#5742E0' : '#FFFFFF')};
`;

export const Container = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
`;

export const OrderByButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 19px 0px;
  border-bottom-width: 1px;
  border-color: #e6e6e6;
  padding-left: 22px;
  padding-right: 16px;
  justify-content: space-between;
  align-items: center;
`;

export const OrderByLabelWrapper = styled.View`
  flex-direction: row;
`;

export const OrderByLabel = styled.Text`
  color: #212121;
  font-size: 15px;
  font-family: 'LexendDeca-Regular';
`;

export const OrderBySelected = styled.Text`
  color: #5452f6;
  font-size: 15px;
  font-family: 'LexendDeca-Regular';
`;

export const ArrowIcon = styled(Icon).attrs({
  size: 24,
  color: '#212121',
})``;

export const OrderOptionsWrapper = styled.View``;

export const FilterByButton = styled.TouchableOpacity`
  padding: 19px 0px;
  border-bottom-width: 1px;
  border-color: #e6e6e6;
  padding-left: 22px;
  padding-right: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FilterByLabel = styled.Text`
  font-family: 'LexendDeca-Regular';
  color: #212121;
  font-size: 15px;
`;

export const FilterOptionsWrapper = styled.View``;
