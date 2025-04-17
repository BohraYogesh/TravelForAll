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
import Upcoming from './Upcoming';
import Past from './Past';
import Cancelled from './Cancelled';
import { useTheme } from '../../../../context/theme';
import { useNavigation } from '@react-navigation/native';

export default function HotelBooking() {
  const navigation = useNavigation();
  const { colors} = useTheme();
  const [current, setCurrent] = useState('Upcoming');

  const tabs = [
    {key: 'Upcoming', label: 'Upcoming'},
    {key: 'Past', label: 'Past'},
    {key: 'Cancelled', label: 'Cancelled'},
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.bg}]}>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            activeOpacity={1}
            key={tab.key}
            onPress={() => setCurrent(tab.key)}
            style={styles.tabWrapper}>
            <Text
              style={[
                styles.tabText,
                {
                  color: current === tab.key ? '#f97316' : '#6b7280',
                },
              ]}>
              {tab.label}
            </Text>
            {current === tab.key && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentWrapper}>
        {current === 'Upcoming' && <Upcoming />}
        {current === 'Past' && <Past />}
        {current === 'Cancelled' && <Cancelled />}
      </View>

      <TouchableOpacity
        style={styles.bottomButton}
        activeOpacity={1}
        onPress={() => navigation.navigate('Flight')}>
        <Text style={styles.bottomButtonText}>Book a Flight now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  tabContainer: {
    flexDirection: 'row',
    height: responsiveHeight(6),
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  tabWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: responsiveHeight(1.2),
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  underline: {
    height: responsiveHeight(0.4),
    width: '100%',
    backgroundColor: '#f97316',
    marginTop: responsiveHeight(0.5),
    borderRadius: responsiveWidth(1),
  },
  contentWrapper: {
    flex: 1,
    paddingBottom: responsiveHeight(7), // space for bottom button
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
