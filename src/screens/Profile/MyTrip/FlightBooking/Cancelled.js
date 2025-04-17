import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../../../context/theme';

export default function Cancelled() {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color:colors.text}]}>No Cancelled Trips</Text>
      <Text style={styles.subtext}>Looks good! You don't have any cancelld booking yet.</Text>
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
