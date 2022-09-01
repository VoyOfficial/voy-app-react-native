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
});

class RemoteAddAccount implements AddAccount {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(accountModel: AddAccountModel): Promise<RemoteResult> {
    const { statusCode } = await this.httpPostClient.post({ url: this.url });

    switch (statusCode) {
      case HttpStatusCode.internalServerError:
        throw new UnexpectedError();
    }

    return {} as Promise<RemoteResult>;
  }
}

class HttPostClientSpy implements HttpPostClient {
  url = '';
  response: HttpResponse<any> = { statusCode: HttpStatusCode.ok, body: {} };
  async post(data: HttpRequest): Promise<HttpResponse<any>> {
    this.url = data.url;
    return this.response;
  }

  completeWithUnexpectedError() {
    this.response.statusCode = HttpStatusCode.internalServerError;
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
