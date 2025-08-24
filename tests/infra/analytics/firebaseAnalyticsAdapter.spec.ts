import analytics, {
  FirebaseAnalyticsTypes,
} from '@react-native-firebase/analytics';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';

jest.mock('@react-native-firebase/analytics', () => jest.fn());

describe('Analytics: FirebaseAnalyticsAdapter', () => {
  const eventName = 'event_name';
  const params = { param1: 'value1', param2: 'value2' };

  test('should track through the FirebaseAnalyticsAdapter the correct information', async () => {
    const analyticsMocked = firebaseAnalyticsMock(false);
    const { sut } = makeSut();

    const status = await sut.trackEvent(eventName, params);

    expect(status).toEqual(true);
    calledLogEvent(analyticsMocked, { eventName, params });
  });

  test('should track through the FirebaseAnalyticsAdapter the correct information when called with an array of strings', async () => {
    const analyticsMocked = firebaseAnalyticsMock(false);
    const { sut } = makeSut();

    const status = await sut.trackEvent(eventName, {
      places: ['value1', 'value2'],
    });

    expect(status).toEqual(true);
    calledLogEvent(analyticsMocked, {
      eventName,
      params: { places: 'value1, value2' },
    });
  });

  test('should try tracking through the FirebaseAnalyticsAdapter', async () => {
    const analyticsMocked = firebaseAnalyticsMock(true);
    const { sut } = makeSut();

    const status = await sut.trackEvent(eventName, params);

    expect(status).toEqual(false);
    calledLogEvent(analyticsMocked, { eventName, params });
  });
});

const makeSut = () => {
  const sut = new FirebaseAnalyticsAdapter();

  return { sut };
};

const calledLogEvent = (
  analyticsMocked: jest.Mocked<FirebaseAnalyticsTypes.Module>,
  params: {
    eventName: string;
    params: Record<string, any>;
  },
) => {
  expect(analyticsMocked.logEvent).toHaveBeenCalled();
  expect(analyticsMocked.logEvent).toHaveBeenCalledWith(
    params.eventName,
    params.params,
  );
};

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
