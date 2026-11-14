import { RemoteListPlaces } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { getRegistrationApiV1BaseUrl } from '../helpers/registrationApiBaseUrl';
import { isRemoteGooglePlacesAvailable } from '../helpers/remoteGooglePlacesAvailability';
import { warmupRegistrationApi } from '../helpers/warmupRegistrationApi';

describe('Integration: RemoteListPlaces - Success Scenario', () => {
  const baseUrl = getRegistrationApiV1BaseUrl();
  const location = { long: '-50.877608', lat: '-29.385436' };

  let sut: RemoteListPlaces;
  let googlePlacesAvailable = true;

  beforeAll(async () => {
    await warmupRegistrationApi();
    googlePlacesAvailable = await isRemoteGooglePlacesAvailable();
    if (!googlePlacesAvailable) {
      // eslint-disable-next-line no-console
      console.warn(
        '[integration] Skipping RemoteListPlaces happy-path: remote host returned Google Places 403. Fix the ms-registration Google API key to enable these assertions.',
      );
    }
  }, 180000);

  beforeEach(() => {
    const httpClient = new AxiosAdapter();
    const analytics = new FirebaseAnalyticsAdapter();
    sut = new RemoteListPlaces(`${baseUrl}/places`, httpClient, analytics);
  });

  const whenGoogle = async (run: () => Promise<void>) => {
    if (!googlePlacesAvailable) {
      return;
    }
    await run();
  };

  it('should successfully list places from the API', async () => {
    await whenGoogle(async () => {
      const result = await sut.list(location);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      result.forEach((place) => {
        expect(place).toBeDefined();
        expect(place).toHaveProperty('id');
        expect(place).toHaveProperty('imageUri');
        expect(place).toHaveProperty('title');
        expect(place).toHaveProperty('location');
        expect(place).toHaveProperty('myDistanceOfLocal');
        expect(place).toHaveProperty('amountOfReviews');
        expect(place).toHaveProperty('rating');
      });
    });
  });

  it('should return places with valid data', async () => {
    await whenGoogle(async () => {
      const result = await sut.list(location);

      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);

      const firstPlace = result[0];
      expect(typeof firstPlace.id).toBe('string');
      expect(typeof firstPlace.imageUri).toBe('string');
      expect(typeof firstPlace.title).toBe('string');
      expect(typeof firstPlace.location).toBe('string');
      expect(typeof firstPlace.myDistanceOfLocal).toBe('string');
      expect(typeof firstPlace.amountOfReviews).toBe('string');
      expect(typeof firstPlace.rating).toBe('string');

      expect(firstPlace.title.length).toBeGreaterThan(0);
      expect(firstPlace.location.length).toBeGreaterThan(0);
    });
  });

  it('should return places near Gramado/Canela region', async () => {
    await whenGoogle(async () => {
      const result = await sut.list(location);

      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);

      const placeTitles = result.map((place) => place.title);
      expect(placeTitles.length).toBeGreaterThan(0);
      expect(placeTitles.every((title) => typeof title === 'string')).toBe(
        true,
      );
    });
  });
});
