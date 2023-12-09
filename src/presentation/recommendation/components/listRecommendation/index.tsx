import React from 'react';
import ListCard from '../listCard';
import {
  Button,
  Container,
  Content,
  List,
  TextButton,
  Title,
  Wrapper,
} from './styles';

export type RecommendationProps = {
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  rating: string;
};

type Props = {
  recommendations: RecommendationProps[];
  showMoreDetails: (place: RecommendationProps) => void;
  onSeeAll: (by: string) => void;
  seeAllBy: string;
  handleSaveLocation: (location: RecommendationProps) => void;
};

const ListRecommendation = ({
  recommendations,
  onSeeAll,
  showMoreDetails,
  seeAllBy,
  handleSaveLocation,
}: Props) => {
  return (
    <Container>
      <Wrapper>
        <Title>Recomendações</Title>
        <Button onPress={() => onSeeAll(seeAllBy)} testID="onpress-see-all">
          <TextButton>Ver todos</TextButton>
        </Button>
      </Wrapper>
      <Content>
        <List
          testID="recommendation-list"
          data={recommendations}
          renderItem={({ item, index }) => (
            <ListCard
              index={index}
              imageUrl={item.imageUrl}
              location={item.location}
              rating={item.rating}
              title={item.title}
              myDistanceOfLocal={item.myDistanceOfLocal}
              onSaveLocation={() => handleSaveLocation(item)}
              showMoreDetails={showMoreDetails}
            />
          )}
        />
      </Content>
    </Container>
  );
};

export default ListRecommendation;
