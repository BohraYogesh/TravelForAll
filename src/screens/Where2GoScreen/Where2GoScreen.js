import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/theme';
import rajasthanHotels from '../../components/data/rajasthanHotels.json';

const cities = ['All', 'Jaipur', 'Udaipur', 'Jodhpur', 'Pushkar', 'Bikaner'];

const Where2GoHotelsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const allHotels = rajasthanHotels.flatMap(city => city.hotels);

  const filteredHotels = allHotels.filter(hotel => {
    const matchesCity =
      selectedCity === 'All' ||
      hotel.location?.city?.toLowerCase() === selectedCity.toLowerCase();

    const matchesSearch =
      hotel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location?.state?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesSearch;
  });

  const renderHotelCard = ({ item }) => {
    return (
      <View style={[styles.card, { backgroundColor: colors.subbg }]}>
        <Image source={{ uri: item.image.uri }} style={styles.image} />
        <View style={styles.details}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.location, { color: colors.secondary }]}>
            {item.location.city}, {item.location.state}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            ₹{item.price} / night
          </Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('HotelDetails', { hotel: item })}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Keyboard event listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        navigation.setOptions({ tabBarStyle: { display: 'none' } }); // Hide bottom tab
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        navigation.setOptions({ tabBarStyle: { display: 'flex' } }); // Show bottom tab
      }
    );

    // Cleanup listeners on unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Search hotels..."
        placeholderTextColor={colors.secondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[
          styles.searchInput,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {cities.map(city => (
          <TouchableOpacity
            activeOpacity={1}
            key={city}
            onPress={() => setSelectedCity(city)}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  selectedCity === city ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: selectedCity === city ? '#fff' : colors.text,
                fontWeight: '600',
                fontSize: responsiveFontSize(1.8),
              }}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredHotels.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsText, { color: colors.secondary }]}>
            No Hotel Available
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredHotels}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHotelCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: responsiveHeight(5) }}
        />
      )}
    </View>
  );
};

export default Where2GoHotelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(2),
  },
  searchInput: {
    width: '100%',
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2),
    borderWidth: 1,
  },
  categoryScroll: {
    marginBottom: responsiveHeight(2),
  },
  categoryButton: {
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(1.5),
    marginRight: responsiveWidth(3),
    marginBottom: responsiveWidth(3),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(5.2), // fix: enough height to show full text
  },

  card: {
    borderRadius: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: responsiveHeight(25),
  },
  details: {
    padding: responsiveWidth(4),
  },
  name: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
  location: {
    fontSize: responsiveFontSize(1.8),
    marginVertical: responsiveHeight(0.5),
  },
  price: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  rating: {
    fontSize: responsiveFontSize(1.8),
    color: '#f1c40f',
    marginTop: responsiveHeight(0.5),
  },
  button: {
    marginTop: responsiveHeight(1.2),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: '#fff',
    fontWeight: '600',
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: responsiveHeight(20),
  },
  noResultsText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
  },
});
