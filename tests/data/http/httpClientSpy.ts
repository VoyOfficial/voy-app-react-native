import {
  HttpGetClient,
  HttpPostClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '~/data/http';

export class HttpPostClientSpy implements HttpPostClient {
  url = '';
  body: any;
  response: HttpResponse<any> = { statusCode: HttpStatusCode.ok, body: {} };
  async post(data: HttpRequest): Promise<HttpResponse<any>> {
    this.url = data.url;
    this.body = data.body;
    return this.response;
  }

  completeWithUnexpectedError() {
    this.response.statusCode = HttpStatusCode.internalServerError;
  }

  completeWithForbiddenError() {
    this.response.statusCode = HttpStatusCode.forbidden;
  }

  completeWithSuccess() {
    this.response = { statusCode: HttpStatusCode.created, body: {} };
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url?: string;
  async get(url: string): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}
