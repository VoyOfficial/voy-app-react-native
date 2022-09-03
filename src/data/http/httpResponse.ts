import HttpStatusCode from './httpStatusCode';

type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export default HttpResponse;
