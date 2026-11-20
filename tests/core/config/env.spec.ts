import Config from 'react-native-config';
import {
  DEFAULT_API_URL,
  apiAuthorizationHeaders,
  apiEndpoints,
  getApiAccessToken,
  getApiUrl,
} from '~/core';

describe('Core: env / apiEndpoints', () => {
  const ORIGINAL_API_URL = process.env.API_URL;
  const ORIGINAL_API_ACCESS_TOKEN = process.env.API_ACCESS_TOKEN;

  afterEach(() => {
    if (ORIGINAL_API_URL === undefined) {
      delete process.env.API_URL;
    } else {
      process.env.API_URL = ORIGINAL_API_URL;
    }
    if (ORIGINAL_API_ACCESS_TOKEN === undefined) {
      delete process.env.API_ACCESS_TOKEN;
    } else {
      process.env.API_ACCESS_TOKEN = ORIGINAL_API_ACCESS_TOKEN;
    }
    delete (Config as { API_ACCESS_TOKEN?: string }).API_ACCESS_TOKEN;
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

  test('should build Authorization Bearer from API_ACCESS_TOKEN', () => {
    process.env.API_ACCESS_TOKEN = '  service-token  ';

    expect(getApiAccessToken()).toBe('service-token');
    expect(apiAuthorizationHeaders()).toEqual({
      Authorization: 'Bearer service-token',
    });
  });

  test('should omit Authorization when API_ACCESS_TOKEN is empty', () => {
    delete process.env.API_ACCESS_TOKEN;

    expect(getApiAccessToken()).toBe('');
    expect(apiAuthorizationHeaders()).toEqual({});
  });

  test('should read API_ACCESS_TOKEN from react-native-config', () => {
    delete process.env.API_ACCESS_TOKEN;
    (Config as { API_ACCESS_TOKEN?: string }).API_ACCESS_TOKEN = 'from-config';

    expect(getApiAccessToken()).toBe('from-config');
    expect(apiAuthorizationHeaders()).toEqual({
      Authorization: 'Bearer from-config',
    });
  });
});
