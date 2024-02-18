import { faker } from '@faker-js/faker';
import { PlaceDetailsModel } from '~/domain/models';
import { GetPlaceDetails } from '~/domain/useCases';
import { HttpGetClient, HttpStatusCode } from '~/data/http';
import { makeUrl } from '../helpers/testFactories';
import { HttpClientSpy } from '../http/httpClientSpy';

describe('Data: RemoteGetPlaceDetails', () => {
  test('should get with httpGetClient calling correct url', () => {
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    const sut = new RemoteGetPlaceDetails(url, httpClient);

    const id = faker.datatype.uuid();
    sut.get(id);

    expect(httpClient.url).toEqual(`${url}?id=${id}`);
  });

  test('should get with httpGetClient returning the place details with success', async () => {
    const placeDetailsResponse = {
      title: faker.company.name(),
      amountOfReviews: faker.datatype.number().toString(),
      businessHoursSummary: {
        sunday: {
          start: '08:00',
          end: '12:00',
        },
        monday: {
          start: '08:00',
          end: '12:00',
        },
        tuesday: {
          start: '08:00',
          end: '12:00',
        },
        wednesday: {
          start: '08:00',
          end: '12:00',
        },
        thursday: {
          start: '08:00',
          end: '12:00',
        },
        friday: {
          start: '08:00',
          end: '12:00',
        },
        saturday: {
          start: '08:00',
          end: '12:00',
        },
      },
      contact: faker.phone.number(),
      description: faker.lorem.paragraph(),
      distance: faker.datatype.number().toString(),
      fullLocation: faker.address.streetAddress(),
      location: faker.address.cityName(),
      photoOfReviewProfiles: [faker.image.imageUrl()],
      rating: faker.datatype.number().toString(),
    };
    const url = makeUrl();
    const httpClient = new HttpClientSpy();
    httpClient.completeWithSuccess(HttpStatusCode.ok, placeDetailsResponse);

    const sut = new RemoteGetPlaceDetails(url, httpClient);

    const id = faker.datatype.uuid();
    const placeDetails = await sut.get(id);

    expect(placeDetails).toEqual(placeDetailsResponse);
  });
});

class RemoteGetPlaceDetails implements GetPlaceDetails {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  get = async (id: string): Promise<PlaceDetailsModel> => {
    const { statusCode, body } = await this.httpGetClient.get({
      url: `${this.url}?id=${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      default:
        throw new Error(`error`);
    }
  };
}
