import { RemoteListRecommendations } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';

describe('Integration: RemoteListRecommendations - Success Scenario', () => {
  const baseUrl = 'http://localhost:8080/api/registration/v1';
  const location = { long: '-50.877608', lat: '-29.385436' };

  let sut: RemoteListRecommendations;

  beforeEach(() => {
    const httpClient = new AxiosAdapter();
    const analytics = new FirebaseAnalyticsAdapter();
    sut = new RemoteListRecommendations(
      `${baseUrl}/places/recommendations`,
      httpClient,
      analytics,
    );
  });

  it('should successfully list recommendations from the API', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((recommendation) => {
      expect(recommendation).toBeDefined();
      expect(recommendation).toHaveProperty('id');
      expect(recommendation).toHaveProperty('imageUrl');
      expect(recommendation).toHaveProperty('title');
      expect(recommendation).toHaveProperty('location');
      expect(recommendation).toHaveProperty('myDistanceOfLocal');
      expect(recommendation).toHaveProperty('rating');
    });
  });

  it('should return recommendations with valid data', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    const firstRecommendation = result[0];
    expect(typeof firstRecommendation.id).toBe('number');
    expect(typeof firstRecommendation.imageUrl).toBe('string');
    expect(typeof firstRecommendation.title).toBe('string');
    expect(typeof firstRecommendation.location).toBe('string');
    expect(typeof firstRecommendation.myDistanceOfLocal).toBe('string');
    expect(typeof firstRecommendation.rating).toBe('string');

    expect(firstRecommendation.title.length).toBeGreaterThan(0);
    expect(firstRecommendation.location.length).toBeGreaterThan(0);
  });

  it('should return expected recommendations from Gramado region', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    const recommendationTitles = result.map((rec) => rec.title);
    expect(recommendationTitles).toContain('Lago Negro');
    expect(recommendationTitles).toContain('Fonte do Amor Eterno');

    const lagoNegroRec = result.find((rec) => rec.title === 'Lago Negro');
    expect(lagoNegroRec).toBeDefined();
    expect(lagoNegroRec?.location).toContain('Gramado');
    expect(lagoNegroRec?.myDistanceOfLocal).toContain('km');
  });

  it('should successfully integrate with real HTTP client and analytics', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const recommendationTitles = result.map((rec) => rec.title);
    expect(recommendationTitles.length).toBeGreaterThan(0);
    expect(
      recommendationTitles.every((title) => typeof title === 'string'),
    ).toBe(true);

    result.forEach((recommendation) => {
      expect(recommendation.id).toBeDefined();
      expect(recommendation.title).toBeTruthy();
      expect(recommendation.location).toBeTruthy();
      expect(recommendation.rating).toBeDefined();
      expect(recommendation.myDistanceOfLocal).toBeDefined();
    });
  });
});
