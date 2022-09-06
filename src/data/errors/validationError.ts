export default class ValidationError extends Error {
  constructor() {
    super();
    this.message = 'Validation error. Check that the fields are correct.';
    this.name = 'ValidationError';
  }
}
