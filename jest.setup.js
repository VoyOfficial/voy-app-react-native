jest.mock('@react-native-firebase/app', () => {
  return {
    default: jest.fn(() => ({
      onReady: jest.fn(() => Promise.resolve()),
    })),
  };
});

jest.mock('@react-native-firebase/analytics', () => {
  return {
    default: jest.fn(() => ({
      logEvent: jest.fn(),
      setUserProperties: jest.fn(),
      setUserId: jest.fn(),
      setUserProperty: jest.fn(),
      setAnalyticsCollectionEnabled: jest.fn(),
      resetAnalyticsData: jest.fn(),
    })),
  };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  const { EventEmitter } = require('events');
  return class MockNativeEventEmitter extends EventEmitter {
    constructor() {
      super();
    }
  };
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  
  const SafeAreaContext = React.createContext({
    insets: inset,
    frame,
  });

  return {
    SafeAreaProvider: ({ children }) => 
      React.createElement(SafeAreaContext.Provider, { 
        value: { insets: inset, frame } 
      }, children),
    SafeAreaConsumer: ({ children }) => 
      React.createElement(SafeAreaContext.Consumer, {}, children),
    SafeAreaContext,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => frame,
  };
});

jest.mock('@react-navigation/elements', () => {
  const React = require('react');
  const originalModule = jest.requireActual('@react-navigation/elements');
  
  return {
    ...originalModule,
    SafeAreaProviderCompat: ({ children }) => children,
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

