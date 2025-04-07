import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect }from 'react'
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
// import SplashScreen from 'react-native-splash-screen';

export default function App() {

  // useEffect(() => {
  //   SplashScreen.hide(); // App load hone ke baad hide kare
  // }, []);


  return (
    <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})