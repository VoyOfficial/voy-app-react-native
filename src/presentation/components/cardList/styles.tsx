import React from 'react';
import { FlatList } from 'react-native';
import { styled } from 'styled-components/native';

export const Container = styled.View``;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 25px;
  font-weight: 500;
  font-family: 'LexendDeca-Regular';
`;

export const SeeAllButton = styled.TouchableOpacity``;

export const SeeAll = styled.Text`
  font-weight: 500;
  font-size: 13px;
  line-height: 16.25px;
  font-family: 'LexendDeca-Regular';
  color: #5742e0;
`;

const ItemSeparator = styled.View`
  height: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  ItemSeparatorComponent: () => <ItemSeparator />,
})`` as unknown as typeof FlatList;
