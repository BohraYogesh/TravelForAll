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

const numColumns = 3;


// Dummy icons – replace with actual icons
// import FlightsIcon from '../../assets/flights.png';
// import HotelsIcon from '../../assets/hotels.png';
import VisaIcon from '../assets/mobile.png';
import TrainIcon from '../assets/train.png';
import EsimIcon from '../assets/mobile.png';
import TaxiIcon from '../assets/car.png';
import BusIcon from '../assets/bus.png';
import WorkIcon from '../assets/aircraft.png';

const items = [
  {label: 'Business Travel', icon: WorkIcon},
  {label: 'e-Visa', icon: VisaIcon},
  {label: 'Trains', icon: TrainIcon},
  {label: 'eSIM', icon: EsimIcon},
  {label: 'Airport Transfers', icon: TaxiIcon},
  {label: 'Buses', icon: BusIcon},
];

const TravelMenuGrid = () => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <View style={styles.item}>
          <View style={styles.iconWrapper}>
            <Image
              source={item.icon}
              style={[styles.icon, {tintColor: '#f97316'}]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      )}
    />
  );
};

export default TravelMenuGrid;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 10,
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    marginVertical: 14,
    width: responsiveWidth(30),
  },
  iconWrapper: {
    backgroundColor: '#FEECEB',
    padding: 16,
    borderRadius: 50,
    marginBottom: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
});
