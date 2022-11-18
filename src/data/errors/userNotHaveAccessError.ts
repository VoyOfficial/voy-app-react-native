export default class UserNotHaveAccessError extends Error {
  constructor() {
    super();
    this.message =
      'Error of User not have access. Please login in order to access the information and try again';
    this.name = 'UserNotHaveAccessError';
  }
}
