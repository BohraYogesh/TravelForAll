import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../context/theme';

const CityDetailScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { city, state, country, price, description, image } = route.params;

  // Set dynamic title in the header
  useEffect(() => {
    navigation.setOptions({ title: city });
  }, [navigation, city]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={[styles.title, { color: colors.text}]}>
        {city}{state ? `, ${state}` : ''}
      </Text>
      <Text style={styles.subtitle}>{country}</Text>
      <Text style={styles.price}>Starting from {price}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: responsiveWidth(4),
    alignItems: 'center',
  },
  image: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
    // borderRadius: responsiveWidth(2),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: responsiveFontSize(2),
    color: '#888',
    marginTop: responsiveHeight(0.5),
  },
  price: {
    fontSize: responsiveFontSize(2.2),
    color: '#2ecc71',
    marginTop: responsiveHeight(1),
  },
  description: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    textAlign: 'center',
    paddingHorizontal: responsiveWidth(2),
  },
});

export default CityDetailScreen;
