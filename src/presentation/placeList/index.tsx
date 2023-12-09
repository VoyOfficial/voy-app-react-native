import React from 'react';
import styled from 'styled-components/native';
import CardList from '../components/cardList';
import { PlaceListViewModel } from './usePlaceList';

const PlaceList = ({ list, favorite, showMoreDetails }: PlaceListViewModel) => {
  return (
    <Wrapper>
      <CardList
        title={''}
        showSeeAllButton={false}
        seeAll={() => {}}
        placeList={list}
        favorite={favorite}
        showMoreDetails={showMoreDetails}
        seeAllBy=""
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  margin: 40px 20px 0 20px;
`;

export default PlaceList;
