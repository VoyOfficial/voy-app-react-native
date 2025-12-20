import { faker } from '@faker-js/faker';

export const mockApiRecommendation = () => ({
  id: faker.datatype.number({ min: 1, max: 1000 }),
  googlePlaceId: faker.datatype.uuid(),
  name: faker.company.name(),
  contact: faker.phone.number(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  ranking: faker.datatype.number({ min: 1, max: 10 }),
  latitude: parseFloat(faker.address.latitude()),
  longitude: parseFloat(faker.address.longitude()),
  distanceFromUserLocation: `${faker.datatype.float({
    min: 0.1,
    max: 50,
    precision: 0.1,
  })} km`,
  photoReference: faker.image.city(),
  rating: faker.datatype.float({
    min: 1,
    max: 5,
    precision: 0.1,
  }),
});

export const mockApiListRecommendations = (count = 1) =>
  Array.from({ length: count }, () => mockApiRecommendation());
