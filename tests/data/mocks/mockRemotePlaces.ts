import { faker } from '@faker-js/faker';
import { PlaceModel } from '~/domain/models';

export const mockRemotePlace = (): PlaceModel => ({
  id: faker.datatype.number({ min: 1, max: 1000 }),
  imageUrl: faker.image.city(),
  title: faker.company.name(),
  location: faker.address.streetAddress(),
  myDistanceOfLocal: `${faker.datatype.float({
    min: 0.1,
    max: 50,
    precision: 0.1,
  })} km`,
  amountOfReviews: `${faker.datatype.number({ min: 0, max: 1000 })} reviews`,
  rating: faker.datatype
    .float({
      min: 1,
      max: 5,
      precision: 0.1,
    })
    .toString(),
});

export const mockRemoteListPlace = (): PlaceModel[] => [mockRemotePlace()];
