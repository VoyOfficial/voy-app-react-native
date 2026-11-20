import { AxiosError, AxiosStatic } from 'axios';
import {
  AxiosAdapter,
  HttpMethods,
  unexpectedErrorResponse,
} from '~/infra/http';
import { HttpRequest, HttpResponse } from '~/data/http';
import axiosMock from '../mocks/axiosMock';
import { httpRequestFake, httpResponseFake } from '../fakes/testFakes';
import { toHttpResponse } from '../helpers/extensionFactories';

jest.mock('axios');

describe('Infra: AxiosAdapter', () => {
  const originalAccessToken = process.env.API_ACCESS_TOKEN;

  afterEach(() => {
    if (originalAccessToken === undefined) {
      delete process.env.API_ACCESS_TOKEN;
    } else {
      process.env.API_ACCESS_TOKEN = originalAccessToken;
    }
  });

  test('should post through the axiosAdapter the correct information', async () => {
    const data = httpRequestFake();
    const { sut, axiosMocked } = makeSut();

    await post(sut, data);

    expect(axiosMocked.request).toHaveBeenCalledWith({
      url: data.url,
      data: data.body,
      headers: data.headers,
      method: HttpMethods.post,
    });
  });

  test('should post through the axiosAdapter returning the correct response', async () => {
    const { sut, axiosMocked } = makeSut();

    const httpResponse = await post(sut);
    const axiosResponse = await requestAxiosMocked(axiosMocked);

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('should post through the axiosAdapter returning an error response', async () => {
    const { sut, axiosMocked } = makeSut();
    axiosMockRejectWith(axiosMocked, { response: httpResponseFake() });

    let httpResponse = {} as HttpResponse;
    try {
      httpResponse = await post(sut);
      await requestAxiosMocked(axiosMocked);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = (error as AxiosError).response!;
      const httpErrorResponse = toHttpResponse(errorResponse);
      expect(httpResponse).toEqual(httpErrorResponse);
    }
  });

  test('should post through the axiosAdapter returning an unexpected error response', async () => {
    const { sut, axiosMocked } = makeSut();
    axiosMockRejectWith(axiosMocked, unexpectedErrorResponse);

    let httpResponse = {} as HttpResponse;
    try {
      httpResponse = await post(sut);
      await requestAxiosMocked(axiosMocked);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = error as typeof unexpectedErrorResponse;
      const httpErrorResponse = toHttpResponse(errorResponse);
      expect(httpResponse).toEqual(httpErrorResponse);
    }
  });

  test('should get through the axiosAdapter the correct information', async () => {
    const data = httpRequestFake();
    const { sut, axiosMocked } = makeSut();

    await get(sut, data);

    expect(axiosMocked.request).toHaveBeenCalledWith({
      url: data.url,
      data: data.body,
      headers: data.headers,
      method: HttpMethods.get,
    });
  });

  test('should get through the axiosAdapter returning the correct response', async () => {
    const { sut, axiosMocked } = makeSut();

    const httpResponse = await get(sut);
    const axiosResponse = await requestAxiosMocked(axiosMocked);

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('should get through the axiosAdapter returning an error response', async () => {
    const { sut, axiosMocked } = makeSut();
    axiosMockRejectWith(axiosMocked, { response: httpResponseFake() });

    let httpResponse = {} as HttpResponse;
    try {
      httpResponse = await get(sut);
      await requestAxiosMocked(axiosMocked);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = (error as AxiosError).response!;
      const httpErrorResponse = toHttpResponse(errorResponse);
      expect(httpResponse).toEqual(httpErrorResponse);
    }
  });

  test('should post Authorization Bearer from API_ACCESS_TOKEN', async () => {
    process.env.API_ACCESS_TOKEN = 'service-token';
    const data: HttpRequest = {
      ...httpRequestFake(),
      headers: { Accept: 'application/json', Authorization: 'Bearer other' },
    };
    const { sut, axiosMocked } = makeSut();

    await sut.post(data);

    expect(axiosMocked.request).toHaveBeenCalledWith({
      url: data.url,
      data: data.body,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer service-token',
      },
      method: HttpMethods.post,
    });
  });

  test('should get Authorization Bearer from API_ACCESS_TOKEN', async () => {
    process.env.API_ACCESS_TOKEN = 'service-token';
    const data: HttpRequest = {
      ...httpRequestFake(),
      headers: { Accept: 'application/json' },
    };
    const { sut, axiosMocked } = makeSut();

    await sut.get(data);

    expect(axiosMocked.request).toHaveBeenCalledWith({
      url: data.url,
      data: data.body,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer service-token',
      },
      method: HttpMethods.get,
    });
  });

  test('should get through the axiosAdapter returning an unexpected error response', async () => {
    const { sut, axiosMocked } = makeSut();
    axiosMockRejectWith(axiosMocked, unexpectedErrorResponse);

    let httpResponse = {} as HttpResponse;
    try {
      httpResponse = await get(sut);
      await requestAxiosMocked(axiosMocked);
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = error as typeof unexpectedErrorResponse;
      const httpErrorResponse = toHttpResponse(errorResponse);
      expect(httpResponse).toEqual(httpErrorResponse);
    }
  });
});

const post = async (sut: AxiosAdapter, data = httpRequestFake()) => {
  return await sut.post(data);
};

const get = async (sut: AxiosAdapter, data = httpRequestFake()) => {
  return await sut.get(data);
};

const makeSut = () => {
  const axiosMocked = axiosMock();
  const sut = new AxiosAdapter();
  return { sut, axiosMocked };
};

const axiosMockRejectWith = (
  axiosMocked: jest.Mocked<AxiosStatic>,
  responseReject: any,
) => {
  axiosMocked.request.mockClear().mockRejectedValueOnce(responseReject);
};

const requestAxiosMocked = async (axiosMocked: jest.Mocked<AxiosStatic>) => {
  return await axiosMocked.request.mock.results[0].value;
};
