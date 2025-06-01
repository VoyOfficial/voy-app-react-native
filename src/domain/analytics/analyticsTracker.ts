export default interface AnalyticsTracker {
  trackEvent(event: string, params?: Record<string, any>): Promise<boolean>;
}
