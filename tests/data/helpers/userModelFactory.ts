import { faker } from '@faker-js/faker';
import { UserModel } from '~/domain/models';

const userModelFactory = (): UserModel => {
  return {
    birthDate: faker.date.birthdate(),
    contactNumber: faker.phone.number(),
    currentState: faker.address.state(),
    email: faker.internet.email(),
    lastName: faker.name.lastName(),
    name: faker.name.fullName(),
    city: faker.address.city(),
    genre: faker.name.sex(),
  };
};

export default userModelFactory;
