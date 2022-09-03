import { DataStatus } from '~/data';
import { UnexpectedError, ValidationError } from '~/data/errors';
import { RemoteAddAccount } from '~/data/useCases';
import { AddAccountModel } from '~/domain/models';
import { HttpClientSpy } from './http/httpClientSpy';

describe('Data: RemoteAddAccount', () => {
  test('should add with httpPostClient call correct url', () => {
    const httpPostClient = new HttpClientSpy();
    const sut = new RemoteAddAccount('any_url', httpPostClient);

    sut.add({} as AddAccountModel);

    expect(sut.url).toEqual(httpPostClient.url);
  });

  test('should add with httpPostClient returning unexpected exception', async () => {
    const httpPostClient = new HttpClientSpy();
    const sut = new RemoteAddAccount('any_url', httpPostClient);
    httpPostClient.completeWithUnexpectedError();

    try {
      await sut.add({} as AddAccountModel);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });

  test('should add with httpPostClient returning validation exception', async () => {
    const httpPostClient = new HttpClientSpy();
    const sut = new RemoteAddAccount('any_url', httpPostClient);
    httpPostClient.completeWithForbiddenError();

    try {
      await sut.add({} as AddAccountModel);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new ValidationError());
    }
  });

  test('should add with httpPostClient returning response with success', async () => {
    const httpPostClient = new HttpClientSpy();
    const sut = new RemoteAddAccount('any_url', httpPostClient);

    const accountModel: AddAccountModel = {} as AddAccountModel;

    httpPostClient.completeWithSuccess();

    const response = await sut.add(accountModel);
    expect(response).toEqual(DataStatus.created);
  });

  test('should add with httpPostClient passing the correct param', async () => {
    const httpPostClient = new HttpClientSpy();
    const sut = new RemoteAddAccount('any_url', httpPostClient);

    const accountModel: AddAccountModel = {
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@gmail.com',
      contactNumber: '+5595991738017',
      birthDate: new Date(),
      currentState: 'any_currentState',
      cpf: '037.495.802-51',
    };

    httpPostClient.completeWithSuccess();

    await sut.add(accountModel);

    expect(httpPostClient.body).toEqual(accountModel);
  });
});
