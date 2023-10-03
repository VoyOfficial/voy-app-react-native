import { faker } from '@faker-js/faker';
import { Place } from '../../../src/presentation/components/cardList';

const placeListFactory = (quantity: number): Array<Place> => {
  const placeList = [];
  for (let index = 0; index < quantity; index++) {
    placeList.push({
      imageUrl: faker.image.imageUrl(),
      title: faker.random.words(),
      location: faker.random.word(),
      myDistanceOfLocal: faker.random.numeric(),
      amountOfReviews: faker.random.numeric(),
      rating: faker.random.numeric(),
    });
  }
  return placeList;
};

export default placeListFactory;
