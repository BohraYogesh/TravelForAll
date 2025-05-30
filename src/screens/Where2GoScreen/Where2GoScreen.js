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
import { useCurrency } from '../../context/CurrencyContext';

const cities = ['All', 'Pune', 'Lonavala', 'Jaipur', 'Udaipur', 'Jodhpur', 'Pushkar', 'Bikaner'];

const Where2GoHotelsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { selectedCurrency, conversionRate } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [randomizedHotels, setRandomizedHotels] = useState([]);

  const allHotels = rajasthanHotels.flatMap(city => city.hotels);

  useEffect(() => {
    if (selectedCity === 'All') {
      // Shuffle hotels randomly when screen mounts or selectedCity changes to All
      const shuffledHotels = [...allHotels].sort(() => Math.random() - 0.5);
      setRandomizedHotels(shuffledHotels);
    }
  }, [selectedCity]);

  const filteredHotels = (selectedCity === 'All' ? randomizedHotels : allHotels).filter(hotel => {
    const matchesCity =
      selectedCity === 'All' ||
      hotel.location?.city?.toLowerCase() === selectedCity.toLowerCase();

    const matchesSearch =
      hotel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location?.state?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesSearch;
  });

  const getCurrencySymbol = () => {
    switch (selectedCurrency) {
      case 'USD':
        return '$';
      case 'INR':
        return '₹';
      default:
        return '';
    }
  };

  const convertPrice = (price) => {
    if (selectedCurrency === 'USD') {
      return (price * conversionRate).toFixed(2);
    } else if (selectedCurrency === 'INR') {
      return price;
    }
    return price;
  };

  const renderHotelCard = ({ item }) => {
    const priceInSelectedCurrency = convertPrice(item.price);

    return (
      <View style={[styles.card, { backgroundColor: colors.subbg }]}>
        <Image source={{ uri: item.image.uri }} style={styles.image} />
        <View style={styles.details}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.location, { color: colors.secondary }]}>
            {item.location.city}, {item.location.state}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            {getCurrencySymbol()} {priceInSelectedCurrency} / night
          </Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.button, { backgroundColor: '#387c87' }]}
            onPress={() => navigation.navigate('HotelDetails', { hotel: item, price: priceInSelectedCurrency })}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        navigation.setOptions({ tabBarStyle: { display: 'none' } });
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        navigation.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    );

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
                backgroundColor: selectedCity === city ? '#387c87' : colors.card,
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
    height: responsiveHeight(5.2),
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
