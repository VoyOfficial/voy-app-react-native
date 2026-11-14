import { RemoteGetPlaceDetails } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { getRegistrationApiV1BaseUrl } from '../helpers/registrationApiBaseUrl';
import { requireRemoteGooglePlaces } from '../helpers/remoteGooglePlacesAvailability';
import { resolveRemotePlaceDetailsId } from '../helpers/resolveRemotePlaceDetailsId';
import { warmupRegistrationApi } from '../helpers/warmupRegistrationApi';

describe('Integration: RemoteGetPlaceDetails - Success Scenario', () => {
  const baseUrl = getRegistrationApiV1BaseUrl();

  let sut: RemoteGetPlaceDetails;
  let placeId = '';

  beforeAll(async () => {
    await warmupRegistrationApi();
    await requireRemoteGooglePlaces();
    placeId = await resolveRemotePlaceDetailsId();
  }, 180000);

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
});
