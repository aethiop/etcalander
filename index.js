/**
 * @format
 */
import { Navigation } from "react-native-navigation";
import App from './App';
Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false,
  }
});
Navigation.registerComponent('com.Calendar.CalendarScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'com.Calendar.CalendarScreen'
             }
           }
         ]
       }
     }
  });
});
