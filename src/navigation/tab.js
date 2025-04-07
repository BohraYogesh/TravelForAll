import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyTripScreen from '../screens/MyTripScreen';
import WhereToGoScreen from '../screens/Where2GoScreen';
import CreditCardScreen from '../screens/CreditCardScreen';
import BeAHostScreen from '../screens/BeAHostScreen';
import CustomHeader from '../components/CustomHeader';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ header: () => <CustomHeader /> }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyTrip" component={MyTripScreen} />
      <Tab.Screen name="Where2Go" component={WhereToGoScreen} />
      <Tab.Screen name="CreditCard" component={CreditCardScreen} />
      <Tab.Screen name="BeAHost" component={BeAHostScreen} />
    </Tab.Navigator>
  );
}
