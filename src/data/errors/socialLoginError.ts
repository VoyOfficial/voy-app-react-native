export default class SocialLoginError extends Error {
  constructor() {
    super();
    this.message =
      'Login error. Try logging in again, if not, try again later.';
    this.name = 'SocialLoginError';
  }
}
