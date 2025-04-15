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
import { useTheme } from '../../../context/theme';

const visaRequiredData = [
  {
    country: 'USA',
    price: '₹85,320',
    image: 'https://www.gokitetours.com/wp-content/uploads/2023/12/Visit-USA.webp',
  },
  {
    country: 'United Kingdom',
    price: '₹78,200',
    image: 'https://i.natgeofe.com/k/9413af87-986a-4d3a-9f9f-7436f1717578/Stonehenge_UK_KIDS_0223-crop.jpg?wp=1&w=1084.125&h=611.625',
  },
  {
    country: 'Australia',
    price: '₹92,150',
    image: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
  },
  {
    country: 'Canada',
    price: '₹88,000',
    image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/216000/216226-British-Columbia.jpg',
  },
];

export default function Visaon({ navigation }) {
  const { colors} = useTheme();
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
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <FlatList
        data={visaRequiredData}
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
