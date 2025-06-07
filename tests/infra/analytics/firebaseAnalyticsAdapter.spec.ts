import analytics, {
  FirebaseAnalyticsTypes,
} from '@react-native-firebase/analytics';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';

jest.mock('@react-native-firebase/analytics', () => jest.fn());

describe('Analytics: FirebaseAnalyticsAdapter', () => {
  test('should track through the FirebaseAnalyticsAdapter the correct information', async () => {
    const analyticsMocked = firebaseAnalyticsMock();
    const sut = new FirebaseAnalyticsAdapter();

    const eventName = 'event_name';
    const params = { param1: 'value1', param2: 'value2' };
    const status = await sut.trackEvent(eventName, params);

    expect(status).toEqual(true);
    expect(analyticsMocked.logEvent).toHaveBeenCalled();
    expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, params);
  });

  test('should try tracking through the FirebaseAnalyticsAdapter', async () => {
    const throwError = true;
    const analyticsMocked = firebaseAnalyticsMock(throwError);
    const sut = new FirebaseAnalyticsAdapter();

    const eventName = 'event_name';
    const params = { param1: 'value1', param2: 'value2' };

    const status = await sut.trackEvent(eventName, params);

    expect(status).toEqual(false);
    expect(analyticsMocked.logEvent).toHaveBeenCalled();
    expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, params);
  });
});

const firebaseAnalyticsMock = (
  throwError = false,
): jest.Mocked<FirebaseAnalyticsTypes.Module> => {
  const mockInstance: jest.Mocked<FirebaseAnalyticsTypes.Module> = {
    logEvent: jest.fn().mockImplementation(() => {
      if (throwError) {
        throw new Error('Firebase Analytics Error');
      }
      return Promise.resolve(true);
    }),
  } as unknown as jest.Mocked<FirebaseAnalyticsTypes.Module>;

  (analytics as unknown as jest.Mock).mockReturnValue(mockInstance);

  return mockInstance;
};
