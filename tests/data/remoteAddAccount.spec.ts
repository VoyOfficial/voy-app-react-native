import { AddAccountModel } from 'src/domain/models/addAccountModel';
import { AddAccount } from '~/domain';

describe('Data: RemoteAddAccount', () => {
  test('should add with httpPostClient call correct url', () => {
    const httPostClient = new HttPostClientSpy();
    const sut = new RemoteAddAccount('any_url', httPostClient);

    sut.add({} as AddAccountModel);

    expect(sut.url).toEqual(httPostClient.url);
  });
});

class RemoteAddAccount implements AddAccount {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(accountModel: AddAccountModel): Promise<RemoteResult> {
    this.httpPostClient.post({ url: this.url });
    return {} as Promise<RemoteResult>;
  }
}

class HttPostClientSpy implements HttpPostClient {
  url = '';
  post(data: HttpRequest): Promise<HttpResponse<any>> {
    this.url = data.url;
    return {} as Promise<HttpResponse<any>>;
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
