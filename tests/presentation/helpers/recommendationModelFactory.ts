import { faker } from '@faker-js/faker';
import { RecommendationModel } from '~/domain/models';

export const recommendationModelFactory = (): RecommendationModel => {
  return {
    location: faker.address.secondaryAddress(),
    imageUrl: faker.image.city(),
    title: faker.name.jobTitle(),
    rating: faker.datatype
      .number({ min: 1, max: 10, precision: 0.1 })
      .toString(),
    myDistanceOfLocal: faker.datatype.number().toString(),
    id: faker.datatype.number(),
  };
};
