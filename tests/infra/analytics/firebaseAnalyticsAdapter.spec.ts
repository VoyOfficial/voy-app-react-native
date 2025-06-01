import analytics, {
  FirebaseAnalyticsTypes,
} from '@react-native-firebase/analytics';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';

jest.mock('@react-native-firebase/analytics', () => jest.fn());

describe('Analytics: FirebaseAnalyticsAdapter', () => {
  test('should track through the FirebaseAnalyticsAdapter the correct information', () => {
    const analyticsMocked = firebaseAnalyticsMock();
    const sut = new FirebaseAnalyticsAdapter();

    const eventName = 'event_name';
    const params = { param1: 'value1', param2: 'value2' };
    sut.trackEvent(eventName, params);

    expect(analyticsMocked.logEvent).toHaveBeenCalled();
    expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, params);
  });
});

const firebaseAnalyticsMock =
  (): jest.Mocked<FirebaseAnalyticsTypes.Module> => {
    const mockInstance: jest.Mocked<FirebaseAnalyticsTypes.Module> = {
      logEvent: jest.fn().mockResolvedValue(undefined),
      setUserId: jest.fn().mockResolvedValue(undefined),
      setUserProperties: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<FirebaseAnalyticsTypes.Module>;

    (analytics as unknown as jest.Mock).mockReturnValue(mockInstance);

    return mockInstance;
  };
