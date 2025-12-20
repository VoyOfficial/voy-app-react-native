import { faker } from '@faker-js/faker';

export type ApiPlaceResponse = {
  googlePlaceId: string;
  name: string;
  address: string;
  about: string;
  rating: number;
  userRatingsTotal: number;
  photoReference: string;
  latitude: number;
  longitude: number;
};

export const mockApiPlace = (): ApiPlaceResponse => ({
  googlePlaceId: faker.datatype.uuid(),
  name: faker.company.name(),
  address: faker.address.streetAddress(),
  about: faker.lorem.sentence(),
  rating: faker.datatype.float({
    min: 0,
    max: 5,
    precision: 0.1,
  }),
  userRatingsTotal: faker.datatype.number({ min: 0, max: 1000 }),
  photoReference: faker.datatype.uuid(),
  latitude: faker.datatype.float({ min: -90, max: 90, precision: 0.000001 }),
  longitude: faker.datatype.float({ min: -180, max: 180, precision: 0.000001 }),
});

export const mockApiListPlaces = (count = 1): ApiPlaceResponse[] =>
  Array.from({ length: count }, () => mockApiPlace());
