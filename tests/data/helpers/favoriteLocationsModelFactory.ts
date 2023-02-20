import { faker } from '@faker-js/faker';
import { FavoriteLocationModel } from '~/domain/models';

const favoriteLocationsModelFactory = (): Array<FavoriteLocationModel> => {
  return [
    {
      about: faker.lorem.paragraph(),
      address: faker.address.secondaryAddress(),
      businessHours: faker.date.recent().toISOString(),
      comments: [faker.lorem.words(10)],
      contact: faker.phone.number(),
      images: [faker.image.city()],
      name: faker.name.jobTitle(),
      rating: faker.datatype.number({ min: 1, max: 10, precision: 0.1 }),
    },
  ];
};

export default favoriteLocationsModelFactory;