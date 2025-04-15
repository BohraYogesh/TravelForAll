// src/navigation/HomeStackScreen.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FlightScreen from './TopServiceCard/FlightScreen';
import HotelScreen from './TopServiceCard/HotelScreen';
import ProfileInfoScreen from './Profile/ProfileInfoScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ title: 'Explore', headerShown: true }}
      />
      <Stack.Screen
        name="Flight"
        component={FlightScreen}
        options={{ title: 'Flight Search' }}
      />
      <Stack.Screen
        name="Hotel"
        component={HotelScreen}
        options={{ title: 'Hotel Search' }}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfoScreen}
        options={{ title: 'Profile Info' }}
      />
    </Stack.Navigator>
  );
}
