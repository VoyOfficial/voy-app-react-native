import { faker } from '@faker-js/faker';

export const makeUrl = () => faker.internet.url();

export const makeNextPageToken = () => faker.random.alphaNumeric();
