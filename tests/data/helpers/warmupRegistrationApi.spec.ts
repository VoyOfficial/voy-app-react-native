import axios, { AxiosError } from 'axios';
import { warmupRegistrationApi } from './warmupRegistrationApi';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('warmupRegistrationApi', () => {
  const previousApiUrl = process.env.API_URL;
  const previousAccessToken = process.env.API_ACCESS_TOKEN;

  beforeEach(() => {
    process.env.API_URL =
      'https://ms-registration.onrender.com/api/registration';
    mockedAxios.isAxiosError.mockImplementation((error): error is AxiosError =>
      Boolean((error as { isAxiosError?: boolean } | null)?.isAxiosError),
    );
  });

  afterEach(() => {
    if (previousApiUrl === undefined) {
      delete process.env.API_URL;
    } else {
      process.env.API_URL = previousApiUrl;
    }
    if (previousAccessToken === undefined) {
      delete process.env.API_ACCESS_TOKEN;
    } else {
      process.env.API_ACCESS_TOKEN = previousAccessToken;
    }
    jest.clearAllMocks();
  });

  it('should send Authorization Bearer and stop on 401', async () => {
    process.env.API_ACCESS_TOKEN = 'service-token';
    mockedAxios.get.mockRejectedValue({
      isAxiosError: true,
      response: { status: 401 },
    });

    await expect(warmupRegistrationApi()).rejects.toThrow(/API_ACCESS_TOKEN/);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/places/recommendations'),
      expect.objectContaining({
        headers: { Authorization: 'Bearer service-token' },
      }),
    );
  });
});
