import 'react-native-reanimated';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeProvider, useTheme } from './src/context/theme'; 

// Screens
import HomeScreen from './src/screens/Home/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import FlightScreen from './src/screens/TopServiceCard/FlightScreen';
import HotelScreen from './src/screens/TopServiceCard/HotelScreen';
import ProfileInfoScreen from './src/screens/Profile/ProfileInfoScreen';
import MyTripScreen from './src/screens/MyTripScreen';
import Where2GoScreen from './src/screens/Where2GoScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import TalkToUsScreen from './src/screens/TalkToUsScreen';
import HotelBooking from './src/screens/MyTrip/HotelBooking/HotelBooking';
import FlightBooking from './src/screens/MyTrip/FlightBooking/FlightBooking';
import AccountSecurity from './src/screens/AccountSecurity/AccountSecurity';
import Termsconditions from './src/screens/AccountSecurity/Terms&conditions';
import Privacypolicy from './src/screens/AccountSecurity/Privacy&policy';
import GemDetailScreen from './src/screens/Home/GemDetailScreen';
import Notification from './src/screens/Notifications/Notification';
import PopularDestinationScreen from './src/screens/PopularDestinationScreen';
import ExploreCategoryScreen from './src/components/TravelCategory/ExploreCategoryScreen';
import VisaFreeCountry from './src/components/TravelCategory/VisaFreeCountry/VisaFreeCountry';
import CityDetailScreen from './src/components/CityDetailScreen';
import LoginScreen from './src/auth/LoginScreen';
import SignupScreen from './src/auth/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Explore" component={ExploreScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const { colors } = useTheme(); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.bg}, 
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
    <Stack.Navigator screenOptions={{ animation: 'none' }}>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} options={{ title: 'Profile Info' }} />
      <Stack.Screen name="HotelBooking" component={HotelBooking} options={{ title: 'Hotel Booking' }} />
      <Stack.Screen name="FlightBooking" component={FlightBooking} options={{ title: 'Flight Booking' }} />
      <Stack.Screen name="Flight" component={FlightScreen} options={{ title: 'Flight Search' }} />
      <Stack.Screen name="Hotel" component={HotelScreen} options={{ title: 'Hotel Search' }} />
      <Stack.Screen name="Account&Security" component={AccountSecurity} options={{ title: 'Account & Security' }} />
      <Stack.Screen name="TermsAndConditions" component={Termsconditions} options={{ title: 'Terms & Conditions' }} />
      <Stack.Screen name="Privacy" component={Privacypolicy} options={{ title: 'Privacy' }} />
      <Stack.Screen name="GemDetailScreen" component={GemDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ title: 'Notification' }} />
      <Stack.Screen name="PopulorDestination" component={PopularDestinationScreen} options={{ title: 'Popular Destination' }} />
      <Stack.Screen name="ExploreCategoryScreen" component={ExploreCategoryScreen} />
      <Stack.Screen name="VisaFreeCountry" component={VisaFreeCountry} options={{ title: 'Visa Free Country' }} />
      <Stack.Screen name="CityDetail" component={CityDetailScreen} />
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='SignUp' component={SignupScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}


function MainApp() {
  const { theme } = useTheme(); 

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <MainApp /> 
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
