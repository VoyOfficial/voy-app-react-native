import { UserModel } from 'src/domain/models';
import GetUser from 'src/domain/useCases/getUser';
import { faker } from '@faker-js/faker';
import { HttpRequest, HttpResponse, HttpStatusCode } from '~/data/http';
import { UnexpectedError } from '~/data/errors';

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

  test('should get with httpGetClient returning the user with success', async () => {
    const userResponse = userModelFactory();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpGetClientSpy);

    httpGetClientSpy.completeWithSuccess(userResponse);
    const response = await sut.get('any_user_id');

    expect(response).toEqual(userResponse);
  });

  test('should get with httpGetClient returning exception unexpected', async () => {
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpGetClientSpy);

    try {
      httpGetClientSpy.completeWithUnexpectedError();
      await sut.get('any_user_id');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });

  test('should get with httpGetClient returning exception user not found', async () => {
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteGetUser('http://any_url', httpGetClientSpy);

    try {
      httpGetClientSpy.completeWithUserNotFound();
      await sut.get('any_user_id');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UserNotFound());
    }
  });
});

class RemoteGetUser implements GetUser {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async get(userId: string): Promise<UserModel> {
    const { statusCode, body } = await this.httpGetClient.get({
      url: this.url + `/${userId}`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return body ? body : ({} as UserModel);
      case HttpStatusCode.notFound:
        throw new UserNotFound();
      case HttpStatusCode.internalServerError:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}

class HttpGetClientSpy implements HttpGetClient {
  userId = '';
  url = '';
  response: HttpResponse<any> = {
    statusCode: HttpStatusCode.created,
    body: null,
  };
  async get(data: HttpRequest): Promise<HttpResponse<UserModel>> {
    const urlArray = data.url.split('/');
    this.userId = urlArray[urlArray.length - 1];
    this.url = data.url;
    return this.response;
  }

  completeWithSuccess(body: UserModel) {
    this.response = {
      statusCode: HttpStatusCode.ok,
      body: body,
    };
  }

  completeWithUnexpectedError() {
    this.response = {
      statusCode: HttpStatusCode.internalServerError,
    };
  }

  completeWithUserNotFound() {
    this.response = {
      statusCode: HttpStatusCode.notFound,
      body: null,
    };
  }
}

interface HttpGetClient {
  get(data: HttpRequest): Promise<HttpResponse<UserModel>>;
}

const userModelFactory = (): UserModel => {
  return {
    birthDate: faker.date.birthdate(),
    contactNumber: faker.phone.number(),
    currentState: faker.address.state(),
    email: faker.internet.email(),
    lastName: faker.name.lastName(),
    name: faker.name.fullName(),
    city: faker.address.city(),
    genre: faker.name.sex(),
  };
};

export default class UserNotFound extends Error {
  constructor() {
    super();
    this.message = 'User not found. please make sure you have a user.';
    this.name = 'UserNotFound';
  }
}
