import axios from 'axios';
import { httpResponseFake } from '../fakes/testFakes';

const axiosMock = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(httpResponseFake());
  return mockedAxios;
};

export default axiosMock;
