import analytics from '@react-native-firebase/analytics';
import { AnalyticsTracker } from '~/domain/analytics';

export default class FirebaseAnalyticsAdapter implements AnalyticsTracker {
  async trackEvent(
    eventName: string,
    params: Record<string, any> | Array<string>,
  ): Promise<boolean> {
    try {
      let processedParams: Record<string, any>;

      if (Array.isArray(params)) {
        processedParams = { places: this.arrayToString(params) };
      } else {
        processedParams = params;
      }

      await analytics().logEvent(eventName, processedParams);
      return true;
    } catch (error) {
      return false;
    }
  }

  arrayToString(array: Array<string>): string {
    return array.join(', ');
  }
}
