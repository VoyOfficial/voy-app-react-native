import { DataStatus } from '~/data';
import { UnexpectedError, ValidationError } from '~/data/errors';
import { RemoteAddAccount } from '~/data/useCases';
import { AddAccountModel } from '~/domain/models';
import accountModelFactory from './helpers/accountModelFactory';
import { makeUrl } from './helpers/testFactories';
import { HttpClientSpy } from './http/httpClientSpy';

describe('Data: RemoteAddAccount', () => {
  test('should add with httpPostClient call correct url', () => {
    const { sut, httpClient } = makeSut();
    sut.add({} as AddAccountModel);

    expect(sut.url).toEqual(httpClient.url);
  });

  test('should add with httpPostClient returning unexpected exception', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();

    try {
      await sut.add({} as AddAccountModel);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });

  test('should add with httpPostClient returning validation exception', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithForbiddenError();

    try {
      await sut.add({} as AddAccountModel);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new ValidationError());
    }
  });

  test('should add with httpPostClient returning response with success', async () => {
    const accountModel = accountModelFactory();
    const { sut, httpClient } = makeSut();
    httpClient.completeWithSuccess();

    const response = await sut.add(accountModel);
    expect(response).toEqual(DataStatus.created);
  });

  test('should add with httpPostClient passing the correct param', async () => {
    const accountModel = accountModelFactory();
    const { sut, httpClient } = makeSut();
    httpClient.completeWithSuccess();

    await sut.add(accountModel);
    expect(httpClient.body).toEqual(accountModel);
  });
});

const makeSut = () => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteAddAccount(makeUrl(), httpClient);

  return { sut, httpClient };
};
