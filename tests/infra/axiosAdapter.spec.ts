import axios, { AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';
import { HttpPostClient, HttpRequest, HttpResponse } from '~/data/http';

jest.mock('axios');

describe('Infra: AxiosAdapter', () => {
  test('should request through the axiosAdapter the correct information', async () => {
    const sut = new AxiosAdapter();

    const data = {
      url: faker.internet.url(),
      body: faker.datatype.json(),
      headers: faker.datatype.json(),
    };

    const axiosMocked = mockAxios();

    await sut.post(data);
    expect(axiosMocked.request).toHaveBeenCalledWith({
      url: data.url,
      data: data.body,
      headers: data.headers,
      method: HttpMethods.post,
    });
  });
});

enum HttpMethods {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
  put = 'PUT',
}

type HttpRequestMethod<T> = Partial<T> & { method: HttpMethods };

class AxiosAdapter implements HttpPostClient {
  private async request(
    data: HttpRequestMethod<HttpRequest>,
  ): Promise<HttpResponse<any>> {
    await axios.request({
      url: data.url,
      headers: data.headers,
      data: data.body,
      method: data.method,
    });

    return { statusCode: 200, body: '' };
  }
  async post(data: HttpRequest): Promise<HttpResponse<any>> {
    return await this.request({
      method: HttpMethods.post,
      body: data.body,
      headers: data.headers,
      url: data.url,
    });
  }
}

const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};

const mockHttpResponse = (): AxiosResponse => ({
  data: faker.datatype.json(),
  status: faker.datatype.number(),
  statusText: faker.datatype.string(),
  headers: {},
  config: {},
});
