import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FlightBooking from '../MyTripScreen/FlightBookingTrip';
import HotelBooking from '../MyTripScreen/HotelBookingTrip';
import { useTheme } from '../../context/theme';


export default function MyTripScreen({navigation}) {
  const {colors} = useTheme();
  const [current, setCurrent] = useState('FlightBooking');

  const tabs = [
    {key: 'FlightBooking', label: 'FlightBooking'},
    {key: 'HotelBooking', label: 'HotelBooking'},
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.bg}]}>
      <View style={styles.tabBox}>
        <View style={styles.tabContainer}>
          {tabs.map(tab => {
            const isActive = current === tab.key;
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={tab.key}
                onPress={() => setCurrent(tab.key)}
                style={[
                  styles.tabWrapper,
                  {
                    backgroundColor: isActive ? '#f97316' : 'transparent',
                    borderRadius: responsiveWidth(10),
                  },
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isActive ? '#fff' : '#6b7280',
                    },
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.contentWrapper}>
        {current === 'FlightBooking' && <FlightBooking />}
        {current === 'HotelBooking' && <HotelBooking />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // tabBox:{height: responsiveHeight(50)},
  tabContainer: {
    flexDirection: 'row',
    height: responsiveHeight(7.5),
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  tabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    paddingHorizontal: responsiveWidth(5),
    height: responsiveHeight(5), 
    marginHorizontal: responsiveWidth(1), 
  },

  tabText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  contentWrapper: {
    flex: 1,
    paddingBottom: responsiveHeight(7),
  },
  bottomButton: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    left: responsiveWidth(5),
    right: responsiveWidth(5),
    backgroundColor: '#f97316',
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(9),
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});
