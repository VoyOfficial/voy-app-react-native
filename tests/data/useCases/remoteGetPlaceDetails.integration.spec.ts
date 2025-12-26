import { RemoteGetPlaceDetails } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';

describe('Integration: RemoteGetPlaceDetails - Success Scenario', () => {
  const baseUrl = 'http://localhost:8080/api/registration/v1';
  const placeId = 'ChIJf0SW_OYMGZURlwX0Aam0pB8';

  let sut: RemoteGetPlaceDetails;

  beforeEach(() => {
    const httpClient = new AxiosAdapter();
    const analytics = new FirebaseAnalyticsAdapter();
    sut = new RemoteGetPlaceDetails(`${baseUrl}/places`, httpClient, analytics);
  });

  it('should successfully get place details from the API', async () => {
    const result = await sut.get(placeId);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('location');
    expect(result).toHaveProperty('distance');
    expect(result).toHaveProperty('amountOfReviews');
    expect(result).toHaveProperty('rating');
    expect(result).toHaveProperty('businessHoursSummary');
    expect(result).toHaveProperty('fullLocation');
    expect(result).toHaveProperty('contact');
    expect(result).toHaveProperty('photoOfReviewProfiles');
    expect(result).toHaveProperty('gallerySummaryImages');
  });

  it('should return place details with valid data types', async () => {
    const result = await sut.get(placeId);

    expect(result).toBeDefined();
    expect(typeof result.title).toBe('string');
    expect(typeof result.description).toBe('string');
    expect(typeof result.location).toBe('string');
    expect(typeof result.distance).toBe('string');
    expect(typeof result.amountOfReviews).toBe('string');
    expect(typeof result.rating).toBe('string');
    expect(typeof result.businessHoursSummary).toBe('object');
    expect(typeof result.fullLocation).toBe('string');
    expect(typeof result.contact).toBe('string');
    expect(Array.isArray(result.photoOfReviewProfiles)).toBe(true);
    expect(Array.isArray(result.gallerySummaryImages)).toBe(true);
  });

  it('should return place details with non-empty required fields', async () => {
    const result = await sut.get(placeId);

    expect(result).toBeDefined();
    expect(result.title.length).toBeGreaterThan(0);
    expect(result.location.length).toBeGreaterThan(0);
    expect(result.fullLocation.length).toBeGreaterThan(0);
  });

  it('should return business hours summary with valid structure', async () => {
    const result = await sut.get(placeId);

    expect(result).toBeDefined();
    expect(result.businessHoursSummary).toBeDefined();
    expect(typeof result.businessHoursSummary).toBe('object');
  });

  it('should return photo profiles as an array', async () => {
    const result = await sut.get(placeId);

    expect(result).toBeDefined();
    expect(Array.isArray(result.photoOfReviewProfiles)).toBe(true);
    result.photoOfReviewProfiles.forEach((photo) => {
      expect(typeof photo).toBe('string');
    });
  });

  it('should successfully integrate with real HTTP client and analytics', async () => {
    const result = await sut.get(placeId);

    expect(result).toBeDefined();
    expect(result.title).toBeTruthy();
    expect(result.location).toBeTruthy();
    expect(result.fullLocation).toBeTruthy();
    expect(result.rating).toBeDefined();
    expect(result.amountOfReviews).toBeDefined();
    expect(result.distance).toBeDefined();
  });

  it('should return valid contact information', async () => {
    const result = await sut.get(placeId);

    expect(result).toBeDefined();
    expect(typeof result.contact).toBe('string');
  });
});
