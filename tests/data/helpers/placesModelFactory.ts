import { faker } from '@faker-js/faker';
import { PlaceModel } from '~/domain/models';

const placesModelFactory = (): Array<PlaceModel> => {
  return [
    {
      imageUrl: faker.image.imageUrl(),
      title: faker.random.words(),
      location: faker.random.word(),
      myDistanceOfLocal: faker.random.numeric(),
      amountOfReviews: faker.random.numeric(),
      rating: faker.random.numeric(),
    },
  ];
};

export default placesModelFactory;
