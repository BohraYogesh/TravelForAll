import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import popularindiacities from './popular_indian_cities.json';
import {useTheme} from '../context/theme';
import {useTranslation} from 'react-i18next';
import {useCurrency} from '../context/CurrencyContext';

export default function PopularDestination() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {selectedCurrency, conversionRate} = useCurrency();

  const groupedData = [];
  for (let i = 0; i < popularindiacities.length; i += 2) {
    const first = popularindiacities[i];
    const second = popularindiacities[i + 1];
    groupedData.push([first, second].filter(Boolean));
  }

  const getPriceWithCurrency = price => {
    let symbol = '';
    let formattedPrice = price;

    switch (selectedCurrency) {
      case 'USD':
        symbol = '$';
        formattedPrice = (price * conversionRate).toFixed(2);
        break;
      case 'INR':
        symbol = '₹';
        formattedPrice = new Intl.NumberFormat('en-IN').format(price);
        break;
      default:
        formattedPrice = price;
    }

    return `${symbol} ${formattedPrice}`;
  };

  return (
    <View style={{padding: responsiveWidth(4), backgroundColor: colors.bg}}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.headerContainer}
        onPress={() => navigation.navigate('PopulorDestination')}>
        <View>
          <Text style={[styles.title, {color: colors.text}]}>
            {t('Popular Packages')}
          </Text>
          <Text style={styles.subtitle}>
            {t('Estimated lowest fares found by users')}
          </Text>
        </View>
        <Icon
          name="chevron-right"
          size={responsiveFontSize(2.4)}
          color={colors.secondary}
        />
      </TouchableOpacity>

      <FlatList
        data={groupedData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `col-${index}`}
        renderItem={({item}) => (
          <View style={[styles.column]}>
            {item.map((city, index) => (
              <TouchableOpacity
                activeOpacity={1}
                key={city.city}
                style={[
                  styles.card,
                  {
                    marginBottom:
                      index !== item.length - 1 ? responsiveHeight(2) : 0,
                    backgroundColor: colors.subbg,
                    borderRadius: responsiveWidth(2),
                  },
                ]}
                onPress={() =>
                  navigation.navigate('CityDetail', {
                    id: city.id,
                    city: city.city,
                    state: city.state,
                    country: city.country,
                    price:
                      selectedCurrency === 'USD'
                        ? (city.price * conversionRate).toFixed(2)
                        : city.price,
                    description: city.description,
                    image: city.image.uri,
                  })
                }>
                <ImageBackground
                  source={{uri: city.image.uri}}
                  style={styles.image}
                  imageStyle={{borderRadius: responsiveWidth(2)}}>
                  <View style={styles.overlay}>
                    <Text style={styles.city}>{city.city}</Text>
                    <Text style={styles.country}>{city.country}</Text>
                  </View>
                </ImageBackground>
                <Text style={styles.label}>{t('Round-trip from')}</Text>
                <Text style={styles.price}>
                  {getPriceWithCurrency(city.price)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
  },
  subtitle: {
    fontSize: responsiveFontSize(1.6),
    color: 'gray',
    marginTop: responsiveHeight(0.5),
  },
  column: {
    flexDirection: 'column',
    marginRight: responsiveWidth(4),
  },
  card: {
    width: responsiveWidth(36),
    marginBottom: responsiveHeight(2),
  },
  image: {
    height: responsiveHeight(18),
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: responsiveWidth(2),
    backgroundColor: 'rgba(0,0,0,0.3)',
    // borderBottomLeftRadius: responsiveWidth(2),
    // borderBottomRightRadius: responsiveWidth(2),
  },
  city: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  country: {
    color: '#fff',
    fontSize: responsiveFontSize(1.6),
  },
  label: {
    color: 'gray',
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(1.5),
    paddingHorizontal: responsiveWidth(2),
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
});
