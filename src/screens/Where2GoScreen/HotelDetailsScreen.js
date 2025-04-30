import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../context/theme';
import { useCurrency } from '../../context/CurrencyContext';

const HotelDetailsScreen = () => {
  const { colors } = useTheme();
  const { selectedCurrency } = useCurrency();
  const route = useRoute();
  const navigation = useNavigation();

  const { hotel, price } = route.params;

  const [travelers, setTravelers] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({ title: hotel.name });
  }, [navigation, hotel.name]);

  const getCurrencySymbol = () => {
    switch (selectedCurrency) {
      case 'USD':
        return '$';
      case 'INR':
        return '₹';
      default:
        return '';
    }
  };

  const handleTravelersChange = type => {
    setTravelers(prev => {
      if (type === 'inc' && prev < 12) return prev + 1;
      if (type === 'dec' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const cleanPrice = parseFloat(String(price).replace(/,/g, ''));
  const totalPrice = travelers * cleanPrice;

  const formattedTotalPrice = totalPrice.toLocaleString();

  const getFormattedPrice = () => {
    if (selectedCurrency === 'USD') {
      return totalPrice.toFixed(2);
    } else if (selectedCurrency === 'INR') {
      return formattedTotalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return formattedTotalPrice; 
  };

  const handleBooking = () => {
    navigation.navigate('BookingDetails', {
      city:hotel.name,
      travelers,
      price: getFormattedPrice(),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={{ uri: hotel.image.uri }} style={styles.image} />

        <View style={styles.content}>
          <Text style={[styles.name, { color: colors.text }]}>{hotel.name}</Text>
          <Text style={[styles.location, { color: colors.secondary }]}>
            {hotel.location.city}, {hotel.location.state}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            {getCurrencySymbol()} {price} / night
          </Text>
          <Text style={styles.rating}>⭐ {hotel.rating}</Text>

          <Text style={[styles.description, { color: colors.text }]}>
            Enjoy your stay at {hotel.name}! This hotel offers comfortable accommodations and top-notch service for travelers visiting{' '}
            {hotel.location.city}.
          </Text>

          {/* Inclusions Section */}
          <View style={styles.inclusionsSection}>
            <Text style={[styles.inclusionsTitle, { color: colors.text }]}>Inclusions</Text>
            <View style={styles.inclusionList}>
              {['Accommodation', 'Guided Tours', 'Equipment', 'Meals'].map((item, index) => (
                <Text key={index} style={[styles.inclusionItem, { color: colors.secondary }]}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>

          {/* Traveler Selection */}
          <View style={styles.travelersSection}>
            <Text style={[styles.label, { color: colors.text }]}>Travelers</Text>
            <View style={styles.travelerRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleTravelersChange('dec')}
                style={styles.travelerBtn}>
                <Text style={styles.travelerBtnText}>–</Text>
              </TouchableOpacity>

              <Text style={[styles.travelerCount, { color: colors.text }]}>{travelers}</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleTravelersChange('inc')}
                style={styles.travelerBtn}>
                <Text style={styles.travelerBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed Footer */}
      <View style={[styles.footerBar, { backgroundColor: colors.bg }]}>
        <Text style={[styles.footerPrice, { color: '#387c87' }]}>
          {getCurrencySymbol()} {getFormattedPrice()}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.bookButton, { backgroundColor: '#387c87' }]}
          onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Book Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: '100%',
    height: responsiveHeight(30),
  },
  content: {
    padding: responsiveWidth(4),
    paddingBottom: responsiveHeight(12),
  },
  name: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
  },
  location: {
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(0.5),
  },
  price: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    marginTop: responsiveHeight(0.5),
  },
  rating: {
    fontSize: responsiveFontSize(2),
    color: '#f1c40f',
    marginVertical: responsiveHeight(0.5),
  },
  description: {
    fontSize: responsiveFontSize(1.9),
    marginTop: responsiveHeight(.5),
    lineHeight: responsiveHeight(3),
  },
  inclusionsSection: {
    // paddingVertical: responsiveHeight(2),
  },
  inclusionsTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  inclusionList: {
    gap: responsiveHeight(1),
  },
  inclusionItem: {
    fontSize: responsiveFontSize(1.9),
  },
  travelersSection: {
    // marginTop: responsiveHeight(3),
  },
  label: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    marginBottom: responsiveHeight(1),
  },
  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  travelerBtn: {
    backgroundColor: '#387c87',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 6,
  },
  travelerBtnText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  travelerCount: {
    fontSize: responsiveFontSize(2.2),
    marginHorizontal: responsiveWidth(4),
    fontWeight: '600',
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerPrice: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
  bookButton: {
    paddingVertical: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});
