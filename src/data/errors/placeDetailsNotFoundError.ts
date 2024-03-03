export default class PlaceDetailsNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Place details not found. try again later.';
    this.name = 'PlaceDetailsNotFoundError';
  }
}
