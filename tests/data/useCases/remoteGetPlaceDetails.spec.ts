import { faker } from '@faker-js/faker';
import { PlaceDetailsModel } from '~/domain/models';
import { GetPlaceDetails } from '~/domain/useCases';
import { HttpGetClient } from '~/data/http';
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
});

class RemoteGetPlaceDetails implements GetPlaceDetails {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  get = async (id: string): Promise<PlaceDetailsModel> => {
    this.httpGetClient.get({ url: `${this.url}?id=${id}` });
    return {
      amountOfReviews: '',
      businessHoursSummary: {
        sunday: {
          start: '',
          end: '',
        },
        monday: {
          start: '',
          end: '',
        },
        tuesday: {
          start: '',
          end: '',
        },
        wednesday: {
          start: '',
          end: '',
        },
        thursday: {
          start: '',
          end: '',
        },
        friday: {
          start: '',
          end: '',
        },
        saturday: {
          start: '',
          end: '',
        },
      },
      contact: '',
      description: '',
      distance: '',
      fullLocation: '',
      location: '',
      photoOfReviewProfiles: [''],
      rating: '',
      title: '',
    };
  };
}
