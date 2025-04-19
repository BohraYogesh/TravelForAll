import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// Theme hook
import { useTheme } from '../context/theme';

// Icon imports
import VisaIcon from '../assets/mobile.png';
import TrainIcon from '../assets/train.png';
import EsimIcon from '../assets/mobile.png';
import TaxiIcon from '../assets/car.png';
import BusIcon from '../assets/bus.png';
import HotelIcon from '../assets/hotel1.png';
import WorkIcon from '../assets/aircraft.png';

// Grid data
const items = [
  { label: 'Flights', icon: WorkIcon },
  { label: 'Hotels', icon: HotelIcon },
  { label: 'Trains', icon: TrainIcon },
  { label: 'Buses', icon: BusIcon },
  { label: 'Cabs', icon: TaxiIcon },
  { label: 'e-Visa', icon: VisaIcon },
  { label: 'eSIM', icon: EsimIcon },
];

const TravelMenuGrid = () => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={[styles.iconWrapper, { backgroundColor: '#FEECEB' }]}>
            <Image
              source={item.icon}
              style={[styles.icon, { tintColor:'#f97316' }]}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.label, { color: colors?.text || '#333' }]}>
            {item.label}
          </Text>
        </View>
      )}
    />
  );
};

export default TravelMenuGrid;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    alignItems: 'center',
    // marginHorizontal: responsiveWidth(0.5),
    width: responsiveWidth(25),
  },
  iconWrapper: {
    padding: responsiveWidth(2),
    borderRadius: 50,
    marginBottom: 8,
  },
  icon: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
  },
  label: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
  },
});
