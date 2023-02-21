import { faker } from '@faker-js/faker';
import { RoadmapModel } from '~/domain/models';
import locationsModelFactory from './locationsModelFactory';
import userModelFactory from './userModelFactory';

const userModel = userModelFactory();
const locationModel = locationsModelFactory();

const roadmapModelFactory = (): RoadmapModel[] => {
  return [
    {
      created: userModel,
      description: faker.lorem.words(5),
      locations: locationModel,
      quantityLocation: faker.datatype.number(),
      quantitySaved: faker.datatype.number(),
      title: faker.address.street(),
    },
  ];
};

export default roadmapModelFactory;
