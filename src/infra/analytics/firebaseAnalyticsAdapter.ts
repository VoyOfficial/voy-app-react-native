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
      } else if (typeof value === 'string') {
        processedParams[key] = this.sanitizeString(value);
      } else {
        processedParams[key] = value;
      }
    }

    return processedParams;
  }

  private arrayToString(array: Array<string>): string {
    return array.map((item) => this.sanitizeString(item)).join(', ');
  }

  private sanitizeString(str: string): string {
    return str
      .normalize('NFD') // Normalize to decomposed form
      .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters, keep letters, numbers, and spaces
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/^-+|-+$/g, '') // Remove leading and trailing dashes
      .toLowerCase(); // Convert to lowercase for consistency
  }
}
