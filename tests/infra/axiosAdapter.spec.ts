import axios, { AxiosError, AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';
import {
  HttpPostClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '~/data/http';

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

  test('should request through the axiosAdapter returning the correct response', async () => {
    const sut = new AxiosAdapter();

    const data = {
      url: faker.internet.url(),
      body: faker.datatype.json(),
      headers: faker.datatype.json(),
    };

    const axiosMocked = mockAxios();

    const httpResponse = await sut.post(data);
    const axiosResponse = await axiosMocked.request.mock.results[0].value;
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('should request through the axiosAdapter returning an error response', async () => {
    const sut = new AxiosAdapter();

    const data = {
      url: faker.internet.url(),
      body: faker.datatype.json(),
      headers: faker.datatype.json(),
    };

    const axiosMocked = mockAxios();
    axiosMocked.request
      .mockClear()
      .mockRejectedValueOnce({ response: mockHttpResponse() });

    let httpResponse;
    try {
      httpResponse = await sut.post(data);
      await axiosMocked.request.mock.results[0].value;
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      const httpErrorResponse = {
        statusCode: errorResponse?.status,
        body: errorResponse?.data,
      } as HttpResponse;
      expect(httpResponse).toEqual(httpErrorResponse);
    }
  });

  test('should request through the axiosAdapter returning an unexpected error response', async () => {
    const sut = new AxiosAdapter();

    const data = {
      url: faker.internet.url(),
      body: faker.datatype.json(),
      headers: faker.datatype.json(),
    };

    const axiosMocked = mockAxios();
    axiosMocked.request
      .mockClear()
      .mockRejectedValueOnce(unexpectedErrorResponse);

    let httpResponse;
    try {
      httpResponse = await sut.post(data);
      await axiosMocked.request.mock.results[0].value;
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = error as typeof unexpectedErrorResponse;
      const httpErrorResponse = {
        statusCode: errorResponse?.status,
        body: errorResponse?.data,
      } as HttpResponse;
      expect(httpResponse).toEqual(httpErrorResponse);
    }
  });
});

enum HttpMethods {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
  put = 'PUT',
}

const unexpectedErrorResponse = {
  data: null,
  status: HttpStatusCode.unauthorized,
  statusText: 'Unexpected error',
  headers: {},
  config: {},
};

type HttpRequestMethod<T> = Partial<T> & { method: HttpMethods };

class AxiosAdapter implements HttpPostClient {
  private async request(
    data: HttpRequestMethod<HttpRequest>,
  ): Promise<HttpResponse<any>> {
    let axiosResponse = {} as AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        headers: data.headers,
        data: data.body,
        method: data.method,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        axiosResponse = axiosError.response;
      } else {
        axiosResponse = unexpectedErrorResponse;
      }
    } finally {
      return { statusCode: axiosResponse.status, body: axiosResponse.data };
    }
  }
  async post(data: HttpRequest): Promise<HttpResponse<any>> {
    const response = await this.request({
      method: HttpMethods.post,
      body: data.body,
      headers: data.headers,
      url: data.url,
    });

    return { statusCode: response.statusCode, body: response.body };
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
