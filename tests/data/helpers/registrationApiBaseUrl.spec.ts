import fs from 'fs';
import path from 'path';
import {
  getRegistrationApiV1BaseUrl,
  isRemoteRegistrationApi,
  readProdRegistrationApiUrl,
} from './registrationApiBaseUrl';

describe('registration API base for integration tests', () => {
  const previousApiUrl = process.env.API_URL;
  const prodUrl = fs
    .readFileSync(path.resolve(__dirname, '../../../.env.prod'), 'utf8')
    .split(/\r?\n/)
    .map((row) => row.trim())
    .find((row) => row.startsWith('API_URL='))
    ?.slice('API_URL='.length)
    .trim();

  afterEach(() => {
    if (previousApiUrl === undefined) {
      delete process.env.API_URL;
    } else {
      process.env.API_URL = previousApiUrl;
    }
  });

  it('reads the env:prod package', () => {
    expect(readProdRegistrationApiUrl()).toBe(prodUrl);
    expect(prodUrl).toBe(
      'https://ms-registration.onrender.com/api/registration',
    );
  });

  it('points integration calls at env:prod even when API_URL is local', () => {
    process.env.API_URL = 'http://localhost:8080/api/registration';

    expect(getRegistrationApiV1BaseUrl()).toBe(`${prodUrl}/v1`);
    expect(process.env.API_URL).toBe(prodUrl);
    expect(isRemoteRegistrationApi()).toBe(true);
  });
});
