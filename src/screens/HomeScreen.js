import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';

export default function Home() {
  return (
    <View style={{ flex: 1}}>
      <CustomHeader/>
      <Text>Home Screen</Text>
    </View>
  );
}
