import { DEFAULT_API_URL, apiEndpoints, getApiUrl } from '~/core';

describe('Core: env / apiEndpoints', () => {
  const ORIGINAL_API_URL = process.env.API_URL;

  afterEach(() => {
    if (ORIGINAL_API_URL === undefined) {
      delete process.env.API_URL;
    } else {
      process.env.API_URL = ORIGINAL_API_URL;
    }
  });

  test('should resolve local registration base by default', () => {
    delete process.env.API_URL;

    expect(getApiUrl()).toBe(DEFAULT_API_URL);
    expect(DEFAULT_API_URL).toBe('http://localhost:8080/api/registration');
    expect(apiEndpoints.places()).toBe(
      'http://localhost:8080/api/registration/v1/places',
    );
    expect(apiEndpoints.recommendations()).toBe(
      'http://localhost:8080/api/registration/v1/places/recommendations',
    );
    expect(apiEndpoints.search()).toBe(
      'http://localhost:8080/api/registration/v1/places/search',
    );
  });

  test('should resolve prod registration base from API_URL', () => {
    process.env.API_URL =
      'https://ms-registration.onrender.com/api/registration';

    expect(getApiUrl()).toBe(
      'https://ms-registration.onrender.com/api/registration',
    );
    expect(apiEndpoints.places()).toBe(
      'https://ms-registration.onrender.com/api/registration/v1/places',
    );
  });

  test('should strip trailing slash from API_URL', () => {
    process.env.API_URL = 'http://localhost:8080/api/registration/';

    expect(getApiUrl()).toBe('http://localhost:8080/api/registration');
  });
});
