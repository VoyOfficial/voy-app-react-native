import { Social } from '~/domain/enums';
import { SocialLoginError, UnexpectedError } from '~/data/errors';
import { DataStatus } from '~/data';
import { RemoteSocialLogin } from '~/data/useCases';
import { HttpClientSpy } from '../http/httpClientSpy';
import { makeUrl } from '../helpers/testFactories';

describe('Data: RemoteSocialLogin', () => {
  test('should realize social login calling httpPostClient with correct url', () => {
    const clientId = 'any_clientId';
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);
    sut.login(clientId, Social.FACEBOOK);

    expect(httpClient.url).toEqual(
      url + '?provider=' + Social.FACEBOOK.toLowerCase(),
    );
  });

  test('should realize social login calling httpPostClient with correct client id', () => {
    const clientId = 'any_clientId';
    const { sut, httpClient } = makeSut();
    sut.login(clientId, Social.FACEBOOK);

    expect(httpClient.body).toEqual({
      client_id: clientId,
    });
  });

  test('should realize social login calling httpPostClient returning unexpected exception', async () => {
    const clientId = 'any_clientId';
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();

    const promise = sut.login(clientId, Social.FACEBOOK);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should realize social login calling httpPostClient returning response with success', async () => {
    const clientId = 'any_clientId';
    const { sut } = makeSut();
    const response = await sut.login(clientId, Social.FACEBOOK);

    expect(response).toEqual(DataStatus.connected);
  });

  test('should perform social login by calling httpPostClient returning forbidden error', async () => {
    const clientId = 'any_clientId';
    const { sut, httpClient } = makeSut();
    httpClient.completeWithForbiddenError();

    const promise = sut.login(clientId, Social.FACEBOOK);

    await expect(promise).rejects.toThrow(new SocialLoginError());
  });
});

const makeSut = (url = makeUrl()) => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteSocialLogin(url, httpClient);

  return { sut, httpClient };
};
