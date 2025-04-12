import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const visaFreeData = [
  {
    country: 'Nepal',
    price: '₹21,577',
    image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg',
  },
  {
    country: 'Qatar',
    price: '₹24,159',
    image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/555000/555257-qatar.jpg',
  },
  {
    country: 'Indonesia',
    price: '₹26,541',
    image: 'https://www.holidify.com/images/bgImages/BALI.jpg',
  },
  {
    country: 'Mauritius',
    price: '₹46,930',
    image: 'https://bigthink.com/wp-content/uploads/2022/02/1_8nBTmy5qQlhq-YhYsB4wzw.jpg',
  },
];

export default function VisaFreeScreen({ navigation }) {
  const renderCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.cardWrapper}
      onPress={() =>
        navigation.navigate('CityDetailScreen', {
          city: item.country,
          state: '',
          country: item.country,
          price: item.price,
          description: 'Explore the beauty of ' + item.country,
          image: item.image,
        })
      }>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}>
        <View style={styles.cardContent}>
          <Text style={styles.countryText}>{item.country}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.labelText}>Round-trip from</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={visaFreeData}
        renderItem={renderCard}
        keyExtractor={item => item.country}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(2) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cardWrapper: {
    width: responsiveWidth(92),
    height: responsiveHeight(25),
    borderRadius: responsiveWidth(3),
    overflow: 'hidden',
    marginBottom: responsiveHeight(1),
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageStyle: {
    borderRadius: responsiveWidth(3),
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
  },
  countryText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
  },
  priceContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  labelText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.6),
  },
  priceText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});