import { AxiosResponse } from 'axios';
import { HttpResponse } from '~/data/http';

export const toHttpResponse = (errorResponse: AxiosResponse) => {
  const httpErrorResponse = {
    statusCode: errorResponse?.status,
    body: errorResponse?.data,
  } as HttpResponse;

  return httpErrorResponse;
};
