import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import FlightsIcon from '../assets/plane.png';
import HotelsIcon from '../assets/hotel.png';

const cards = [
  { label: 'Flights', icon: FlightsIcon },
  { label: 'Hotels', icon: HotelsIcon },
];

const TopServiceCards = () => {
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <TouchableOpacity activeOpacity={0.8} key={index} style={styles.card}>
          <Image source={card.icon} style={[styles.icon, { tintColor: '#f97316' }]} resizeMode="contain" />
          <Text style={styles.label}>{card.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TopServiceCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    width: responsiveWidth(40),
    height: responsiveHeight(20),
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: responsiveWidth(15),
    height: responsiveHeight(10),
    // marginBottom: 10,
  },
  label: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#111',
  },
});
