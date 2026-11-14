import axios from 'axios';
import {
  getRegistrationApiV1BaseUrl,
  isRemoteRegistrationApi,
} from './registrationApiBaseUrl';

const WARMUP_COORDS = {
  latitude: '-29.37855',
  longitude: '-50.8744',
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const warmupRegistrationApi = async (): Promise<void> => {
  if (!isRemoteRegistrationApi()) {
    return;
  }

  const url =
    `${getRegistrationApiV1BaseUrl()}/places/recommendations` +
    `?latitude=${WARMUP_COORDS.latitude}&longitude=${WARMUP_COORDS.longitude}`;

  const attempts = 5;
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await axios.get(url, { timeout: 90000 });
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      lastError = new Error(`warmup status ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(Math.min(5000 * attempt, 20000));
  }

  throw new Error(
    `Registration API warmup failed after ${attempts} attempts: ${String(
      lastError,
    )}`,
  );
};
