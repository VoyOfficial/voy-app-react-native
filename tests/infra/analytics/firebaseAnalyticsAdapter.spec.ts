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

  describe('sanitize string parameters', () => {
    test('should sanitize string parameters by removing accents', async () => {
      const analyticsMocked = firebaseAnalyticsMock(false);
      const { sut } = makeSut();
      const paramsWithAccents = { location: 'São Paulo', city: 'México' };

      await sut.trackEvent(eventName, paramsWithAccents);

      expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, {
        location: 'sao-paulo',
        city: 'mexico',
      });
    });

    test('should sanitize string parameters by replacing spaces with dashes', async () => {
      const analyticsMocked = firebaseAnalyticsMock(false);
      const { sut } = makeSut();
      const paramsWithSpaces = {
        place: 'New York City',
        restaurant: 'Best Food Ever',
      };

      await sut.trackEvent(eventName, paramsWithSpaces);

      expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, {
        place: 'new-york-city',
        restaurant: 'best-food-ever',
      });
    });

    test('should sanitize string parameters by removing special characters', async () => {
      const analyticsMocked = firebaseAnalyticsMock(false);
      const { sut } = makeSut();
      const paramsWithSpecialChars = {
        name: 'Café & Restaurant!',
        address: 'Street #123, Apt. 4B',
      };

      await sut.trackEvent(eventName, paramsWithSpecialChars);

      expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, {
        name: 'cafe-restaurant',
        address: 'street-123-apt-4b',
      });
    });

    test('should sanitize string parameters with mixed accents, spaces, and special characters', async () => {
      const analyticsMocked = firebaseAnalyticsMock(false);
      const { sut } = makeSut();
      const complexParams = {
        venue: 'Café São José & Cia.!',
        description: 'Açaí & Açúcar - Loja #1',
      };

      await sut.trackEvent(eventName, complexParams);

      expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, {
        venue: 'cafe-sao-jose-cia',
        description: 'acai-acucar-loja-1',
      });
    });

    test('should sanitize array string parameters', async () => {
      const analyticsMocked = firebaseAnalyticsMock(false);
      const { sut } = makeSut();
      const paramsWithArray = ['São Paulo', 'New York!', 'Café & Co.'];

      await sut.trackEvent(eventName, paramsWithArray);

      expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, {
        places: 'sao-paulo, new-york, cafe-co',
      });
    });

    test('should sanitize nested array in object parameters', async () => {
      const analyticsMocked = firebaseAnalyticsMock(false);
      const { sut } = makeSut();
      const paramsWithNestedArray = {
        cities: ['São Paulo', 'México D.F.', 'New York!'],
        category: 'Café & Restaurant',
      };

      await sut.trackEvent(eventName, paramsWithNestedArray);

      expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, {
        cities: 'sao-paulo, mexico-df, new-york',
        category: 'cafe-restaurant',
      });
    });

    test('should not sanitize non-string parameters', async () => {
      const analyticsMocked = firebaseAnalyticsMock(false);
      const { sut } = makeSut();
      const mixedParams = {
        name: 'São Paulo!',
        count: 123,
        isActive: true,
        data: { nested: 'object' },
      };

      await sut.trackEvent(eventName, mixedParams);

      expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, {
        name: 'sao-paulo',
        count: 123,
        isActive: true,
        data: { nested: 'object' },
      });
    });

    test('should handle empty strings', async () => {
      const analyticsMocked = firebaseAnalyticsMock(false);
      const { sut } = makeSut();
      const paramsWithEmptyString = {
        name: '',
        description: '   ',
      };

      await sut.trackEvent(eventName, paramsWithEmptyString);

      expect(analyticsMocked.logEvent).toHaveBeenCalledWith(eventName, {
        name: '',
        description: '',
      });
    });
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
