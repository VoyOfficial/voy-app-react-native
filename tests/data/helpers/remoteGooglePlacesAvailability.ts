import axios from 'axios';
import {
  getRegistrationApiV1BaseUrl,
  isRemoteRegistrationApi,
} from './registrationApiBaseUrl';

let cached: boolean | null = null;

/**
 * Nearby/search/details on the Render host currently call Google Places.
 * When the backend key is invalid the API returns 403 "Request Denied Google Places".
 * Recommendations stay DB-backed and remain the remote smoke path.
 */
export const isRemoteGooglePlacesAvailable = async (): Promise<boolean> => {
  if (!isRemoteRegistrationApi()) {
    return true;
  }
  if (cached !== null) {
    return cached;
  }

  const url =
    `${getRegistrationApiV1BaseUrl()}/places` +
    '?latitude=-29.37855&longitude=-50.8744';

  try {
    const response = await axios.get(url, {
      timeout: 90000,
      validateStatus: () => true,
    });
    const denied =
      response.status === 403 &&
      String(response.data?.error || response.data?.message || '').includes(
        'Google Places',
      );
    cached = !denied;
  } catch {
    cached = false;
  }

  return cached;
};
