export type Coordinates = {
  latitude: number;
  longitude: number;
};

export interface LocationService {
  getCurrentPosition: () => Promise<Coordinates>;
  requestPermission: () => Promise<boolean>;
}
