import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useTheme} from '../../../context/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

// Function to format numbers in Indian currency style
const formatIndianCurrency = amount => {
  const x = amount.toString();
  const lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  return otherNumbers !== ''
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
    : lastThree;
};

export default function PaymentDetails({route}) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {package: packageName, duration, travelers, amount} = route.params;

  const [expiry, setExpiry] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardholderName, setCardholderName] = React.useState('');
  const [errors, setErrors] = React.useState({});

  // Calculate total amount
  const sanitizedAmount = amount.replace(/,/g, '');
  const totalAmount = parseInt(travelers) * parseInt(sanitizedAmount);

  const handleCardNumberChange = text => {
    let formatted = text.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    if (formatted.length > 4) {
      formatted = formatted.slice(0, 4) + ' ' + formatted.slice(4);
    }
    if (formatted.length > 9) {
      formatted = formatted.slice(0, 9) + ' ' + formatted.slice(9);
    }
    if (formatted.length > 14) {
      formatted = formatted.slice(0, 14) + ' ' + formatted.slice(14);
    }
    setCardNumber(formatted.slice(0, 19)); // Limit to 16 digits with spaces
    if (errors.cardNumber) setErrors({...errors, cardNumber: false}); // Reset error on change
  };

  const handleExpiryChange = text => {
    let formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length >= 3) {
      formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
    }
    setExpiry(formatted.slice(0, 5));
    if (errors.expiry) setErrors({...errors, expiry: false}); // Reset error on change
  };

  const handleCvvChange = text => {
    setCvv(text.replace(/[^0-9]/g, '').slice(0, 4));  // Restrict to 4 digits max
    if (errors.cvv) setErrors({...errors, cvv: false}); // Reset error on change
  };

  const handleCardholderNameChange = text => {
    setCardholderName(text);
    if (errors.cardholderName) setErrors({...errors, cardholderName: false}); // Reset error on change
  };

  const handleProceed = () => {
    const newErrors = {};
    if (!expiry.trim()) newErrors.expiry = true; // Check if expiry date is filled
    if (!cvv.trim()) newErrors.cvv = true; // Check if CVV is filled
    if (!cardNumber.trim()) newErrors.cardNumber = true; // Check if card number is filled
    if (!cardholderName.trim()) newErrors.cardholderName = true; // Check if cardholder name is filled

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Alert.alert('Missing Details', 'Please fill in all required fields.');
      return;
    }

    navigation.navigate('FinalPayment', {
      package: packageName,
      duration,
      travelers,
      amount: totalAmount,
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <Text style={[styles.title, {color: colors.text}]}>Payment Details</Text>

      {/* Order Summary */}
      <View style={[styles.summaryCard, {backgroundColor: colors.subbg}]}>
        <Text style={[styles.summaryTitle, {color: colors.text}]}>
          Order Summary
        </Text>
        <View style={styles.row}>
          <Text style={{color: colors.text}}>Package:</Text>
          <Text style={{color: colors.text}}>{packageName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{color: colors.text}}>Duration:</Text>
          <Text style={{color: colors.text}}>{duration}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{color: colors.text}}>Travelers:</Text>
          <Text style={{color: colors.text}}>{travelers}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.totalLabel, {color: colors.text}]} >
            Total Amount:
          </Text>
          <Text style={[styles.totalAmount, {color: colors.primary}]} >
            ₹ {formatIndianCurrency(totalAmount)}
          </Text>
        </View>
      </View>

      {/* Card Number */}
      <Text style={[styles.label, {color: colors.text}]}>Card Number</Text>
      <TextInput
        placeholder="1234 5678 9012 3456"
        placeholderTextColor="#aaa"
        style={[
          styles.input,
          {color: colors.text},
          errors.cardNumber && styles.errorInput, // Red border if error
        ]}
        keyboardType="numeric"
        maxLength={19} // Maximum length including spaces
        onChangeText={handleCardNumberChange} // Use the handler for formatting
        value={cardNumber} // Set the state variable for Card Number
      />

      {/* Expiry Date and CVV */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.label, {color: colors.text}]}>Expiry Date</Text>
          <TextInput
            placeholder="MM/YY"
            placeholderTextColor="#aaa"
            style={[
              styles.input,
              styles.halfInput,
              errors.expiry && styles.errorInput, // Red border if error
              {color: colors.text},
            ]}
            keyboardType="numeric"
            maxLength={5}
            onChangeText={handleExpiryChange}
            value={expiry}
          />
        </View>

        <View style={styles.column}>
          <Text style={[styles.label, {color: colors.text}]}>CVV</Text>
          <TextInput
            placeholder="CVV"
            placeholderTextColor="#aaa"
            style={[
              styles.input,
              styles.halfInput,
              errors.cvv && styles.errorInput, // Red border if error
              {color: colors.text},
            ]}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={handleCvvChange}
            value={cvv}
            secureTextEntry
          />
        </View>
      </View>

      {/* Cardholder Name */}
      <Text style={[styles.label, {color: colors.text}]}>Cardholder Name</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        style={[
          styles.input,
          {color: colors.text},
          errors.cardholderName && styles.errorInput, // Red border if error
        ]}
        value={cardholderName}
        onChangeText={handleCardholderNameChange}
      />

      {/* Payment Button */}
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.payButton, {backgroundColor: '#387c87'}]}
        onPress={handleProceed}>
        <Text style={styles.payText}>Complete Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  summaryCard: {
    padding: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
  },
  summaryTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
  },
  column: {
    flex: 1,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  label: {
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(0.5),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(3),
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(2),
  },
  halfInput: {
    width: '100%',
  },
  errorInput: {
    borderColor: 'red',
  },
  payButton: {
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  payText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
});
