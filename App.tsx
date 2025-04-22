import 'react-native-reanimated';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeProvider, useTheme} from './src/context/theme';
import {Provider as PaperProvider} from 'react-native-paper';

import HomeScreen from './src/screens/Home/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import FlightScreen from './src/screens/Home/TopServiceCard/FlightScreen';
import HotelScreen from './src/screens/Home/TopServiceCard/HotelScreen';
import ProfileInfoScreen from './src/screens/Profile/ProfileInfoScreen';
import MyTripScreen from './src/screens/MyTripScreen/MyTripScreen';
import Where2GoScreen from './src/screens/Where2GoScreen/Where2GoScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import TalkToUsScreen from './src/screens/TalkToUsScreen/TalkToUsScreen';
import HotelBooking from './src/screens/Profile/MyTrip/HotelBooking/HotelBooking';
import FlightBooking from './src/screens/Profile/MyTrip/FlightBooking/FlightBooking';
import AccountSecurity from './src/screens/Profile/AccountSecurity/AccountSecurity';
import Termsconditions from './src/screens/Profile/AccountSecurity/Terms&conditions';
import Privacypolicy from './src/screens/Profile/AccountSecurity/Privacy&policy';
import HiddenGemDetailScreen from './src/screens/Home/HiddenGemDetailScreen';
import Notification from './src/screens/Profile/Notifications/Notification';
import PopularDestinationScreen from './src/screens/PopularDestinationScreen';
import ExploreCategoryScreen from './src/components/TravelCategory/ExploreCategoryScreen';
import VisaFreeCountry from './src/components/TravelCategory/VisaFreeCountry/VisaFreeCountry';
import CityDetailScreen from './src/components/CityDetailScreen';
import LoginScreen from './src/auth/LoginScreen';
import SignupScreen from './src/auth/SignupScreen';
import HotelDetailsScreen from './src/screens/Where2GoScreen/HotelDetailsScreen';
import DestinationDetails from './src/components/TravelCategory/VisaFreeCountry/DestinationDetails';
import BookingDetails from './src/components/TravelCategory/VisaFreeCountry/BookingDetails';
import PaymentDetails from './src/components/TravelCategory/VisaFreeCountry/PaymentDetails';
import FinalPayment from './src/components/TravelCategory/FinalPayment';
import SearchScreen from './src/screens/Home/SearchScreen';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Explore" component={ExploreScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: colors.bg},
        tabBarIcon: ({color, size, focused}) => {
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
        tabBarLabel: t(route.name),
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="My Booking" component={MyTripScreen} />
      <Tab.Screen name="Where2Go" component={Where2GoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
        name="Talk To Us"
        component={TalkToUsScreen}
        options={{headerShown: true}}
      />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfoScreen}
        options={{title: 'Profile Info'}}
      />
      <Stack.Screen
        name="HotelBooking"
        component={HotelBooking}
        options={{title: 'Hotel Booking'}}
      />
      <Stack.Screen
        name="FlightBooking"
        component={FlightBooking}
        options={{title: 'Flight Booking'}}
      />
      <Stack.Screen
        name="Flight"
        component={FlightScreen}
        options={{title: 'Flight Search'}}
      />
      <Stack.Screen
        name="Hotel"
        component={HotelScreen}
        options={{title: 'Hotel Search'}}
      />
      <Stack.Screen
        name="Account&Security"
        component={AccountSecurity}
        options={{title: 'Account & Security'}}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={Termsconditions}
        options={{title: 'Terms & Conditions'}}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacypolicy}
        options={{title: 'Privacy'}}
      />
      <Stack.Screen
        name="HiddenGemDetailScreen"
        component={HiddenGemDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{title: 'Notification'}}
      />
      <Stack.Screen
        name="PopulorDestination"
        component={PopularDestinationScreen}
        options={{title: 'Popular Destination'}}
      />
      <Stack.Screen
        name="ExploreCategoryScreen"
        component={ExploreCategoryScreen}
      />
      <Stack.Screen
        name="VisaFreeCountry"
        component={VisaFreeCountry}
        options={{title: 'Visa Free Country'}}
      />
      <Stack.Screen name="CityDetail" component={CityDetailScreen} />
      <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="DescriptionDetails" component={DestinationDetails} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="FinalPayment" component={FinalPayment} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function MainApp() {
  const {theme} = useTheme();

  return (
    <>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#000000' : '#f97316'}
      />
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppStack />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <PaperProvider>
          <MainApp />
        </PaperProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
