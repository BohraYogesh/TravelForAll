import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../context/theme'; 

export default function Termsconditions() {
  const { colors } = useTheme(); 

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Terms & Conditions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(5),
    height: responsiveHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    // fontWeight: 'bold', // Enable bold text if desired
  },
});
