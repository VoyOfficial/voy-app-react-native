import { HttpStatusCode } from '~/data/http';
import { NoPermissionError, UnexpectedError } from '~/data/errors';
import { RemoteListRecommendations } from '~/data/useCases';
import { HttpClientSpy } from '../http/httpClientSpy';
import { makeUrl } from '../helpers/testFactories';
import { mockRemoteListPlace } from '../mocks/mockRemotePlaces';
import AnalyticsTrackerSpy from '../analytics/analyticsTrackerSpy';

describe('Data: ListRecommendations', () => {
  test('should list with httpGetClient calling correct url', () => {
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);
    sut.list();
    expect(httpClient.url).toEqual(url);
  });

  test('should return a list of recommendations if HttpGetClient returns ok', async () => {
    const httpResult = mockRemoteListPlace();
    const { sut, httpClient } = makeSut();
    httpClient.completeWithSuccess(HttpStatusCode.ok, httpResult);
    const listRecommendations = await sut.list();

    for (let index = 0; index < listRecommendations.length; index++) {
      expect(listRecommendations[index]).toEqual(httpResult[index]);
    }
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();
    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();
    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an empty list if HttpGetClient returns no content', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithNoContentError();
    const httpResult = await sut.list();

    expect(httpResult).toEqual([]);
  });

  test('should throw NoPermission exception if HttpClient return is forbidden status', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new NoPermissionError());
  });

  describe('Analytics', () => {
    test('should track the list recommendations event with correct parameters', async () => {
      const httpResult = mockRemoteListPlace();
      const { sut, httpClient, analytics } = makeSut();
      httpClient.completeWithSuccess(HttpStatusCode.ok, httpResult);

      await sut.list();

      expect(analytics.event).toBe('list_recommendations');
      expect(analytics.params).toEqual({
        recommendations_title: httpResult.map(
          (recommendation) => recommendation.title,
        ),
        recommendation_count: httpResult.length,
      });
    });
  });

  test('should track the list recommendations event with empty body', async () => {
    const { sut, httpClient, analytics } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: null,
    };

    await sut.list();

    expect(analytics.event).toBe('list_recommendations');
    expect(analytics.params).toEqual({
      recommendations_title: [],
      recommendation_count: 0,
    });
  });

  test.each([HttpStatusCode.noContent, HttpStatusCode.forbidden])(
    'should not track the list recommendations event when httpClient returns different of 200',
    async (statusCode) => {
      const { sut, httpClient, analytics } = makeSut();
      httpClient.response = {
        statusCode: statusCode,
        body: null,
      };

      if (statusCode === HttpStatusCode.forbidden)
        await expect(sut.list()).rejects.toThrow();

      expect(analytics.event).toBe('');
      expect(analytics.params).toEqual({});
    },
  );
});

const makeSut = (url = makeUrl()) => {
  const httpClient = new HttpClientSpy();
  const analytics = new AnalyticsTrackerSpy();
  const sut = new RemoteListRecommendations(url, httpClient, analytics);
  return { sut, httpClient, analytics };
};
