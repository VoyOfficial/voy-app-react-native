import User from '../models/userModel';

export default interface GetUser {
  get(userId: string): Promise<User>;
}
