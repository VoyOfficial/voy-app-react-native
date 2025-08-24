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
        processedParams = this.processObjectParams(params);
      }

      await analytics().logEvent(eventName, processedParams);
      return true;
    } catch (error) {
      return false;
    }
  }

  private processObjectParams(
    params: Record<string, any>,
  ): Record<string, any> {
    const processedParams: Record<string, any> = {};

    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        processedParams[key] = this.arrayToString(value);
      } else {
        processedParams[key] = value;
      }
    }

    return processedParams;
  }

  private arrayToString(array: Array<string>): string {
    return array.join(', ');
  }
}
