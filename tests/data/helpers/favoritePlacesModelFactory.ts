import { faker } from '@faker-js/faker';
import { FavoritePlaceModel } from '~/domain/models';
import businessHoursModelStub from '../stubs/businessHoursModelStub';

const favoritePlacesModelFactory = (): Array<FavoritePlaceModel> => {
  return [
    {
      about: faker.lorem.paragraph(),
      address: faker.address.secondaryAddress(),
      businessHours: businessHoursModelStub(),
      comments: [faker.lorem.words(10)],
      contact: faker.phone.number(),
      images: [faker.image.city()],
      name: faker.name.jobTitle(),
      rating: faker.datatype.number({ min: 1, max: 10, precision: 0.1 }),
    },
  ];
};

export default favoritePlacesModelFactory;
