import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TravelOptions() {
  const options = [
    {label: 'Flights', icon: 'airplane'},
    {label: 'Hotels', icon: 'business'},
    {label: 'Buses', icon: 'bus'},
    {label: 'Trains', icon: 'train'},
    {label: 'Cabs', icon: 'car'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          {options.map((item, index) => (
            <TouchableOpacity activeOpacity={.8} key={index} style={styles.option}>
              <View style={styles.iconWrapper}>
                <Icon name={item.icon} size={35} color="#F97316" />
              </View>
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{alignItems:'center'}}>
          <Icon
            name="chevron-down"
            size={24}
            color="#F97316"
            style={styles.downArrow}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    borderRadius: 16,
    padding: 16,
    width: responsiveWidth(90),
  },
  option: {
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#FEECEB',
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  label: {
    fontSize: responsiveFontSize(1.8),
    fontWeight:'bold',
    color: '#333',
  },
  downArrow: {
    marginTop: 10,
  },
});
