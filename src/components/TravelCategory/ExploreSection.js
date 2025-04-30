import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/theme';
import {useTranslation} from 'react-i18next';
import {useCurrency} from '../../context/CurrencyContext';
import ExploreCategoryHotels from '../TravelCategory/ExploreCategory/ExploreCategoryHotels.json'; 

const ExploreSection = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {selectedCurrency, conversionRate} = useCurrency();

  const getPriceWithCurrency = price => {
    let symbol = '';
    let calculatedPrice = price;
  
    if (selectedCurrency === 'USD') {
      calculatedPrice = (price * conversionRate).toFixed(2);
      symbol = '$';
      return `${symbol} ${calculatedPrice}`;
    } else if (selectedCurrency === 'INR') {
      symbol = '₹';
      const formattedPrice = new Intl.NumberFormat('en-IN').format(price);
      return `${symbol} ${formattedPrice}`;
    }
  
    return price;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Explore')}
        activeOpacity={1}
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={[styles.heading, {color: colors.text}]}>
          {t('Explore')}
        </Text>
        <Icon name="chevron-right" size={22} color={colors.secondary} />
      </TouchableOpacity>
      <FlatList
        data={ExploreCategoryHotels}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (item.title === 'Popular Packages') {
                navigation.navigate('PopulorDestination', {
                  category: item.title,
                  image: item.images[0],
                });
              } else if (item.title === 'Destinations') {
                navigation.navigate('VisaFreeCountry', {
                  category: item.title,
                  image: item.images[0],
                });
              } else {
                navigation.navigate('ExploreCategoryScreen', {
                  category: item.title,
                  image: item.images[0],
                  data: item.categories,
                });
              }
            }}>
            <View style={[styles.card, {backgroundColor: colors.subbg}]}>
              <View style={styles.imageGrid}>
                <Image
                  source={{uri: item.images[0]}}
                  style={styles.mainImage}
                />
                <View style={styles.smallImageColumn}>
                  <Image
                    source={{uri: item.images[1]}}
                    style={styles.smallImage}
                  />
                  <Image
                    source={{uri: item.images[2]}}
                    style={styles.smallImages}
                  />
                </View>
              </View>
              <Text
                style={[styles.cardTitle, {color: colors.text}]}>
                {item.title}
              </Text>
              <Text style={styles.subtitle}>
                {item.destinations} Destinations from
              </Text>
              <Text style={styles.price}>
                {getPriceWithCurrency(item.price)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 12,
    paddingBottom: 10,
    width: responsiveWidth(50),
  },
  imageGrid: {
    flexDirection: 'row',
    height: responsiveHeight(15),
  },
  mainImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderTopLeftRadius: 8,
  },
  smallImageColumn: {
    width: responsiveWidth(20),
    justifyContent: 'space-between',
    paddingLeft: 1,
  },
  smallImage: {
    height: responsiveHeight(7.5),
    width: responsiveWidth(20),
    borderTopRightRadius: 12,
  },
  smallImages: {
    height: responsiveHeight(7.4),
    width: responsiveWidth(20),
  },
  cardTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  subtitle: {
    fontSize: responsiveFontSize(1.6),
    color: '#888',
    paddingHorizontal: 8,
  },
  price: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: '#2ecc71',
    paddingHorizontal: 8,
  },
});

export default ExploreSection;
