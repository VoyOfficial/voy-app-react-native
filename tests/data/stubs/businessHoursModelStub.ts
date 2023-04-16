import { BusinessHoursModel } from '~/domain/models';

const businessHoursModelStub = (): BusinessHoursModel => {
  return {
    monday: makeInterval(),
    friday: makeInterval(),
    saturday: makeInterval(),
    sunday: makeInterval(),
    thursday: makeInterval(),
    tuesday: makeInterval(),
    wednesday: makeInterval(),
  };
};

const makeInterval = () => {
  return { start: '10:00', end: '24:00' };
};

export default businessHoursModelStub;
