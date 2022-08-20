import { AddAccountModel } from '../models/addAccountModel';

export interface AddAccount {
  add(accountModel: AddAccountModel): Promise<RemoteResult>;
}
