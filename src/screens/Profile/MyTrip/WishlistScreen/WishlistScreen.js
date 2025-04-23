import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../../../context/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const WishlistScreen = ({navigation}) => {
  const [wishlist, setWishlist] = useState([]);
  const {colors} = useTheme(); // 👈 access theme colors

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await AsyncStorage.getItem('wishlist');
        const parsedData = data ? JSON.parse(data) : [];
        setWishlist(parsedData);
      } catch (e) {
        console.error('Failed to load wishlist:', e);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadWishlist);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CityDetail', {...item})}
      style={[styles.card, {backgroundColor: colors.card}]}>
      {item.image && item.image !== null ? (
        <Image source={{uri: item.image}} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}

      <Text style={[styles.city, {color: colors.text}]}>{item.city}</Text>
      <Text style={[styles.country, {color: colors.textSecondary}]}>
        {item.country}
      </Text>
      <Text style={[styles.price, {color: colors.text}]}>
        ₹ {item.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {wishlist.length === 0 ? (
        <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
          No wishlisted places yet.
        </Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(4),
  },
  emptyText: {
    textAlign: 'center',
    marginTop: responsiveHeight(2.5),
    fontSize: responsiveFontSize(2),
  },
  card: {
    marginBottom: responsiveHeight(2),
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: responsiveHeight(22),
    borderRadius: responsiveWidth(2),
  },
  noImage: {
    width: '100%',
    height: responsiveHeight(22),
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
  },
  noImageText: {
    color: '#666',
    fontSize: responsiveFontSize(1.8),
  },
  city: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    marginTop: responsiveHeight(1.5),
  },
  country: {
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(0.5),
  },
  price: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
  },
});
