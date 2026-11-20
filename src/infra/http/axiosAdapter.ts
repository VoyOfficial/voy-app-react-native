import axios, { AxiosError, AxiosResponse } from 'axios';
import { apiAuthorizationHeaders } from '~/core';
import {
  HttpGetClient,
  HttpPostClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '~/data/http';

export enum HttpMethods {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
  put = 'PUT',
}

export const unexpectedErrorResponse = {
  data: null,
  status: HttpStatusCode.unauthorized,
  statusText: 'Unexpected error',
  headers: {},
  config: {},
};

type HttpRequestMethod<T> = Partial<T> & { method: HttpMethods };

const isHeaderRecord = (headers: unknown): headers is Record<string, unknown> =>
  typeof headers === 'object' && headers !== null && !Array.isArray(headers);

const withApiAuthorization = (
  headers?: HttpRequest['headers'],
): HttpRequest['headers'] => {
  const authorization = apiAuthorizationHeaders();
  if (!authorization.Authorization) {
    return headers;
  }
  if (!isHeaderRecord(headers)) {
    return authorization;
  }
  return {
    ...headers,
    ...authorization,
  };
};

export class AxiosAdapter implements HttpPostClient, HttpGetClient {
  private async request(
    data: HttpRequestMethod<HttpRequest>,
  ): Promise<HttpResponse<any>> {
    let axiosResponse = {} as AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        headers: withApiAuthorization(data.headers),
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

  async get(data: HttpRequest): Promise<HttpResponse<any>> {
    const response = await this.request({
      method: HttpMethods.get,
      body: data.body,
      headers: data.headers,
      url: data.url,
    });

    return { statusCode: response.statusCode, body: response.body };
  }
}
