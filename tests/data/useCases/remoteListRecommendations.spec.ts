import { RecommendationModel } from '~/domain/models';
import { ListRecommendations } from '~/domain/useCases';
import { HttpGetClient } from '~/data/http';
import { HttpClientSpy } from '../http/httpClientSpy';
import { makeUrl } from '../helpers/testFactories';

describe('Data: ListRecommendations', () => {
  test('should list with httpGetClient calling correct url', () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    const sut = new RemoteListRecommendations(url, httpClient);
    sut.list();
    expect(httpClient.url).toEqual(url);
  });
});

class RemoteListRecommendations implements ListRecommendations {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  async list(): Promise<RecommendationModel[]> {
    await this.httpGetClient.get({ url: this.url });
    throw new Error('');
  }
}
