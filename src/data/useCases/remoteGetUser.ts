import { UserModel } from '~/domain/models';
import { GetUser } from '~/domain/useCases';
import {
  UnexpectedError,
  UserNotFoundError,
  UserNotHaveAccessError,
} from '../errors';
import { HttpGetClient, HttpStatusCode } from '../http';

export default class RemoteGetUser implements GetUser {
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
        const bodyIsNotEmpty = Object.entries(body).length !== 0;
        if (body && bodyIsNotEmpty) {
          return body;
        }
        throw new UserNotFoundError();
      case HttpStatusCode.notFound:
        throw new UserNotFoundError();
      case HttpStatusCode.forbidden:
        throw new UserNotHaveAccessError();
      default:
        throw new UnexpectedError();
    }
  }
}
