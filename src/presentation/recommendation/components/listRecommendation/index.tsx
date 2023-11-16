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
  onSeeAll: () => void;
};

const ListRecommendation = ({ recommendations, onSeeAll }: Props) => {
  const handleSaveLocation = (location: RecommendationProps) => {
    console.log(location);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Recomendações</Title>
        <Button onPress={onSeeAll} testID="onpress-see-all">
          <TextButton>Ver todos</TextButton>
        </Button>
      </Wrapper>
      <Content>
        <List
          testID="recommendation-list"
          data={recommendations}
          renderItem={({ item }) => (
            <ListCard
              imageUrl={item.imageUrl}
              location={item.location}
              rating={item.rating}
              title={item.title}
              myDistanceOfLocal={item.myDistanceOfLocal}
              onSaveLocation={() => handleSaveLocation(item)}
              showMoreDetails={() => {}}
            />
          )}
        />
      </Content>
    </Container>
  );
};

export default ListRecommendation;
