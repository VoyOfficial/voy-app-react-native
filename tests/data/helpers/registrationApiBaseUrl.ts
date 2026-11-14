const DEFAULT_BASE = 'http://localhost:8080/api/registration';

export const getRegistrationApiBaseUrl = (): string => {
  const raw = process.env.API_URL || DEFAULT_BASE;
  return raw.replace(/\/+$/, '');
};

export const getRegistrationApiV1BaseUrl = (): string =>
  `${getRegistrationApiBaseUrl()}/v1`;

export const isRemoteRegistrationApi = (): boolean => {
  const base = getRegistrationApiBaseUrl();
  return /onrender\.com|https:\/\//i.test(base) && !/localhost/i.test(base);
};
