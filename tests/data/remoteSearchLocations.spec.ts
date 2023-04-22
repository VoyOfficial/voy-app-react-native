import { faker } from '@faker-js/faker';
import { HttpPostClient, HttpStatusCode } from '~/data/http';
import { SearchLocations } from '~/domain/useCases';
import { SearchParam } from '~/domain/params';
import { Filter, Ordination } from '~/domain/enums';
import { NoAccessError } from '~/data/errors';
import SearchLocationModel from '../../src/domain/models/searchLocationModel';
import { makeUrl } from './helpers/testFactories';
import { HttpClientSpy } from './http/httpClientSpy';
import businessHoursModelStub from './stubs/businessHoursModelStub';

describe('Data: RemoteSearchLocations', () => {
  test('should search with httpPostClient call correct url', () => {
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    sut.search({
      filter: Filter.Entertainment,
      ordination: Ordination.Distance,
    });

    expect(httpClient.url).toEqual(url);
  });

  test('should search in the body of the httpPostClient call for the correct filter and ordination params', () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const { sut, httpClient } = makeSut(url);

    sut.search({
      filter: filter,
      ordination: ordination,
    });

    expect(httpClient.body).toEqual({
      filter: filter,
      ordination: ordination,
    });
  });

  test('should search with httpPostClient returning noContent and returning list empty', async () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithNoContentError();

    const response = await sut.search({
      filter: filter,
      ordination: ordination,
    });

    expect(response).toEqual([]);
  });

  test('should search with httpPostClient returning noAccess error', async () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithForbiddenError();

    const promise = sut.search({
      filter: filter,
      ordination: ordination,
    });

    await expect(promise).rejects.toThrow(new NoAccessError());
  });

  test('should search with httpPostClient returning a list with success', async () => {
    const url = makeUrl();
    const filter = Filter.Entertainment;
    const ordination = Ordination.Distance;
    const body = searchLocationsModelFactory();
    const { sut, httpClient } = makeSut(url);
    httpClient.completeWithSuccess(HttpStatusCode.ok, body);

    const response = await sut.search({
      filter: filter,
      ordination: ordination,
    });

    expect(response).toEqual(body);
  });
});

const makeSut = (url = makeUrl()) => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteSearchLocations(url, httpClient);

  return { sut, httpClient };
};

class RemoteSearchLocations implements SearchLocations {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  async search({
    filter,
    ordination,
  }: SearchParam): Promise<SearchLocationModel[]> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: { filter: filter, ordination: ordination },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new NoAccessError();
      default:
        return [];
    }
  }
}

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
