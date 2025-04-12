// src/components/PopularDestinations.js
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


export default function PopularDestination() {
  const navigation = useNavigation();

  // Group data into columns of 2 rows
  const groupedData = [];
  for (let i = 0; i < popularindiacities.length; i += 2) {
    const first = popularindiacities[i];
    const second = popularindiacities[i + 1];
    groupedData.push([first, second].filter(Boolean));
  }

  return (
    <View style={{padding: responsiveWidth(4)}}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.headerContainer}
        onPress={() => navigation.navigate('PopulorDestination')}>
        <View>
          <Text style={styles.title}>Popular Packages</Text>
          <Text style={styles.subtitle}>
            Estimated lowest fares found by users
          </Text>
        </View>
        <Icon
          name="chevron-right"
          size={responsiveFontSize(2.4)}
          color="#000"
        />
      </TouchableOpacity>

      <FlatList
        data={groupedData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `col-${index}`}
        renderItem={({item}) => (
          <View style={styles.column}>
            {item.map(city => (
              <TouchableOpacity
              activeOpacity={1}
                key={city.city}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('CityDetail', {
                    city: city.city,
                    state: city.state,
                    country: city.country,
                    price: city.price,
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
                <Text style={styles.label}>Round-trip from</Text>
                <Text style={styles.price}>{city.price}</Text>
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
    borderBottomLeftRadius: responsiveWidth(2),
    borderBottomRightRadius: responsiveWidth(2),
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
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
});
