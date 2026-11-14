import axios from 'axios';
import { requireRemoteGooglePlaces } from './remoteGooglePlacesAvailability';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('requireRemoteGooglePlaces', () => {
  const previousApiUrl = process.env.API_URL;

  afterEach(() => {
    process.env.API_URL = previousApiUrl;
    jest.clearAllMocks();
  });

  it('should no-op for local registration API', async () => {
    process.env.API_URL = 'http://localhost:8080/api/registration';

    await expect(requireRemoteGooglePlaces()).resolves.toBeUndefined();
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('should fail when remote returns Google Places 403', async () => {
    process.env.API_URL =
      'https://ms-registration.onrender.com/api/registration';
    mockedAxios.get.mockResolvedValue({
      status: 403,
      data: { error: 'Request Denied Google Places' },
    });

    await expect(requireRemoteGooglePlaces()).rejects.toThrow(
      /Google Places|soft-pass/i,
    );
  });

  it('should fail on probe transport errors instead of soft-passing', async () => {
    process.env.API_URL =
      'https://ms-registration.onrender.com/api/registration';
    mockedAxios.get.mockRejectedValue(new Error('ECONNRESET'));

    await expect(requireRemoteGooglePlaces()).rejects.toThrow(/transport/i);
  });

  it('should pass when remote places probe returns 200', async () => {
    process.env.API_URL =
      'https://ms-registration.onrender.com/api/registration';
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: { places: [] },
    });

    await expect(requireRemoteGooglePlaces()).resolves.toBeUndefined();
  });
});
