import analytics from '@react-native-firebase/analytics';
import { AnalyticsTracker } from '~/domain/analytics';

export default class FirebaseAnalyticsAdapter implements AnalyticsTracker {
  async trackEvent(
    eventName: string,
    params: Record<string, any>,
  ): Promise<boolean> {
    await analytics().logEvent(eventName, params);
    return true;
  }
}
