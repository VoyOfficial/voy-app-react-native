import { AnalyticsTracker } from '~/domain/analytics';

export default class AnalyticsTrackerSpy implements AnalyticsTracker {
  event = '';
  params: Record<string, any> = {};

  trackEvent = async (
    event: string,
    params: Record<string, any>,
  ): Promise<boolean> => {
    this.event = event;
    this.params = { ...params };
    return false;
  };
}
