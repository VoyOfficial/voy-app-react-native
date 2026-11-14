import { getApiUrl } from './env';

const v1 = (): string => `${getApiUrl()}/v1`;

export const apiEndpoints = {
  places: (): string => `${v1()}/places`,
  recommendations: (): string => `${v1()}/places/recommendations`,
  search: (): string => `${v1()}/places/search`,
};
