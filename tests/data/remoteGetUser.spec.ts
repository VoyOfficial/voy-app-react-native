import {
  UnexpectedError,
  UserNotFoundError,
  UserNotHaveAccessError,
} from '~/data/errors';
import { HttpStatusCode } from '~/data/http';
import { RemoteGetUser } from '~/data/useCases';
import userModelFactory from './helpers/userModelFactory';
import { HttpClientSpy } from './http/httpClientSpy';

describe('Data: RemoteGetUser', () => {
  test('should get with httpGetClient call correct user id', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.completeWithSuccess(HttpStatusCode.ok, userModelFactory());
    await sut.get('any_user_id');

    expect(httpClientSpy.userId).toEqual('any_user_id');
  });

  test('should get with httpGetClient call correct url with user id', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.completeWithSuccess(HttpStatusCode.ok, userModelFactory());
    await sut.get('any_user_id');

    expect(httpClientSpy.url).toEqual('http://any_url/any_user_id');
  });

  test('should get with httpGetClient returning the user with success', async () => {
    const userResponse = userModelFactory();
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.completeWithSuccess(HttpStatusCode.ok, userResponse);
    const response = await sut.get('any_user_id');

    expect(response).toEqual(userResponse);
  });

  test('should get with httpGetClient returning exception unexpected', async () => {
    const { sut, httpClientSpy } = makeSut();

    try {
      httpClientSpy.completeWithUnexpectedError();
      await sut.get('any_user_id');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });

  test('should get with httpGetClient returning user not found exception', async () => {
    const { sut, httpClientSpy } = makeSut();

    try {
      httpClientSpy.completeWithUserNotFound();
      await sut.get('any_user_id');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UserNotFoundError());
    }
  });

  test('should get with httpGetClient returning ok, but with user not found exception', async () => {
    const { sut, httpClientSpy } = makeSut();

    try {
      httpClientSpy.completeWithSuccess(HttpStatusCode.ok, {});
      await sut.get('any_user_id');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UserNotFoundError());
    }
  });

  test('should get with httpGetClient returning user not have access exception', async () => {
    const { sut, httpClientSpy } = makeSut();

    try {
      httpClientSpy.completeWithForbiddenError();
      await sut.get('any_user_id');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UserNotHaveAccessError());
    }
  });
});

const makeSut = () => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteGetUser('http://any_url', httpClientSpy);

  return { sut, httpClientSpy };
};
