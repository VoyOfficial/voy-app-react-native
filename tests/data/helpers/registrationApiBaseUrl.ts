import { getApiUrl } from '~/core';

export const getRegistrationApiBaseUrl = (): string => getApiUrl();

export const getRegistrationApiV1BaseUrl = (): string =>
  `${getRegistrationApiBaseUrl()}/v1`;

export const isRemoteRegistrationApi = (): boolean => {
  const base = getRegistrationApiBaseUrl();
  return /onrender\.com|https:\/\//i.test(base) && !/localhost/i.test(base);
};
