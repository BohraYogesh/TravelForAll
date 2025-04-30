import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../../context/theme';
import { useCurrency } from '../../../context/CurrencyContext';

export default function BookingDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {city, price, description} = route.params || {};
  const {selectedCurrency} = useCurrency();

  console.log('City from params:', city);
  console.log('Price from params:', price);
  const {colors} = useTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [travelers, settravelers] = useState(
    route.params?.travelers?.toString() || '1',
  );
  console.log('Route Params:', route.params);
  console.log('Travelers:', route.params?.travelers);

  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      if (errors.date) {
        setErrors(prev => ({...prev, date: false}));
      }
    }
  };

  const formattedDate = date ? date.toLocaleDateString() : '';

  const handleProceed = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = true;
    if (!email.trim()) newErrors.email = true;
    if (!date) newErrors.date = true;

    if (!travelers || parseInt(travelers) < 1) newErrors.travelers = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Alert.alert('Missing Details', 'Please fill in all required fields.');
      return;
    }

    navigation.navigate('PaymentDetails', {
      package: description?.country || city,
      duration: '5 days',
      travelers,
      amount: price || '0',
      travelDate: formattedDate,
      bookedBy: fullName,
    });
  };
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

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <Text style={[styles.heading, {color: colors.text}]}>
        Booking Details
      </Text>

      {/* Package Card */}
      <View style={[styles.packageCard, {backgroundColor: colors.subbg}]}>
        <Text style={[styles.packageTitle, {color: colors.text}]}>
          {description?.city || city || 'No Country Available'}
        </Text>
        <Text style={[styles.packageDays, {color: colors.text}]}>5 days</Text>
        <Text style={[styles.packagePrice, {color: colors.primary}]}>
        {getCurrencySymbol()} { price || 'N/A'}
        </Text>
      </View>

      {/* Input Fields */}
      <Text style={[styles.label, {color: colors.text}]}>Full Name*</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        style={[
          styles.input,
          {color: colors.text},
          errors.fullName && styles.errorInput,
        ]}
        value={fullName}
        onChangeText={text => {
          setFullName(text);
          if (errors.fullName) setErrors(prev => ({...prev, fullName: false}));
        }}
      />

      <Text style={[styles.label, {color: colors.text}]}>Email Address*</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        style={[
          styles.input,
          {color: colors.text},
          errors.email && styles.errorInput,
        ]}
        keyboardType="email-address"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (errors.email) setErrors(prev => ({...prev, email: false}));
        }}
      />

      <Text style={[styles.label, {color: colors.text}]}>
        Number of travelers
      </Text>
      <TextInput
        placeholder="1"
        placeholderTextColor="#aaa"
        style={[
          styles.input,
          {color: colors.text},
          errors.travelers && styles.errorInput,
        ]}
        keyboardType="numeric"
        value={travelers}
        editable={false}
        onChangeText={text => {
          settravelers(text);
          if (errors.travelers)
            setErrors(prev => ({...prev, travelers: false}));
        }}
      />

      <Text style={[styles.label, {color: colors.text}]}>Travel Date*</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowDatePicker(true)}
        style={[styles.input, errors.date && styles.errorInput]}>
        <Text style={{color: '#aaa'}}>
          {formattedDate || new Date().toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          minimumDate={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}

      {/* Proceed to Payment Button */}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.paymentButton}
        onPress={handleProceed}>
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
  },
  errorInput: {
    borderColor: '#D22B2B',
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
