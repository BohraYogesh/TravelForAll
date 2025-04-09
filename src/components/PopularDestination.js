// src/components/PopularDestinations.js
import React from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const destinations = [
  {
    city: 'New Delhi',
    country: 'India',
    price: '₹4,235',
    image: { uri: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg' },
  },
  {
    city: 'Udaipur',
    country: 'India',
    price: '₹8,213',
    image:{ uri: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg' },
  },
  {
    city: 'Chandigarh',
    country: 'India',
    price: '₹9,012',
    image: { uri: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg' },
  },
  {
    city: 'Kullu',
    country: 'India',
    price: '₹6,742',
    image: { uri: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg' },
  },
  {
    city: 'Indore',
    country: 'India',
    price: '₹8,566',
    image: { uri: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg' },
  },
  {
    city: 'Lucknow',
    country: 'India',
    price: '₹9,120',
    image:{ uri: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg' },
  },
];

export default function PopularDestination() {
  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.title}>Popular Destinations</Text>
      <Text style={styles.subtitle}>Estimated lowest fares found by users</Text>

      <FlatList
        data={destinations}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.city}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ImageBackground source={item.image} style={styles.image} imageStyle={{ borderRadius: 8 }}>
              <View style={styles.overlay}>
                <Text style={styles.city}>{item.city}</Text>
                <Text style={styles.country}>{item.country}</Text>
              </View>
            </ImageBackground>
            <Text style={styles.label}>Round-trip from</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    marginBottom: 4,
  },
  subtitle: {
    color: 'gray',
    marginBottom: 12,
  },
  card: {
    width: responsiveWidth(36),
    marginRight: 12,
  },
  image: {
    height: responsiveHeight(18),
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  city: {
    color: '#fff',
    fontWeight: 'bold',
  },
  country: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
  },
  label: {
    color: 'gray',
    marginTop: 4,
    fontSize: responsiveFontSize(1.5),
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
});
