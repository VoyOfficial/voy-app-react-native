import { AxiosError } from 'axios';
import {
  AxiosAdapter,
  HttpMethods,
  unexpectedErrorResponse,
} from '~/infra/http';
import { HttpResponse } from '~/data/http';
import { httpRequestFake, httpResponseFake } from './fakes/testFakes';
import axiosMock from './mocks/axiosMock';
import { toHttpResponse } from './helpers/extensionFactories';

jest.mock('axios');

describe('Infra: AxiosAdapter', () => {
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
    const axiosResponse = await axiosMocked.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('should post through the axiosAdapter returning an error response', async () => {
    const { sut, axiosMocked } = makeSut();
    axiosMocked.request
      .mockClear()
      .mockRejectedValueOnce({ response: httpResponseFake() });

    let httpResponse = {} as HttpResponse;
    try {
      httpResponse = await post(sut);
      await axiosMocked.request.mock.results[0].value;
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      const errorResponse = (error as AxiosError).response!;
      const httpErrorResponse = toHttpResponse(errorResponse);
      expect(httpResponse).toEqual(httpErrorResponse);
    }
  });

  test('should post through the axiosAdapter returning an unexpected error response', async () => {
    const { sut, axiosMocked } = makeSut();
    axiosMocked.request
      .mockClear()
      .mockRejectedValueOnce(unexpectedErrorResponse);

    let httpResponse = {} as HttpResponse;
    try {
      httpResponse = await post(sut);
      await axiosMocked.request.mock.results[0].value;
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
