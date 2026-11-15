import fs from 'fs';
import path from 'path';
import { getApiUrl } from '~/core';

const prodEnvPath = path.resolve(__dirname, '../../../.env.prod');

export const readProdRegistrationApiUrl = (): string => {
  let text: string;
  try {
    text = fs.readFileSync(prodEnvPath, 'utf8');
  } catch (error) {
    throw new Error(
      `Integration tests require ${prodEnvPath} (env:prod): ${String(error)}`,
    );
  }

  const line = text
    .split(/\r?\n/)
    .map((row) => row.trim())
    .find((row) => row.startsWith('API_URL='));

  if (!line) {
    throw new Error(`API_URL missing in ${prodEnvPath}`);
  }

  const value = line
    .slice('API_URL='.length)
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/\/+$/, '');

  if (!value || /localhost|127\.0\.0\.1/i.test(value)) {
    throw new Error(
      `Integration tests must use the env:prod API_URL from ${prodEnvPath}`,
    );
  }

  return value;
};

export const getRegistrationApiBaseUrl = (): string => getApiUrl();

export const getRegistrationApiV1BaseUrl = (): string => {
  process.env.API_URL = readProdRegistrationApiUrl();
  return `${getApiUrl()}/v1`;
};

export const isRemoteRegistrationApi = (): boolean => {
  const base = getRegistrationApiBaseUrl();
  return /onrender\.com|https:\/\//i.test(base) && !/localhost/i.test(base);
};
