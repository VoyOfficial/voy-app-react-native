import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  Coordinates,
  LocationService,
} from '~/domain/protocols/locationService';

export class GeolocationAdapter implements LocationService {
  async requestPermission(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Voy needs access to your location to find places near you',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  }

  async getCurrentPosition(): Promise<Coordinates> {
    const hasPermission = await this.requestPermission();

    if (!hasPermission) {
      throw new Error('Location permission denied');
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(error.message));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  }
}
