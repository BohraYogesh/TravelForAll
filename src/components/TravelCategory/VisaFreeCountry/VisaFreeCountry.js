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
import VisaFree from './VisaFree';
import Visaon from './Visaon';

export default function VisaFreeCountry({navigation}) {
  const [current, setCurrent] = useState('VisaFree');

  const tabs = [
    {key: 'VisaFree', label: 'VisaFree'},
    {key: 'visaOn', label: 'visaOn'},
  ];

  return (
    <SafeAreaView style={styles.container}>
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
        {current === 'VisaFree' && <VisaFree />}
        {current === 'visaOn' && <Visaon />}
      </View>
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
    marginBottom: responsiveHeight(1)
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
    width: responsiveWidth(40),
    backgroundColor: '#f97316',
    marginTop: responsiveHeight(0.5),
    borderRadius: responsiveWidth(1),
  },
  contentWrapper: {
    flex: 1,
  },
});
