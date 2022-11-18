export default class UserNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'User not found. please make sure you have a user.';
    this.name = 'UserNotFoundError';
  }
}
