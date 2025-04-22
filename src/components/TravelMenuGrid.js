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
import {useTranslation} from 'react-i18next';
import { useTheme } from '../context/theme';
import VisaIcon from '../assets/mobile.png';
import TrainIcon from '../assets/train.png';
import EsimIcon from '../assets/mobile.png';
import TaxiIcon from '../assets/car.png';
import BusIcon from '../assets/bus.png';
import HotelIcon from '../assets/hotel1.png';
import WorkIcon from '../assets/aircraft.png';



const TravelMenuGrid = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const items = [
    { label: t('Flights'), icon: WorkIcon },
    { label: t('Hotels'), icon: HotelIcon },
    { label: t('Trains'), icon: TrainIcon },
    { label: t('Buses'), icon: BusIcon },
    { label: t('Cabs'), icon: TaxiIcon },
    { label: t('e-Visa'), icon: VisaIcon },
    { label: t('eSIM'), icon: EsimIcon },
  ];

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
