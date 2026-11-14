import { faker } from '@faker-js/faker';
import { mockApiListPlaces } from '../mocks/mockApiPlaces';

/** NearbyPlacesResponse body used by RemoteSearchPlaces mapping tests */
const searchPlacesModelFactory = (count = 1) => ({
  places: mockApiListPlaces(count).map((place) => ({
    ...place,
    isSaved: faker.datatype.boolean(),
    distanceFromUserLocation: `${faker.datatype.float({
      min: 0.1,
      max: 10,
      precision: 0.1,
    })} km`,
  })),
});

export default searchPlacesModelFactory;
