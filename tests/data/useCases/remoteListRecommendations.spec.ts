import { HttpStatusCode } from '~/data/http';
import { NoPermissionError, UnexpectedError } from '~/data/errors';
import { RemoteListRecommendations } from '~/data/useCases';
import { HttpClientSpy } from '../http/httpClientSpy';
import { makeUrl } from '../helpers/testFactories';
import { mockApiListRecommendations } from '../mocks/mockApiRecommendations';
import AnalyticsTrackerSpy from '../analytics/analyticsTrackerSpy';

const location = { long: '-50.877608', lat: '-29.385436' };

describe('Data: ListRecommendations', () => {
  test('should list with httpGetClient calling correct url', () => {
    const url = makeUrl();
    const { sut, httpClient } = makeSut(url);
    sut.list(location);
    expect(httpClient.url).toEqual(
      url + '?latitude=' + location.lat + '&longitude=' + location.long,
    );
  });

  test('should return a list of recommendations if HttpGetClient returns ok', async () => {
    const apiRecommendations = mockApiListRecommendations(3);
    const { sut, httpClient } = makeSut();
    httpClient.completeWithSuccess(HttpStatusCode.ok, {
      data: apiRecommendations,
    });
    const listRecommendations = await sut.list(location);

    expect(listRecommendations.length).toBe(apiRecommendations.length);
    for (let index = 0; index < listRecommendations.length; index++) {
      expect(listRecommendations[index].id).toEqual(
        apiRecommendations[index].id,
      );
      expect(listRecommendations[index].title).toEqual(
        apiRecommendations[index].name,
      );
      expect(listRecommendations[index].location).toEqual(
        apiRecommendations[index].address,
      );
      expect(listRecommendations[index].myDistanceOfLocal).toEqual(
        apiRecommendations[index].distanceFromUserLocation,
      );
    }
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();
    const promise = sut.list(location);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithUnexpectedError();
    const promise = sut.list(location);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an empty list if HttpGetClient returns no content', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.completeWithNoContentError();
    const httpResult = await sut.list(location);

    expect(httpResult).toEqual([]);
  });

  test('should throw NoPermission exception if HttpClient return is forbidden status', async () => {
    const { sut, httpClient } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.list(location);

    await expect(promise).rejects.toThrow(new NoPermissionError());
  });

  describe('Analytics', () => {
    test('should track the list recommendations event with correct parameters', async () => {
      const apiRecommendations = mockApiListRecommendations(2);
      const { sut, httpClient, analytics } = makeSut();
      httpClient.completeWithSuccess(HttpStatusCode.ok, {
        data: apiRecommendations,
      });

      await sut.list(location);

      expect(analytics.event).toBe('list_recommendations');
      expect(analytics.params).toEqual({
        recommendations_title: apiRecommendations.map((rec) => rec.name),
        recommendation_count: apiRecommendations.length,
      });
    });
  });

  test('should track the list recommendations event with empty body', async () => {
    const { sut, httpClient, analytics } = makeSut();
    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: null,
    };

    await sut.list(location);

    expect(analytics.event).toBe('');
    expect(analytics.params).toEqual({});
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
        await expect(sut.list(location)).rejects.toThrow();

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
