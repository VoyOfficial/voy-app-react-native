enum Social {
  APPLE = 'apple',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export default interface SocialLogin {
  login(clientId: string, socialType: Social): Promise<string>;
}
