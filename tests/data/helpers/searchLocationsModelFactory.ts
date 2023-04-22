import { faker } from '@faker-js/faker';
import { SearchLocationModel } from '~/domain/models';
import businessHoursModelStub from '../stubs/businessHoursModelStub';

const searchLocationsModelFactory = (): SearchLocationModel[] => {
  return [
    {
      about: faker.lorem.paragraph(),
      address: faker.address.streetAddress(),
      businessHours: businessHoursModelStub(),
      comments: makeComments(),
      contact: faker.phone.number(),
      images: makeImages(),
      isSaved: true,
      name: faker.company.name(),
      rating: 5,
    },
  ];
};

const makeComments = (quantity = 5): string[] => {
  const comments = [];
  for (let index = 0; index < quantity; index++) {
    comments.push(faker.lorem.paragraph());
  }

  return comments;
};

const makeImages = (quantity = 5): string[] => {
  const images = [];
  for (let index = 0; index < quantity; index++) {
    images.push(faker.image.imageUrl());
  }

  return images;
};

export default searchLocationsModelFactory;
