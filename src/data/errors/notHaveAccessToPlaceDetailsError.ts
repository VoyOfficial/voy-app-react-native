export default class NotHaveAccessToPlaceDetailsError extends Error {
  constructor() {
    super();
    this.message =
      "You don't have access to Place details. Please try again later.";
    this.name = 'NotHaveAccessToPlaceDetailsError';
  }
}
