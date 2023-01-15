import {
  HttpGetClient,
  HttpPostClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '~/data/http';

export class HttpClientSpy implements HttpPostClient, HttpGetClient {
  userId = '';
  url = '';
  body: any;
  response: HttpResponse<any> = { statusCode: HttpStatusCode.ok, body: {} };
  async post(data: HttpRequest): Promise<HttpResponse<any>> {
    this.url = data.url;
    this.body = data.body;
    return this.response;
  }

  async get(data: HttpRequest): Promise<HttpResponse<any>> {
    const urlArray = data.url.split('/');
    this.userId = urlArray[urlArray.length - 1];
    this.url = data.url;
    return this.response;
  }

  completeWithUnexpectedError() {
    this.response.statusCode = HttpStatusCode.internalServerError;
  }

  completeWithForbiddenError() {
    this.response.statusCode = HttpStatusCode.forbidden;
  }

  completeWithSuccess(
    statusCode:
      | HttpStatusCode.ok
      | HttpStatusCode.created = HttpStatusCode.created,
    body?: any,
  ) {
    this.response = { statusCode: statusCode, body };
  }

  completeWithUserNotFound() {
    this.response = {
      statusCode: HttpStatusCode.notFound,
      body: null,
    };
  }
}
