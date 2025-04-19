import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../../../context/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

export default function PaymentDetails({route}) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {package: packageName, duration, travelers, amount} = route.params;

  const [expiry, setExpiry] = React.useState('');

  // Calculate total amount
  const sanitizedAmount = amount.replace(/,/g, '');
  const totalAmount = parseInt(travelers) * parseInt(sanitizedAmount);

  const handleExpiryChange = text => {
    let formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length >= 3) {
      formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
    }
    setExpiry(formatted.slice(0, 5));
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
          <Text style={[styles.totalLabel, {color: colors.text}]}>
            Total Amount:
          </Text>
          <Text style={[styles.totalAmount, {color: colors.primary}]}>
            ₹{totalAmount}
          </Text>
        </View>
      </View>

      {/* Card Number */}
      <Text style={[styles.label, {color: colors.text}]}>Card Number</Text>
      <TextInput
        placeholder="1234 5678 9012 3456"
        placeholderTextColor="#aaa"
        style={[styles.input, {color: colors.text}]}
        keyboardType="numeric"
      />

      {/* Expiry Date and CVV */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.label, {color: colors.text}]}>Expiry Date</Text>
          <TextInput
            placeholder="MM/YY"
            placeholderTextColor="#aaa"
            style={[styles.input, styles.halfInput, {color: colors.text}]}
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
            style={[styles.input, styles.halfInput, {color: colors.text}]}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>

      {/* Cardholder Name */}
      <Text style={[styles.label, {color: colors.text}]}>Cardholder Name</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        style={[styles.input, {color: colors.text}]}
      />

      {/* Payment Button */}
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.payButton, {backgroundColor: '#387c87'}]}
        onPress={() =>
          navigation.navigate('FinalPayment', {
            package: packageName,
            duration,
            travelers,
            amount: totalAmount,
          })
        }>
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
    color: '#000',
  },
  halfInput: {
    width: '100%',
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
