import SocialLogin from 'src/domain/useCases/socialLogin';
import { Social } from '~/domain/enums';
import { HttpPostClient, HttpStatusCode } from '~/data/http';
import { UnexpectedError } from '~/data/errors';
import { DataStatus } from '~/data';
import { HttpClientSpy } from '../http/httpClientSpy';
import { makeUrl } from '../helpers/testFactories';

describe('Data: RemoteSocialLogin', () => {
  test('should realize social login calling httpPostClient with correct url', () => {
    const httpClient = new HttpClientSpy();
    const url = makeUrl();
    const clientId = 'any_clientId';
    const sut = new RemoteSocialLogin(url, httpClient);
    sut.login(clientId, Social.FACEBOOK);

    expect(httpClient.url).toEqual(
      url + '?provider=' + Social.FACEBOOK.toLowerCase(),
    );
  });

  test('should realize social login calling httpPostClient with correct client id', () => {
    const httpClient = new HttpClientSpy();
    const url = makeUrl();
    const clientId = 'any_clientId';
    const sut = new RemoteSocialLogin(url, httpClient);
    sut.login(clientId, Social.FACEBOOK);

    expect(httpClient.body).toEqual({
      client_id: clientId,
    });
  });

  test('should realize social login calling httpPostClient returning unexpected exception', () => {
    const httpClient = new HttpClientSpy();
    const url = makeUrl();
    const clientId = 'any_clientId';
    const sut = new RemoteSocialLogin(url, httpClient);

    const promise = sut.login(clientId, Social.FACEBOOK);

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should realize social login calling httpPostClient returning response with success', async () => {
    const httpClient = new HttpClientSpy();
    const url = makeUrl();
    const clientId = 'any_clientId';
    const sut = new RemoteSocialLogin(url, httpClient);

    const response = await sut.login(clientId, Social.FACEBOOK);

    expect(response).toEqual(DataStatus.connected);
  });
});

class RemoteSocialLogin implements SocialLogin {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  login = async (clientId: string, socialType: Social): Promise<string> => {
    const url = this.url + '?provider=' + socialType.toLowerCase();
    const { statusCode } = await this.httpPostClient.post({
      url: url,
      body: { client_id: clientId },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return DataStatus.connected;
      default:
        throw new UnexpectedError();
    }
  };
}
