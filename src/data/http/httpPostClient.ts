import HttpRequest from './httpRequest';
import HttpResponse from './httpResponse';

export default interface HttpPostClient<R = any> {
  post(data: HttpRequest): Promise<HttpResponse<R>>;
}
