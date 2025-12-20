import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const reactotron = Reactotron.configure({
    name: 'Voy App',
  })
    .useReactNative({
      asyncStorage: false,
      networking: {
        ignoreUrls: /symbolicate/,
      },
      editor: false,
      errors: { veto: () => false },
      overlay: false,
      devTools: false,
    })
    .connect();

  console.tron = reactotron;
}

export default Reactotron;
