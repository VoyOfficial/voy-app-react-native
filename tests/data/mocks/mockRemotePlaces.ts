import { faker } from '@faker-js/faker';
import { PlaceModel } from '~/domain/models';
import businessHoursModelStub from '../stubs/businessHoursModelStub';

export const mockRemotePlace = (): PlaceModel => ({
  about: faker.lorem.paragraph(),
  address: faker.address.secondaryAddress(),
  businessHours: businessHoursModelStub(),
  comments: [faker.lorem.words(10)],
  contact: faker.phone.number(),
  images: [faker.image.city()],
  isSaved: faker.datatype.boolean(),
  name: faker.name.jobTitle(),
  rating: faker.datatype.number({ min: 1, max: 10, precision: 0.1 }),
});

export const mockRemoteListPlace = (): PlaceModel[] => [mockRemotePlace()];
