import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CalendarScreen from './assets/screens/calendarScreen';
import SettingsScreen from './assets/screens/settingsScreen';
import ConverterScreen from './assets/screens/converterScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from './assets/components/customHeader';
import DrawerComponent from './assets/components/customDrawer';

const SettingsStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const ConverterStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SettingStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: () => (
            <Header navigation={navigation} title={'Settings'} />
          ),
        })}
      />
    </SettingsStack.Navigator>
  );
}
function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({navigation}) => ({
          headerTransparent: true,

          headerTitle: () => (
            <Header navigation={navigation} title={'ዘመን መቁጠርያ'} show={true} />
          ),
        })}
      />
    </CalendarStack.Navigator>
  );
}
function ConverterStackScreen() {
  return (
    <ConverterStack.Navigator>
      <ConverterStack.Screen
        name="Converter"
        component={ConverterScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: () => (
            <Header navigation={navigation} title={'Converter'} />
          ),
        })}
      />
    </ConverterStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Converter') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#333',
        },
        activeTintColor: '#3dcc8e',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Calendar" component={CalendarStackScreen} />
      <Tab.Screen name="Converter" component={ConverterStackScreen} />
      <Tab.Screen name="Settings" component={SettingStackScreen} />
    </Tab.Navigator>
  );
}
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerComponent {...props} />}>
        <Drawer.Screen name="Calendar" component={TabNavigator} />
        <Drawer.Screen name="Settings" component={SettingStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
