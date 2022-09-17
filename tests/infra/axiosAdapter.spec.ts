import axios, { AxiosError, AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';
import {
  AxiosAdapter,
  HttpMethods,
  unexpectedErrorResponse,
} from '~/infra/http';
import { HttpResponse } from '~/data/http';

jest.mock('axios');

describe('Infra: AxiosAdapter', () => {
  test('should request through the axiosAdapter the correct information', async () => {
    const data = httpRequestFake();
    const { sut, axiosMocked } = makeSut();

    await sut.post(data);

    expect(axiosMocked.request).toHaveBeenCalledWith({
      url: data.url,
      data: data.body,
      headers: data.headers,
      method: HttpMethods.post,
    });
  });

  test('should request through the axiosAdapter returning the correct response', async () => {
    const data = httpRequestFake();
    const { sut, axiosMocked } = makeSut();

    const httpResponse = await sut.post(data);
    const axiosResponse = await axiosMocked.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('should request through the axiosAdapter returning an error response', async () => {
    const data = httpRequestFake();
    const { sut, axiosMocked } = makeSut();
    axiosMocked.request
      .mockClear()
      .mockRejectedValueOnce({ response: httpResponseFake() });

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
    const data = httpRequestFake();
    const { sut, axiosMocked } = makeSut();

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

const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(httpResponseFake());
  return mockedAxios;
};

const httpResponseFake = (): AxiosResponse => ({
  data: faker.datatype.json(),
  status: faker.datatype.number(),
  statusText: faker.datatype.string(),
  headers: {},
  config: {},
});

const httpRequestFake = () => {
  return {
    url: faker.internet.url(),
    body: faker.datatype.json(),
    headers: faker.datatype.json(),
  };
};

const makeSut = () => {
  const axiosMocked = mockAxios();
  const sut = new AxiosAdapter();
  return { sut, axiosMocked };
};
