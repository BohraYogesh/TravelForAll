import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTheme } from '../../context/theme'; // Adjust path if needed

export default function Privacypolicy() {
  const { colors } = useTheme(); // Access theme colors

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Privacy & Policy</Text>
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
    // fontWeight: 'bold', // You can enable this if you want a bolder text
  },
});
