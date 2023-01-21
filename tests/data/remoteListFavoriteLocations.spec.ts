import { faker } from '@faker-js/faker';
import { NoAccessError, UnexpectedError } from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { RemoteListFavoriteLocations } from '~/data/useCases';
import { FavoriteLocationModel } from '~/domain/models';
import { makeUrl } from './helpers/testFactories';
import { HttpClientSpy } from './http/httpClientSpy';

describe('Data: RemoteListFavoriteLocations', () => {
  test('should list with httpGetClient calling the correct url', () => {
    const httpGetClient = new HttpClientSpy();
    const url = makeUrl();
    const sut = new RemoteListFavoriteLocations(url, httpGetClient);

    sut.list();

    expect(httpGetClient.url).toEqual(url);
  });

  test('should list with httpGetClient and return unexpected exception', async () => {
    const httpGetClient = new HttpClientSpy();
    const url = makeUrl();
    const sut = new RemoteListFavoriteLocations(url, httpGetClient);
    httpGetClient.completeWithUnexpectedError();

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should list with httpGetClient returning noContent error and return list empty', async () => {
    const httpGetClient = new HttpClientSpy();
    const url = makeUrl();
    const sut = new RemoteListFavoriteLocations(url, httpGetClient);
    httpGetClient.completeWithNoContentError();

    const response = await sut.list();

    expect(response).toEqual([]);
  });

  test('should list with httpGetClient and return noAccess exception', async () => {
    const httpGetClient = new HttpClientSpy();
    const url = makeUrl();
    const sut = new RemoteListFavoriteLocations(url, httpGetClient);
    httpGetClient.completeWithForbiddenError();

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new NoAccessError());
  });

  test('should list with httpGetClient and return content with success', async () => {
    const httpGetClient = new HttpClientSpy();
    const url = makeUrl();
    const sut = new RemoteListFavoriteLocations(url, httpGetClient);
    const httpResponse = favoriteLocationsModelFactory();
    httpGetClient.completeWithSuccess(HttpStatusCode.ok, httpResponse);

    const response = await sut.list();

    expect(response).toEqual(httpResponse);
  });
});

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
