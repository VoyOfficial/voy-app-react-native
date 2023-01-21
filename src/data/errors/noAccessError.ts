export default class NoAccessError extends Error {
  constructor() {
    super();
    this.message = 'No access error. Check if you have access and try again.';
    this.name = 'NoAccessError';
  }
}
