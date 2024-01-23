import { AppRegistry } from 'react-native';
import App from './App';
import appJson from './app.json';

AppRegistry.registerComponent(appJson.displayName, () => App);
const rootTag = document.getElementById('root');
console.log("rootTag", rootTag)
AppRegistry.runApplication(appJson.displayName, {
  rootTag: rootTag
});
