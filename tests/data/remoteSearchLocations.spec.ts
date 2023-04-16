import { HttpPostClient } from '~/data/http';
import { SearchLocations } from '~/domain/useCases';
import { SearchParam } from '~/domain/params';
import { Filter, Ordination } from '~/domain/enums';
import SearchLocationModel from '../../src/domain/models/searchLocationModel';
import { makeUrl } from './helpers/testFactories';
import { HttpClientSpy } from './http/httpClientSpy';

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

  test('should search in the body of the httpPostClient call for the correct filter param', () => {
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);

    sut.search({
      filter: Filter.Entertainment,
      ordination: Ordination.Distance,
    });

    expect(httpClient.body).toEqual({ filter: Filter.Entertainment });
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ordination,
  }: SearchParam): Promise<SearchLocationModel[]> {
    this.httpPostClient.post({
      url: this.url,
      body: { filter: filter },
    });

    return {} as Promise<SearchLocationModel[]>;
  }
}
