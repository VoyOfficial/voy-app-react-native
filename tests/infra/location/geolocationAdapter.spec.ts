import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GeolocationAdapter } from '~/infra/location';

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios),
}));

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
}));

jest.mock(
  'react-native/Libraries/PermissionsAndroid/PermissionsAndroid',
  () => ({
    PERMISSIONS: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
    },
    request: jest.fn(),
  }),
);

describe('Infra: GeolocationAdapter', () => {
  let sut: GeolocationAdapter;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = new GeolocationAdapter();
  });

  describe('requestPermission', () => {
    test('should return true on iOS without requesting permission', async () => {
      (Platform as any).OS = 'ios';

      const result = await sut.requestPermission();

      expect(result).toBe(true);
      expect(PermissionsAndroid.request).not.toHaveBeenCalled();
    });

    test('should request permission on Android and return true when granted', async () => {
      (Platform as any).OS = 'android';
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.GRANTED,
      );

      const result = await sut.requestPermission();

      expect(result).toBe(true);
      expect(PermissionsAndroid.request).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        expect.any(Object),
      );
    });

    test('should return false when Android permission is denied', async () => {
      (Platform as any).OS = 'android';
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.DENIED,
      );

      const result = await sut.requestPermission();

      expect(result).toBe(false);
    });

    test('should return false when Android permission request throws error', async () => {
      (Platform as any).OS = 'android';
      (PermissionsAndroid.request as jest.Mock).mockRejectedValue(
        new Error('Permission error'),
      );

      const result = await sut.requestPermission();

      expect(result).toBe(false);
    });
  });

  describe('getCurrentPosition', () => {
    test('should return coordinates when location is successfully retrieved', async () => {
      (Platform as any).OS = 'ios';
      (Geolocation.getCurrentPosition as jest.Mock).mockImplementation(
        (success) => {
          success({
            coords: {
              latitude: -29.385436,
              longitude: -50.877608,
            },
          });
        },
      );

      const result = await sut.getCurrentPosition();

      expect(result).toEqual({
        latitude: -29.385436,
        longitude: -50.877608,
      });
      expect(Geolocation.getCurrentPosition).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });

    test('should throw error when location permission is denied', async () => {
      (Platform as any).OS = 'android';
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        PermissionsAndroid.RESULTS.DENIED,
      );

      await expect(sut.getCurrentPosition()).rejects.toThrow(
        'Location permission denied',
      );
    });

    test('should throw error when geolocation fails', async () => {
      (Platform as any).OS = 'ios';
      (Geolocation.getCurrentPosition as jest.Mock).mockImplementation(
        (success, error) => {
          error({ message: 'Location unavailable' });
        },
      );

      await expect(sut.getCurrentPosition()).rejects.toThrow(
        'Location unavailable',
      );
    });
  });
});
