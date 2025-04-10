import 'react-native-reanimated'; // 👈 MUST be top-most
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 👇 Import your screens
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import FlightScreen from './src/screens/TopServiceCard/FlightScreen';
import HotelScreen from './src/screens/TopServiceCard/HotelScreen';
import ProfileInfoScreen from './src/screens/Profile/ProfileInfoScreen';
import MyTripScreen from './src/screens/MyTripScreen';
import Where2GoScreen from './src/screens/Where2GoScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import TalkToUsScreen from './src/screens/TalkToUsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Flight" component={FlightScreen} options={{ title: 'Flight Search' }} />
      <Stack.Screen name="Hotel" component={HotelScreen} options={{ title: 'Hotel Search' }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'My Booking':
              iconName = focused ? 'bag-handle' : 'bag-handle-outline';
              break;
            case 'Where2Go':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Talk To Us':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F97316',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="My Booking" component={MyTripScreen} />
      <Tab.Screen name="Where2Go" component={Where2GoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Talk To Us" component={TalkToUsScreen} />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} options={{ title: 'Profile Info', animation: 'none'  }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
