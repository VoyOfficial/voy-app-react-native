import { AddAccountModel } from '~/domain/models';
import { AddAccount } from '~/domain/useCases';
import DataStatus from '../dataStatus';
import { UnexpectedError, ValidationError } from '../errors';
import { HttpPostClient, HttpStatusCode } from '../http';

export default class RemoteAddAccount implements AddAccount {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}

  async add(accountModel: AddAccountModel) {
    const { statusCode } = await this.httpPostClient.post({
      url: this.url,
      body: accountModel,
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return DataStatus.created;
      case HttpStatusCode.forbidden:
        throw new ValidationError();
      default:
        throw new UnexpectedError();
    }
  }
}
