import { FlatList, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Wrapper = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 25px;
  font-weight: 500;
  font-family: 'LexendDeca-Regular';
`;

export const Button = styled(TouchableWithoutFeedback)``;

export const TextButton = styled.Text`
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  font-family: 'LexendDeca-Regular';

  color: #5742e0;
`;

export const Content = styled.View`
  margin-top: 10px;
`;

const ItemSeparator = styled.View`
  width: 15px;
`;

export const List = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  ItemSeparatorComponent: ItemSeparator,
  contentContainerStyle: {
    paddingLeft: 20,
  },
})`` as unknown as typeof FlatList;
