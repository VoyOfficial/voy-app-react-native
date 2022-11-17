import AddAccountModel from '../models/addAccountModel';

export default interface AddAccount {
  add(accountModel: AddAccountModel): Promise<string>;
}
