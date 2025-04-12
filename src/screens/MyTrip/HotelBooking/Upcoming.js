import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function Upcoming() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Upcoming Trips</Text>
      <Text style={styles.subtext}>Once you have booked any flights, you will see theme here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  text: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtext: {
    fontSize: responsiveFontSize(2.4),
    marginTop: responsiveHeight(2),
    color:'gray',
    textAlign: 'center',
  },
});
