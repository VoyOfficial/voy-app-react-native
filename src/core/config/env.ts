import Config from 'react-native-config';

export const DEFAULT_API_URL = 'http://localhost:8080/api/registration';

const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');

const readEnv = (key: 'API_URL' | 'API_ACCESS_TOKEN'): string | undefined => {
  const fromProcess =
    typeof process !== 'undefined' ? process.env?.[key] : undefined;
  const fromConfig = Config?.[key];
  const raw = fromProcess || fromConfig;
  if (raw === undefined || raw === null) {
    return undefined;
  }
  const value = String(raw).trim();
  return value || undefined;
};

export const getApiUrl = (): string => {
  const raw = readEnv('API_URL') || DEFAULT_API_URL;
  return trimTrailingSlash(raw);
};

export const getApiAccessToken = (): string =>
  readEnv('API_ACCESS_TOKEN') ?? '';

export const apiAuthorizationHeaders = (): Record<string, string> => {
  const token = getApiAccessToken();
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};
