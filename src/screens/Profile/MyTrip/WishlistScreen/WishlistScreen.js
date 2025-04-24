import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../../../context/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const WishlistScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await AsyncStorage.getItem('wishlist');
        const savedWishlist = data ? JSON.parse(data) : [];
        setWishlist(savedWishlist);
      } catch (e) {
        console.error('Error loading wishlist:', e);
      }
    };

    loadWishlist();
  }, []);

  const removeFromWishlist = async id => {
    try {
      const updatedWishlist = wishlist.filter(item => item.id !== id);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
    } catch (e) {
      console.error('Error removing from wishlist:', e);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('CityDetail', {
          city: item.city,
          state: item.state,
          country: item.country,
          price: item.price,
          image: item.image,
          id: item.id,
        })
      }>
      <View style={[styles.card, {backgroundColor: colors.subbg}]}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.city, {color: colors.text}]}>{item.city}</Text>
          <Text style={[styles.state, {color: colors.secondary}]}>
            {item.state}, {item.country}
          </Text>
          <Text style={[styles.price, {color: colors.text}]}>
            ₹{item.price}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.removeButton, {backgroundColor: '#DC143C'}]}
          onPress={() => removeFromWishlist(item.id)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.bg}]}>
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, {color: colors.text}]}>
            No Wishlist Found
          </Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(4),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(20),
    height: responsiveHeight(45),
  },
  emptyText: {
    fontSize: responsiveFontSize(2.2),
    // fontWeight: 'bold',
    opacity: 0.5,
  },
  header: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    textAlign: 'center',
  },
  list: {
    paddingBottom: responsiveHeight(2),
  },
  card: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
    padding: responsiveWidth(3),
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: responsiveWidth(25),
    height: responsiveHeight(15),
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: responsiveWidth(4),
    flex: 1,
  },
  city: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  state: {
    fontSize: responsiveFontSize(1.5),
  },
  price: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  removeButton: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WishlistScreen;
