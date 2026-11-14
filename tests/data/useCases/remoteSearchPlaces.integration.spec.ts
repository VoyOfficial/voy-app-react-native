import { Filter, Ordination } from '~/domain/enums';
import { RemoteSearchPlaces } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { getRegistrationApiV1BaseUrl } from '../helpers/registrationApiBaseUrl';
import { requireRemoteGooglePlaces } from '../helpers/remoteGooglePlacesAvailability';
import { warmupRegistrationApi } from '../helpers/warmupRegistrationApi';

describe('Integration: RemoteSearchPlaces - Success Scenario', () => {
  const baseUrl = getRegistrationApiV1BaseUrl();
  const location = { long: '-50.8744', lat: '-29.37855' };
  const filterParam = {
    types: [Filter.Entertainment],
    ordination: Ordination.Closer,
  };

  let sut: RemoteSearchPlaces;

  beforeAll(async () => {
    await warmupRegistrationApi();
    await requireRemoteGooglePlaces();
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
