import { AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';

export const httpResponseFake = (): AxiosResponse => ({
  data: faker.datatype.json(),
  status: faker.datatype.number(),
  statusText: faker.datatype.string(),
  headers: {},
  config: {},
});

export const httpRequestFake = () => {
  return {
    url: faker.internet.url(),
    body: faker.datatype.json(),
    headers: faker.datatype.json(),
  };
};
