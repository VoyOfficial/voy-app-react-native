import { UnexpectedError, UserNotFoundError } from '~/data/errors';
import { RemoteGetUser } from '~/data/useCases';
import userModelFactory from './helpers/userModelFactory';
import { HttpClientSpy } from './http/httpClientSpy';

describe('Data: RemoteGetUser', () => {
  test('should get with httpGetClient call correct user id', async () => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpClientSpy);

    await sut.get('any_user_id');

    expect(httpClientSpy.userId).toEqual('any_user_id');
  });

  test('should get with httpGetClient call correct url with user id', async () => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpClientSpy);

    await sut.get('any_user_id');

    expect(httpClientSpy.url).toEqual('http://any_url/any_user_id');
  });

  test('should get with httpGetClient returning the user with success', async () => {
    const userResponse = userModelFactory();
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpClientSpy);

    httpClientSpy.completeWithSuccess(userResponse);
    const response = await sut.get('any_user_id');

    expect(response).toEqual(userResponse);
  });

  test('should get with httpGetClient returning exception unexpected', async () => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpClientSpy);

    try {
      httpClientSpy.completeWithUnexpectedError();
      await sut.get('any_user_id');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });

  test('should get with httpGetClient returning exception user not found', async () => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpClientSpy);

    try {
      httpClientSpy.completeWithUserNotFound();
      await sut.get('any_user_id');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UserNotFoundError());
    }
  });
});
