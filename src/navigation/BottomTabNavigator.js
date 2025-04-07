import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyTripScreen from '../screens/MyTripScreen';
import Where2GoScreen from '../screens/Where2GoScreen';
import CreditCardScreen from '../screens/CreditCardScreen';
import BeAHostScreen from '../screens/BeAHostScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'My Trip':
              iconName = focused ? 'airplane' : 'airplane-outline';
              break;
            case 'Where2Go':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Credit Card':
              iconName = focused ? 'card' : 'card-outline';
              break;
            case 'Be a Host':
              iconName = focused ? 'people' : 'people-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="My Trip" component={MyTripScreen} />
      <Tab.Screen name="Where2Go" component={Where2GoScreen} />
      <Tab.Screen name="Credit Card" component={CreditCardScreen} />
      <Tab.Screen name="Be a Host" component={BeAHostScreen} />
    </Tab.Navigator>
  );
}
