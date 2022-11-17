import UserModel from 'src/domain/models/userModel';
import GetUser from 'src/domain/useCases/getUser';
import { HttpRequest, HttpResponse } from '~/data/http';

describe('Data: RemoteGetUser', () => {
  test('should get with httpGetClient call correct user id', async () => {
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpGetClientSpy);

    await sut.get('any_user_id');

    expect(httpGetClientSpy.userId).toEqual('any_user_id');
  });

  test('should get with httpGetClient call correct url with user id', async () => {
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpGetClientSpy);

    await sut.get('any_user_id');

    expect(httpGetClientSpy.url).toEqual('http://any_url/any_user_id');
  });
});

class RemoteGetUser implements GetUser {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async get(userId: string): Promise<UserModel> {
    const response = await this.httpGetClient.get({
      url: this.url + `/${userId}`,
    });
    return response.body!;
  }
}

class HttpGetClientSpy implements HttpGetClient {
  userId = '';
  url = '';
  get(data: HttpRequest): Promise<HttpResponse<UserModel>> {
    const urlArray = data.url.split('/');
    this.userId = urlArray[urlArray.length - 1];
    this.url = data.url;
    return {} as Promise<HttpResponse<UserModel>>;
  }
}

interface HttpGetClient {
  get(data: HttpRequest): Promise<HttpResponse<UserModel>>;
}
