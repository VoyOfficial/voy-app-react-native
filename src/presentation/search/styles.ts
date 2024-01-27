import styled from 'styled-components/native';
import Icon from '../assets/fonts/Voy';

export const Container = styled.View`
  padding-top: 80px;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const FilterButtonWrapper = styled.View`
  padding-right: 21px;
`;

export const FilterButton = styled.TouchableOpacity``;

export const FilterIcon = styled(Icon).attrs({
  size: 22.5,
  color: '#212121',
})``;

export const SearchInputWrapper = styled.View`
  flex: 1;
`;

export const SearchInput = styled.TextInput`
  background-color: #ffffff;
  padding: 11px 0px;
  padding-left: 16px;
  border-radius: 13px;
`;

export const SearchIconWrapper = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  justify-content: center;
  align-items: center;
  padding-right: 8.5px;
`;

export const SearchIcon = styled(Icon).attrs({
  size: 22.5,
  color: '#B3B3B3',
})``;

export const CardListWrapper = styled.View`
  margin-horizontal: 20px;
`;

export const FilterModalWrapper = styled.View`
  margin: 0px 20px;
  margin-top: 20px;
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
`;
