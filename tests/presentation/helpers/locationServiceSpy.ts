import { Coordinates, LocationService } from '~/domain/protocols';

export class LocationServiceSpy implements LocationService {
  getCurrentPositionCalled = 0;
  requestPermissionCalled = 0;
  shouldThrowError = false;
  customCoordinates?: Coordinates;

  async getCurrentPosition(): Promise<Coordinates> {
    this.getCurrentPositionCalled += 1;
    if (this.shouldThrowError) {
      throw new Error('Location permission denied');
    }
    return (
      this.customCoordinates || {
        latitude: -29.385436,
        longitude: -50.877608,
      }
    );
  }

  async requestPermission(): Promise<boolean> {
    this.requestPermissionCalled += 1;
    return true;
  }

  throwError(): void {
    this.shouldThrowError = true;
  }

  setCoordinates(latitude: number, longitude: number): void {
    this.customCoordinates = { latitude, longitude };
  }
}
