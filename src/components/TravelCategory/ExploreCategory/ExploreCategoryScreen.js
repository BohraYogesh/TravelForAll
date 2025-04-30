import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../../context/theme';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you're using Ionicons for the location icon

const ExploreCategoryScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { category, image, data } = route.params;
  console.log('Data', data);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category,
    });
  }, [navigation, category]);

  const renderHotelCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image.uri }} style={styles.hotelImage} />
        <View style={[styles.cardContent, {backgroundColor:colors.subbg}]}>
          <Text style={[styles.hotelName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.location, { color: colors.secondary }]}>
            <Icon name="location-outline" size={responsiveFontSize(1.8)} />{' '}
            {item.location.city}, {item.location.state}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ borderRadius: 5 }}>
              <Text style={styles.ratings}>{item.rating}</Text>
            </View>
            <View>
              <Text style={styles.rating}> {item.status}</Text>
              <Text style={[styles.ratinges, { color: colors.secondary }]}> {item.reviews}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={[styles.title, { color: colors.text }]}>{category}</Text>
      <Text style={[styles.description, { color: colors.secondary }]}>
        This screen shows destinations under the "{category}" category.
      </Text>

      {data && data.length > 0 && (
        <FlatList
          data={data[0].destinations} // Adjust this based on your actual data structure
          renderItem={renderHotelCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          scrollEnabled={false} // ScrollView already handles scrolling
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: responsiveHeight(25),
    resizeMode: 'cover',
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: responsiveFontSize(2),
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  hotelImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(16),
  },
  cardContent: {
    flex: 1,
    padding: responsiveWidth(3),
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(0.5),
  },
  location: {
    fontSize: responsiveFontSize(1.8),
    color: '#666',
    marginBottom: responsiveHeight(0.5),
  },
  ratings: {
    fontSize: responsiveFontSize(1.8),
    backgroundColor: '#388e3c',
    color: '#fff',
    fontWeight: '600',
    borderRadius: 5,
    padding: responsiveWidth(1),
  },
  rating: {
    fontSize: responsiveFontSize(1.8),
    color: '#388e3c',
    fontWeight: '600',
  },
  ratinges: {
    fontSize: responsiveFontSize(1.5),
    color: '#666',
  },
});

export default ExploreCategoryScreen;
