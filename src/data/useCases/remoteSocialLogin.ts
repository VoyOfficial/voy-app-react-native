import { SocialLogin } from '~/domain/useCases';
import { Social } from '~/domain/enums';
import { HttpPostClient, HttpStatusCode } from '../http';
import DataStatus from '../dataStatus';
import { SocialLoginError, UnexpectedError } from '../errors';

export default class RemoteSocialLogin implements SocialLogin {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  login = async (clientId: string, socialType: Social): Promise<string> => {
    const url = this.url + '?provider=' + socialType.toLowerCase();
    const { statusCode } = await this.httpPostClient.post({
      url: url,
      body: { client_id: clientId },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return DataStatus.connected;
      case HttpStatusCode.forbidden:
        throw new SocialLoginError();
      default:
        throw new UnexpectedError();
    }
  };
}
