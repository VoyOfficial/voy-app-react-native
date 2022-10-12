import { AddAccountModel } from '../models';

export default interface AddAccount {
  add(accountModel: AddAccountModel): Promise<string>;
}
