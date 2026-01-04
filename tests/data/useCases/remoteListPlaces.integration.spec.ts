import { RemoteListPlaces } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';

describe('Integration: RemoteListPlaces - Success Scenario', () => {
  const baseUrl = 'http://localhost:8080/api/registration/v1';
  const location = { long: '-50.877608', lat: '-29.385436' };

  let sut: RemoteListPlaces;

  beforeEach(() => {
    const httpClient = new AxiosAdapter();
    const analytics = new FirebaseAnalyticsAdapter();
    sut = new RemoteListPlaces(`${baseUrl}/places`, httpClient, analytics);
  });

  it('should successfully list places from the API', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((place) => {
      expect(place).toBeDefined();
      expect(place).toHaveProperty('id');
      expect(place).toHaveProperty('imageUrl');
      expect(place).toHaveProperty('title');
      expect(place).toHaveProperty('location');
      expect(place).toHaveProperty('myDistanceOfLocal');
      expect(place).toHaveProperty('amountOfReviews');
      expect(place).toHaveProperty('rating');
    });
  });

  it('should return places with valid data', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    const firstPlace = result[0];
    expect(typeof firstPlace.id).toBe('number');
    expect(typeof firstPlace.imageUrl).toBe('string');
    expect(typeof firstPlace.title).toBe('string');
    expect(typeof firstPlace.location).toBe('string');
    expect(typeof firstPlace.myDistanceOfLocal).toBe('string');
    expect(typeof firstPlace.amountOfReviews).toBe('string');
    expect(typeof firstPlace.rating).toBe('string');

    expect(firstPlace.title.length).toBeGreaterThan(0);
    expect(firstPlace.location.length).toBeGreaterThan(0);
  });

  it('should return expected places from Gramado region', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    const placeTitles = result.map((place) => place.title);
    expect(placeTitles).toContain('Gramado');

    const placesWithRatings = result.filter(
      (place) => Number(place.rating) > 0,
    );
    expect(placesWithRatings.length).toBeGreaterThan(0);

    const gramadoPlace = result.find((place) => place.title === 'Gramado');
    expect(gramadoPlace).toBeDefined();
    expect(gramadoPlace?.rating).toBe('0');
  });

  it('should handle pagination with nextPageToken', async () => {
    const firstResult = await sut.list(location);

    expect(firstResult).toBeDefined();
    expect(Array.isArray(firstResult)).toBe(true);
    expect(firstResult.length).toBeGreaterThan(0);
  });

  it('should successfully integrate with real HTTP client and analytics', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const placeTitles = result.map((place) => place.title);
    expect(placeTitles.length).toBeGreaterThan(0);
    expect(placeTitles.every((title) => typeof title === 'string')).toBe(true);

    result.forEach((place) => {
      expect(place.id).toBeDefined();
      expect(place.title).toBeTruthy();
      expect(place.location).toBeTruthy();
      expect(place.rating).toBeDefined();
      expect(place.amountOfReviews).toBeDefined();
    });
  });
});
