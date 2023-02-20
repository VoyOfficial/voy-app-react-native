import { faker } from '@faker-js/faker';
import { LocationModel } from '~/domain/models';

const locationsModelFactory = (): Array<LocationModel> => {
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
      isSaved: faker.datatype.boolean(),
    },
  ];
};

export default locationsModelFactory;
