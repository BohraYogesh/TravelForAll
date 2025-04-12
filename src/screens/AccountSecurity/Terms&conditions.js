import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default function Termsconditions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
    height: responsiveHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    // fontWeight: 'bold',
    color: '#333',
  },
});
