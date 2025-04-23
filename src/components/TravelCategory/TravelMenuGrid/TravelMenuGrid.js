import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../context/theme';
import { useNavigation } from '@react-navigation/native'; 

import VisaIcon from '../../../assets/mobile.png';
import TrainIcon from '../../../assets/train.png';
import EsimIcon from '../../../assets/mobile.png';
import TaxiIcon from '../../../assets/car.png';
import BusIcon from '../../../assets/bus.png';
import HotelIcon from '../../../assets/hotel1.png';
import WorkIcon from '../../../assets/aircraft.png';

const TravelMenuGrid = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation(); 

  const items = [
    { label: t('Flights'), icon: WorkIcon, screen: 'Flight' },
    { label: t('Hotels'), icon: HotelIcon, screen: 'Hotel' },
    { label: t('Trains'), icon: TrainIcon, screen: 'Trains' },
    { label: t('Buses'), icon: BusIcon, screen: 'Buses' },
    { label: t('Cabs'), icon: TaxiIcon, screen: 'Cabs' },
    { label: t('e-Visa'), icon: VisaIcon, screen: 'Visa' },
    { label: t('e-Sim'), icon: EsimIcon, screen: 'Esim' },
  ];

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={1} style={styles.item} onPress={() => handlePress(item.screen)}>
          <View style={[styles.iconWrapper, { backgroundColor: '#FEECEB' }]}>
            <Image
              source={item.icon}
              style={[styles.icon, { tintColor: '#f97316' }]}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.label, { color: colors?.text || '#333' }]}>
            {item.label}
          </Text>
        </TouchableOpacity>
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
