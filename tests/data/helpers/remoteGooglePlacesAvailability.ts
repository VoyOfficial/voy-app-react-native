import axios from 'axios';
import {
  getRegistrationApiV1BaseUrl,
  isRemoteRegistrationApi,
} from './registrationApiBaseUrl';

const GOOGLE_PLACES_DENIED_MARKER = 'Google Places';

const isGooglePlacesDenied = (status: number, data: unknown): boolean => {
  if (status !== 403) {
    return false;
  }
  const payload = data as { error?: unknown; message?: unknown } | null;
  const text = String(payload?.error || payload?.message || '');
  return text.includes(GOOGLE_PLACES_DENIED_MARKER);
};

export const requireRemoteGooglePlaces = async (): Promise<void> => {
  if (!isRemoteRegistrationApi()) {
    return;
  }

  const url =
    `${getRegistrationApiV1BaseUrl()}/places` +
    '?latitude=-29.37855&longitude=-50.8744';

  let response;
  try {
    response = await axios.get(url, {
      timeout: 90000,
      validateStatus: () => true,
    });
  } catch (error) {
    throw new Error(
      `Remote Google Places probe failed (transport): ${String(error)}`,
    );
  }

  if (isGooglePlacesDenied(response.status, response.data)) {
    throw new Error(
      'Remote host returned 403 Request Denied Google Places. Fix the ms-registration Google API key; remote places/search/details must not soft-pass.',
    );
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `Remote Google Places probe returned HTTP ${response.status}`,
    );
  }
};
