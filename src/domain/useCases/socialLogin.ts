import { Social } from '../enums';

export default interface SocialLogin {
  login(clientId: string, socialType: Social): Promise<string>;
}
