import { HttpGetClient } from '~/data/http';
import { RemoteListLocations } from '~/data/useCases';

describe('Data: RemoteListLocations', () => {
  test('should add with httpPostClient call correct url', async () => {
    class HttpGetClientSpy implements HttpGetClient {
      url?: string;
      async get(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = 'any_url';
    const httpGetClientSpy = new HttpGetClientSpy();

    const sut = new RemoteListLocations(url, httpGetClientSpy);
    await sut.list();

    expect(httpGetClientSpy.url).toBe(url);
  });
});
