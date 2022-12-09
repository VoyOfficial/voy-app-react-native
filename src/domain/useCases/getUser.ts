import { UserModel } from '../models';

export default interface GetUser {
  get(userId: string): Promise<UserModel>;
}
