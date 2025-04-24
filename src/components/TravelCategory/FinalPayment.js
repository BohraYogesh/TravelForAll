import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// Format number to Indian currency format
const formatIndianCurrency = amount => {
  const x = amount.toString();
  const lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  return otherNumbers !== ''
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
    : lastThree;
};

export default function FinalPayment({route}) {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const {
    package: packageName,
    duration,
    travelers,
    amount,
    travelDate,
    bookedBy,
    transactionId = 'air87hjcp99',
  } = route.params;

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <Text style={[styles.checkmark, {color: colors.primary}]}>✔</Text>
      <Text style={[styles.successText, {color: colors.text}]}>
        Payment Successful!
      </Text>
      <Text style={[styles.subText, {color: colors.text}]}>
        Thank you for booking with us. Your travel package has been confirmed.
      </Text>

      <View style={[styles.summaryCard, {backgroundColor: colors.subbg}]}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          Booking Summary
        </Text>
        {[['Transaction ID:', transactionId],
          ['Package:', packageName],
          ['Duration:', duration],
          ['Travelers:', travelers],
          ['Travel Date:', travelDate],
          ['Booked by:', bookedBy]].map(([label, value], index) => (
          <View style={styles.row} key={index}>
            <Text style={{color: colors.text}}>{label}</Text>
            <Text style={{color: colors.text}}>{value}</Text>
          </View>
        ))}

        <View style={styles.row}>
          <Text style={[styles.totalLabel, {color: colors.text}]}>
            Total Amount:
          </Text>
          <Text style={[styles.totalAmount, {color: colors.primary}]}>
            ₹{formatIndianCurrency(amount)}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'MainTabs'}],
            });
          }}
          style={[styles.button, {backgroundColor: '#387c87'}]}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[styles.button, {backgroundColor: '#ddd'}]}>
          <Text style={[styles.buttonText, {color: '#000'}]}>
            Print Receipt
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
    alignItems: 'center',
    // justifyContent:'center'
  },
  checkmark: {
    fontSize: responsiveFontSize(6),
    marginVertical: responsiveHeight(2),
  },
  successText: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  subText: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
  },
  summaryCard: {
    width: '100%',
    borderRadius: responsiveWidth(2),
    padding: responsiveHeight(2),
    marginBottom: responsiveHeight(3),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1.5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1.2),
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(3),
  },
  button: {
    paddingVertical: responsiveHeight(1.8),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveWidth(2),
    minWidth: responsiveWidth(35),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: '#fff',
    fontWeight: 'bold',
  },
});
