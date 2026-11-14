import axios from 'axios';
import { getRegistrationApiV1BaseUrl } from './registrationApiBaseUrl';

/** Same Gramado/Canela region used by list/search remote integration specs. */
const FIXTURE_COORDS = {
  latitude: '-29.37855',
  longitude: '-50.8744',
};

type ListedPlace = {
  googlePlaceId?: string;
};

/**
 * Nearby Search can return place ids that Place Details no longer resolves (404).
 * Resolve a fixture id by listing nearby places and taking the first whose
 * details endpoint returns 200 — keeps remote happy-path honest without soft-skip.
 */
export const resolveRemotePlaceDetailsId = async (): Promise<string> => {
  const baseUrl = getRegistrationApiV1BaseUrl();
  const listUrl =
    `${baseUrl}/places` +
    `?latitude=${FIXTURE_COORDS.latitude}&longitude=${FIXTURE_COORDS.longitude}`;

  const listResponse = await axios.get(listUrl, {
    timeout: 90000,
    validateStatus: () => true,
  });

  if (listResponse.status < 200 || listResponse.status >= 300) {
    throw new Error(
      `Failed to list places for details fixture (HTTP ${listResponse.status})`,
    );
  }

  const places: ListedPlace[] = Array.isArray(listResponse.data?.places)
    ? listResponse.data.places
    : [];

  if (places.length === 0) {
    throw new Error('No places returned to resolve a details fixture id');
  }

  for (const place of places) {
    const id = place.googlePlaceId;
    if (!id || typeof id !== 'string') {
      continue;
    }

    const detailsResponse = await axios.get(
      `${baseUrl}/places/${encodeURIComponent(id)}`,
      {
        timeout: 90000,
        validateStatus: () => true,
      },
    );

    if (detailsResponse.status === 200) {
      return id;
    }
  }

  throw new Error(
    'No listed place returned details successfully (all candidates 404/error)',
  );
};
