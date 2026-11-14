import { RemoteListRecommendations } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { getRegistrationApiV1BaseUrl } from '../helpers/registrationApiBaseUrl';
import { warmupRegistrationApi } from '../helpers/warmupRegistrationApi';

describe('Integration: RemoteListRecommendations - Success Scenario', () => {
  const baseUrl = getRegistrationApiV1BaseUrl();
  const location = { long: '-50.8744', lat: '-29.37855' };

  let sut: RemoteListRecommendations;

  beforeAll(async () => {
    await warmupRegistrationApi();
  }, 180000);

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
    expect(typeof firstRecommendation.id).toBe('string');
    expect(typeof firstRecommendation.imageUrl).toBe('string');
    expect(typeof firstRecommendation.title).toBe('string');
    expect(typeof firstRecommendation.location).toBe('string');
    expect(typeof firstRecommendation.myDistanceOfLocal).toBe('string');
    expect(typeof firstRecommendation.rating).toBe('string');

    expect(firstRecommendation.title.length).toBeGreaterThan(0);
    expect(firstRecommendation.location.length).toBeGreaterThan(0);
  });

  it('should return expected recommendations from Gramado/Canela region', async () => {
    const result = await sut.list(location);

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    const recommendationTitles = result.map((rec) => rec.title);
    expect(recommendationTitles).toContain('Fonte do Amor Eterno');

    const fonte = result.find((rec) => rec.title === 'Fonte do Amor Eterno');
    expect(fonte).toBeDefined();
    expect(fonte?.location).toContain('Gramado');
  });
});
