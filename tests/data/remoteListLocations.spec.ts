import { RemoteListLocations } from '~/data/useCases';
import { makeUrl } from './helpers/testFactories';
import { HttpGetClientSpy } from './http/httpClientSpy';

describe('Data: RemoteListLocations', () => {
  test('should add with httpPostClient call correct url', async () => {
    const url = 'any_url';
    const { httpGetClientSpy, sut } = makeSut();

    await sut.list();

    expect(httpGetClientSpy.url).toBe(url);
  });
});

const makeSut = () => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteListLocations(makeUrl(), httpGetClientSpy);

  return { sut, httpGetClientSpy };
};
