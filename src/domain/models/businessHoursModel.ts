type Interval = {
  start: string;
  end: string;
};
type BusinessHoursModel = {
  sunday: Interval;
  monday: Interval;
  tuesday: Interval;
  wednesday: Interval;
  thursday: Interval;
  friday: Interval;
  saturday: Interval;
};

export default BusinessHoursModel;
