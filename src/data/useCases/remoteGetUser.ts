import { UserModel } from '~/domain/models';
import { GetUser } from '~/domain/useCases';
import { UnexpectedError, UserNotFoundError } from '../errors';
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
      case HttpStatusCode.created:
        return body ? body : ({} as UserModel);
      case HttpStatusCode.notFound:
        throw new UserNotFoundError();
      case HttpStatusCode.internalServerError:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}
