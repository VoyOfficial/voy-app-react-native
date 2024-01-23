import React from 'react';
import { ListRecommendation } from '../recommendation/components';
import CardList from '../components/cardList';
import { Origin } from '../placeList/usePlaceList';
import { HomeViewModel } from './useHome';
import { Container, WrapperSearch } from './styles';

const Home = ({
  onSeeAll,
  recommendations,
  favorite,
  placeList,
  showMoreDetails,
}: HomeViewModel) => {
  return (
    <Container>
      <ListRecommendation
        showMoreDetails={showMoreDetails}
        recommendations={recommendations}
        onSeeAll={onSeeAll}
        seeAllBy={Origin.Recommendations}
        handleSaveLocation={() => {}}
      />
      <WrapperSearch>
        <CardList
          showSeeAllButton
          favorite={favorite}
          placeList={placeList}
          seeAll={onSeeAll}
          title="Descobrir"
          showMoreDetails={showMoreDetails}
          seeAllBy={Origin.Places}
        />
      </WrapperSearch>
    </Container>
  );
};

export default Home;
