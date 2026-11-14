import Config from 'react-native-config';

export const DEFAULT_API_URL = 'http://localhost:8080/api/registration';

const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');

export const getApiUrl = (): string => {
  const fromProcess =
    typeof process !== 'undefined' ? process.env?.API_URL : undefined;
  const fromConfig = Config?.API_URL;
  const raw = fromProcess || fromConfig || DEFAULT_API_URL;
  return trimTrailingSlash(String(raw).trim());
};
