import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const FlightBooking = () => {
  const [tripType, setTripType] = useState('one-way');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const formatDate = (dateObj) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return dateObj.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      {/* Trip Type Selection */}
      <View style={styles.tripTypeContainer}>
        {['One-way', 'Round-trip', 'Multi-city'].map((type) => (
          <TouchableOpacity
          activeOpacity={1}
            key={type}
            style={[
              styles.tripTypeButton,
              tripType === type.toLowerCase() && styles.tripTypeSelected,
            ]}
            onPress={() => setTripType(type.toLowerCase())}
          >
            <Text
              style={
                tripType === type.toLowerCase()
                  ? styles.tripTypeTextSelected
                  : styles.tripTypeText
              }
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Flight Input Form */}
      <View style={styles.form}>
        <View style={styles.inputRow}>
          <Icon name="airplane-takeoff" size={responsiveFontSize(2.2)} />
          <TextInput placeholder="From" style={styles.input} />
        </View>
        <View style={styles.inputRow}>
          <Icon name="airplane-landing" size={responsiveFontSize(2.2)} />
          <TextInput placeholder="To" style={styles.input} />
        </View>
        <TouchableOpacity activeOpacity={1} style={styles.inputRow} onPress={() => setShowDatePicker(true)}>
          <Icon name="calendar" size={responsiveFontSize(2.2)} />
          <Text style={styles.inputText}>{formatDate(date)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
        <View style={styles.inputRow}>
          <Icon name="account" size={responsiveFontSize(2.2)} />
          <Text style={styles.inputText}>1 Adult · Economy</Text>
        </View>

        {/* Payment Types */}
        <View style={styles.paymentRow}>
          <Icon name="credit-card-outline" size={responsiveFontSize(2.2)} />
          <Text style={styles.paymentText}>Payment Types: Mastercard, Visa, UPI</Text>
        </View>
      </View>

      {/* Search Button */}
      <TouchableOpacity activeOpacity={1} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search Flights</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
    flex: 1,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
    justifyContent: 'space-between',
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    marginHorizontal: responsiveWidth(1.2),
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  tripTypeSelected: {
    backgroundColor: '#f97316',
  },
  tripTypeText: {
    color: '#333',
    fontSize: responsiveFontSize(1.6),
  },
  tripTypeTextSelected: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.6),
  },
  form: {
    backgroundColor: '#f9f9f9',
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: responsiveHeight(2),
    paddingBottom: responsiveHeight(0.5),
  },
  input: {
    marginLeft: responsiveWidth(2),
    flex: 1,
    fontSize: responsiveFontSize(1.9),
  },
  inputText: {
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(1.9),
    color: '#555',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  paymentText: {
    marginLeft: responsiveWidth(2),
    color: '#555',
    fontSize: responsiveFontSize(1.6),
  },
  searchButton: {
    backgroundColor: '#f97316',
    marginTop: responsiveHeight(4),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});

export default FlightBooking;
