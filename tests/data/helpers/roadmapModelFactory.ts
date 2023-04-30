import { faker } from '@faker-js/faker';
import { RoadmapModel } from '~/domain/models';
import userModelFactory from './userModelFactory';
import placesModelFactory from './placesModelFactory';

const userModel = userModelFactory();
const placesModel = placesModelFactory();

const roadmapModelFactory = (): RoadmapModel[] => {
  return [
    {
      created: userModel,
      description: faker.lorem.words(5),
      places: placesModel,
      quantityLocation: faker.datatype.number(),
      quantitySaved: faker.datatype.number(),
      title: faker.address.street(),
    },
  ];
};

export default roadmapModelFactory;
