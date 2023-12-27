import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import Search from '../../../../src/presentation/search';
import { StackParams } from '../../../../src/main/navigation/navigation';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const SearchFactory = ({}: Props) => {
  return (
    <Search searchValue={''} changeSearch={() => {}} searchTo={() => {}} />
  );
};

export default SearchFactory;
