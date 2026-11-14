import { Filter, Ordination } from '~/domain/enums';
import { RemoteSearchPlaces } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { getRegistrationApiV1BaseUrl } from '../helpers/registrationApiBaseUrl';
import { isRemoteGooglePlacesAvailable } from '../helpers/remoteGooglePlacesAvailability';
import { warmupRegistrationApi } from '../helpers/warmupRegistrationApi';

describe('Integration: RemoteSearchPlaces - Success Scenario', () => {
  const baseUrl = getRegistrationApiV1BaseUrl();
  const location = { long: '-50.8744', lat: '-29.37855' };
  const filterParam = {
    types: [Filter.Entertainment],
    ordination: Ordination.Closer,
  };

  let sut: RemoteSearchPlaces;
  let googlePlacesAvailable = true;

  beforeAll(async () => {
    await warmupRegistrationApi();
    googlePlacesAvailable = await isRemoteGooglePlacesAvailable();
    if (!googlePlacesAvailable) {
      // eslint-disable-next-line no-console
      console.warn(
        '[integration] Skipping RemoteSearchPlaces happy-path: remote host returned Google Places 403. Fix the ms-registration Google API key to enable these assertions.',
      );
    }
  }, 180000);

  beforeEach(() => {
    const httpClient = new AxiosAdapter();
    const analytics = new FirebaseAnalyticsAdapter();
    sut = new RemoteSearchPlaces(
      `${baseUrl}/places/search`,
      httpClient,
      analytics,
    );
  });

  it('should successfully search places from the API', async () => {
    if (!googlePlacesAvailable) {
      return;
    }

    const result = await sut.search('Gramado', filterParam, location);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((place) => {
      expect(place).toHaveProperty('id');
      expect(place).toHaveProperty('title');
      expect(place).toHaveProperty('location');
      expect(place).toHaveProperty('imageUri');
      expect(place).toHaveProperty('rating');
      expect(typeof place.id).toBe('string');
    });
  });
});
