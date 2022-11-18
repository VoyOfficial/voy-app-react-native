import {
  HttpGetClient,
  HttpPostClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '~/data/http';
import { UserModel } from '~/domain/models';

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

  async get(data: HttpRequest): Promise<HttpResponse<UserModel>> {
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

  completeWithSuccess(body?: any) {
    this.response = { statusCode: HttpStatusCode.created, body };
  }

  completeWithUserNotFound() {
    this.response = {
      statusCode: HttpStatusCode.notFound,
      body: null,
    };
  }
}
