import { AddAccountModel } from 'src/domain/models/addAccountModel';
import { AddAccount } from '~/domain';

describe('Data: RemoteAddAccount', () => {
  test('should add with httpPostClient call correct url', () => {
    const httpPostClient = new HttPostClientSpy();
    const sut = new RemoteAddAccount('any_url', httpPostClient);

    sut.add({} as AddAccountModel);

    expect(sut.url).toEqual(httpPostClient.url);
  });

  test('should add with httpPostClient returning unexpected exception', async () => {
    const httpPostClient = new HttPostClientSpy();
    const sut = new RemoteAddAccount('any_url', httpPostClient);
    httpPostClient.completeWithUnexpectedError();

    try {
      await sut.add({} as AddAccountModel);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });

  test('should add with httpPostClient returning response with success', async () => {
    const httpPostClient = new HttPostClientSpy();
    const sut = new RemoteAddAccount('any_url', httpPostClient);

    const accountModel: AddAccountModel = {} as AddAccountModel;

    httpPostClient.completeWithSuccess();

    const response = await sut.add(accountModel);
    expect(response).toEqual('Account created with success');
  });

  test('should add with httpPostClient passing the correct param', async () => {
    const httpPostClient = new HttPostClientSpy();
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

class RemoteAddAccount implements AddAccount {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(accountModel: AddAccountModel) {
    const { statusCode } = await this.httpPostClient.post({
      url: this.url,
      body: accountModel,
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return 'Account created with success';
      default:
        throw new UnexpectedError();
    }
  }
}

class HttPostClientSpy implements HttpPostClient {
  url = '';
  body: any;
  response: HttpResponse<any> = { statusCode: HttpStatusCode.ok, body: {} };
  async post(data: HttpRequest): Promise<HttpResponse<any>> {
    this.url = data.url;
    this.body = data.body;
    return this.response;
  }

  completeWithUnexpectedError() {
    this.response.statusCode = HttpStatusCode.internalServerError;
  }

  completeWithSuccess() {
    this.response = { statusCode: HttpStatusCode.created, body: {} };
  }
}

interface HttpPostClient<R = any> {
  post(data: HttpRequest): Promise<HttpResponse<R>>;
}

type HttpRequest = {
  url: string;
  body?: any;
  headers?: any;
};

type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  internalServerError = 500,
}

class UnexpectedError extends Error {
  constructor() {
    super();
    this.message =
      'Unexpected error. Please check your internet and try again.';
    this.name = 'UnexpectedError';
  }
}
