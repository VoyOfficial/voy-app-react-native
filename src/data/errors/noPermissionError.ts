export default class NoPermissionError extends Error {
  constructor() {
    super();
    this.message =
      'No Permission error. Please verify that you have permission to perform this action';
    this.name = 'NoPermissionError';
  }
}
