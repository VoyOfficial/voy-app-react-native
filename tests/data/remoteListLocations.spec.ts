import { RemoteListLocations } from '~/data/useCases';
import { makeUrl } from './helpers/testFactories';
import { HttpClientSpy } from './http/httpClientSpy';

describe('Data: RemoteListLocations', () => {
  test('should add with httpPostClient call correct url', async () => {
    const url = 'any_url';
    const { httpClient, sut } = makeSut();

    await sut.list();

    expect(httpClient.url).toBe(url);
  });
});

const makeSut = () => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteListLocations(makeUrl(), httpClient);

  return { sut, httpClient };
};
