import SocialLogin from 'src/domain/useCases/socialLogin';
import { Social } from '~/domain/enums';
import { HttpPostClient } from '~/data/http';
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
});

class RemoteSocialLogin implements SocialLogin {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}
  login(clientId: string, socialType: Social): Promise<string> {
    const url = this.url + '?provider=' + socialType.toLowerCase();
    this.httpPostClient.post({ url: url });
  }
}
