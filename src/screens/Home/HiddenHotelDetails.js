import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../context/theme';

const HiddenHotelDetails = ({route, navigation}) => {
  const {colors} = useTheme();
  const {hotel} = route.params;

  const [numTravelers, setNumTravelers] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false); // State to track booking status

  useEffect(() => {
    navigation.setOptions({
      title: hotel.name,
    });
  }, [hotel, navigation]);

  const handleBookNow = () => {
    // Simulate booking success logic
    setBookingSuccess(true);

    // Show success message with hotel name and total price
    Alert.alert(
      'Booking Successful',
      `Your booking for ${hotel.name} has been successfully made for ₹${formatPrice(totalPrice)}!`,
      [{ text: 'OK', onPress: () => console.log('Booking Confirmed!') }]
    );
  };

  // Function to format price with commas for thousands, millions, etc.
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Handle traveler increment and decrement
  const incrementTravelers = () => {
    if (numTravelers < 12) {
      setNumTravelers(numTravelers + 1);
    }
  };

  const decrementTravelers = () => {
    if (numTravelers > 1) {
      setNumTravelers(numTravelers - 1);
    }
  };

  // Total price calculation based on number of travelers
  const totalPrice = hotel.price * numTravelers;

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hotel Image */}
        <Image source={{uri: hotel.image}} style={styles.headerImage} />

        {/* Hotel Name */}
        <View style={styles.contentContainer}>
          <Text style={[styles.title, {color: colors.text}]}>{hotel.name}</Text>
          <Text style={[styles.location, {color: colors.secondary}]}>
            <Icon name="location-outline" size={responsiveFontSize(2)} />{' '}
            {hotel.location}
          </Text>

          {/* Description */}
          <Text style={[styles.description, {color: colors.secondary}]}>
            {hotel.description ||
              'A beautiful place to stay with a comfortable atmosphere and scenic views.'}
          </Text>

          {/* Rating */}
          <Text style={[styles.rating, {color: '#388e3c'}]}>
            Rating: {hotel.rating}
          </Text>

          {/* Price */}
          <Text style={[styles.price, {color: colors.primary}]}>
            Price: ₹ {formatPrice(hotel.price)} / night
          </Text>

          {/* Reviews */}
          <Text style={[styles.reviews, {color: colors.secondary}]}>
            {hotel.reviews ? `${hotel.reviews}` : 'No reviews yet'}
          </Text>

          {/* Number of Travelers */}
          <View style={styles.travelersContainer}>
            <Text style={[styles.travelersText, {color: colors.text}]}>
              Number of Travelers:
            </Text>
            <View style={styles.travelersControl}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={decrementTravelers}
                style={styles.travelersButton}>
                <Text style={styles.travelersButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.travelersCount, {color: colors.text}]}>
                {numTravelers}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={incrementTravelers}
                style={styles.travelersButton}>
                <Text style={styles.travelersButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar with Dynamic Price and Book Now Button */}
      <View style={[styles.bottomBar, {backgroundColor: colors.bg}]}>
        <Text style={[styles.bottomPrice, {color: colors.primary}]}>
          ₹ {formatPrice(totalPrice)}
        </Text>
        <TouchableOpacity activeOpacity={1} style={styles.bookNowButton} onPress={handleBookNow}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: responsiveHeight(15), // Add extra padding at the bottom to avoid content being covered by bottom bar
  },
  headerImage: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  contentContainer: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  location: {
    fontSize: responsiveFontSize(2),
    color: '#666',
    marginBottom: responsiveHeight(1),
  },
  description: {
    fontSize: responsiveFontSize(2),
    color: '#666',
    marginBottom: responsiveHeight(2),
  },
  rating: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  price: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  reviews: {
    fontSize: responsiveFontSize(1.8),
    color: '#888',
  },
  travelersContainer: {
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
  travelersText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  travelersControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  travelersButton: {
    backgroundColor: '#388e3c',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    borderRadius: 5,
  },
  travelersButtonText: {
    fontSize: responsiveFontSize(2),
    color: '#fff',
    fontWeight: 'bold',
  },
  travelersCount: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginHorizontal: responsiveWidth(5),
  },
  // Bottom Bar Styling
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    zIndex: 10,
  },
  bottomPrice: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: '#388e3c',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: 5,
  },
  bookNowText: {
    fontSize: responsiveFontSize(2),
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HiddenHotelDetails;
