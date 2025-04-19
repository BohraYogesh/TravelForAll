import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

import {useTheme} from '../../../context/theme';

export default function BookingDetails() {
  const navigation = useNavigation();

  const route = useRoute();
  const {description} = route.params || {}; // Add fallback in case description is undefined
  const {colors} = useTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [travelers, setTravelers] = useState('1');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = date.toLocaleDateString();

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <Text style={[styles.heading, {color: colors.text}]}>
        Booking Details
      </Text>

      {/* Package Card */}
      <View style={[styles.packageCard, {backgroundColor: colors.subbg}]}>
        <Text style={[styles.packageTitle, {color: colors.text}]}>
          {description?.country || 'No Country Available'}
        </Text>
        {/* <Text style={styles.packageTitle}>
          {description?.des || 'No Description Available'}
        </Text> */}
        <Text style={[styles.packageDays, {color: colors.text}]}>5 days</Text>
        <Text style={[styles.packagePrice, {color: colors.primary}]}>
        ₹ {description?.price || 'N/A'}
        </Text>
      </View>

      {/* Input Fields */}
      <Text style={[styles.label, {color: colors.text}]}>Full Name*</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        style={[styles.input, {color: colors.text}]}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={[styles.label, {color: colors.text}]}>Email Address*</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        style={[styles.input, {color: colors.text}]}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={[styles.label, {color: colors.text}]}>
        Number of Travelers
      </Text>
      <TextInput
        placeholder="1"
        placeholderTextColor="#aaa"
        style={[styles.input, {color: colors.text}]}
        keyboardType="numeric"
        value={travelers}
        onChangeText={setTravelers}
      />

      <Text style={[styles.label, {color: colors.text}]}>Travel Date*</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}>
        <Text style={{color: '#aaa'}}>{formattedDate}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}

      {/* Proceed to Payment Button */}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.paymentButton}
        onPress={() => {
          navigation.navigate('PaymentDetails', {
            package: description?.country || 'N/A',
            duration: '5 days',
            travelers,
            amount: description?.price || '0',
          });
        }}>
        <Text style={styles.paymentText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
  },
  heading: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  packageCard: {
    backgroundColor: '#f8f4ff',
    padding: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
  },
  packageTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  packageDays: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.5),
  },
  packagePrice: {
    fontSize: responsiveFontSize(2.2),
    color: 'purple',
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
  },
  label: {
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(0.5),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: responsiveWidth(2),
    padding: responsiveHeight(1.5),
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: '#000',
  },
  paymentButton: {
    backgroundColor: '#387c87',
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  paymentText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
});
