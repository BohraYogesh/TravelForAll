import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
  Alert,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTheme} from '../context/theme';
// import i18n from '../constants/Language';

const CityDetailScreen = ({route, navigation}) => {
  const {colors} = useTheme();
  // const { t } = useTranslation();
  const {city, state, country, price, description, image} = route.params;
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    navigation.setOptions({title: city});
  }, [navigation, city]);

  const renderTabs = () => {
    const tabs = ['Overview', 'Itinerary', 'Inclusions', 'Reviews'];
    return (
      <View
        style={[styles.tabsContainer, {backgroundColor: colors.background}]}>
        {tabs.map(tab => (
          <TouchableOpacity
            activeOpacity={1}
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && {
                  color: colors.primary,
                  fontWeight: 'bold',
                },
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Tour Overview
            </Text>
            <Text style={[styles.description, {color: colors.text}]}>
              Experience the best of {city} with our all-inclusive package.
              Explore pristine beaches, ancient temples, and vibrant culture.
              This carefully curated tour offers the perfect blend of cultural
              immersion, natural beauty, and leisure time. Whether you're
              seeking adventure, relaxation, or a deeper understanding of local
              cultures, this package provides an unforgettable experience
              tailored to diverse interests and preferences.
            </Text>

            <Text
              style={[
                styles.sectionTitle,
                {color: colors.text, marginTop: responsiveHeight(3)},
              ]}>
              Tour Highlights
            </Text>

            <View style={styles.highlightGrid}>
              {[
                'Expertly guided cultural tours',
                'Comfortable accommodation throughout',
                'Small group experience (max 12 people)',
                'Authentic local cuisine experiences',
                'Scenic natural landscapes',
                'Free time for personal exploration',
              ].map((item, index) => (
                <View key={index} style={styles.highlightItem}>
                  <Feather name="check-circle" size={20} color="#27ae60" />
                  <Text style={[styles.highlightText, {color: colors.text}]}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.infoBox}>
              <Feather name="info" size={20} color="#2980b9" />
              <View style={{marginLeft: 10}}>
                <Text style={styles.infoTitle}>Important Information</Text>
                <Text style={styles.infoTextBox}>
                  This tour requires a moderate level of fitness as it includes
                  walking tours and some outdoor activities. Please notify us of
                  any specific dietary requirements or medical conditions when
                  booking.
                </Text>
              </View>
            </View>
          </View>
        );

      case 'Itinerary':
        return (
          <ScrollView
            contentContainerStyle={styles.tabContent}
            nestedScrollEnabled>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Tour Itinerary
            </Text>
            {[
              {
                day: 'Day 1',
                title: 'Arrival & Welcome Dinner',
                desc: 'Arrive at your destination and be greeted by our local representative. Transfer to your hotel and check-in. In the evening, join the group for a welcome dinner featuring local cuisine.',
              },
              {
                day: 'Day 2',
                title: 'City Tour & Cultural Experience',
                desc: 'After breakfast, embark on a comprehensive city tour visiting key landmarks and historical sites. Enjoy lunch at a local restaurant followed by an immersive cultural experience in the afternoon.',
              },
              {
                day: 'Day 3',
                title: 'Nature Excursion',
                desc: 'Today is dedicated to exploring the natural beauty surrounding the area. Visit scenic viewpoints, take nature walks, and enjoy a picnic lunch amid stunning landscapes.',
              },
              {
                day: 'Day 4',
                title: 'Free Day for Optional Activities',
                desc: 'Enjoy a free day to explore on your own or choose from our selection of optional activities (at additional cost), including adventure sports, cooking classes, or spa treatments.',
              },
              {
                day: 'Day 5',
                title: 'Departure',
                desc: 'After breakfast, check out from your hotel. Depending on your flight schedule, enjoy some free time for last-minute shopping before your transfer to the airport.',
              },
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  marginBottom: responsiveHeight(2.5),
                  paddingBottom: responsiveHeight(1),
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}>
                <Text style={[styles.itineraryDay, {color: colors.primary}]}>
                  {item.day}:{' '}
                  <Text style={{fontWeight: 'bold', color: colors.text}}>
                    {item.title}
                  </Text>
                </Text>
                <Text style={[styles.itineraryDesc, {color: colors.text}]}>
                  {item.desc}
                </Text>
              </View>
            ))}

            <View style={styles.infoBox}>
              <Feather name="info" size={20} color="#2980b9" />
              <View style={{marginLeft: 10}}>
                <Text style={styles.infoTitle}>Itinerary Note</Text>
                <Text style={styles.infoTextBox}>
                  The itinerary may be subject to change due to weather
                  conditions or unforeseen circumstances. Our guides will always
                  work to provide the best possible experience.
                </Text>
              </View>
            </View>
          </ScrollView>
        );

      case 'Inclusions':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              What's Included
            </Text>
            {[
              'Hotel accommodation',
              'Daily breakfast',
              'Airport transfers',
              'Local guide support',
              'Entry tickets',
              'Sightseeing tours',
            ].map((item, index) => (
              <View style={styles.bulletItem} key={index}>
                <Feather name="check-circle" size={18} color={colors.primary} />
                <Text style={[styles.bulletText, {color: colors.text}]}>
                  {' '}
                  {item}
                </Text>
              </View>
            ))}
          </View>
        );

      case 'Reviews':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Traveler Reviews
            </Text>
            <Text style={[styles.description, {color: colors.text}]}>
              ⭐⭐⭐⭐ "Beautiful experience, highly recommended!"{'\n\n'}
              ⭐⭐⭐⭐⭐ "Loved every moment, great guide and service!"{'\n\n'}
              ⭐⭐⭐⭐ "Will definitely book again with this agency."
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  const BookingCard = () => {
    const {colors} = useTheme();
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [travelers, setTravelers] = useState(1);
    const [showTravelerModal, setShowTravelerModal] = useState(false);

    const handleDateChange = (event, date) => {
      setShowDatePicker(false);
      if (date) setSelectedDate(date.toDateString());
    };

    useEffect(() => {
      const loadWishlist = async () => {
        try {
          const data = await AsyncStorage.getItem('wishlist');
          const wishlist = data ? JSON.parse(data) : [];
          const already = wishlist.find(i => i.id === description.id);
          setIsWishlisted(!!already);
        } catch (e) {
          console.error('Error loading wishlist:', e);
        }
      };

      loadWishlist();
    }, [description.id]);

    const toggleWishlist = async () => {
      try {
        const data = await AsyncStorage.getItem('wishlist');
        const wishlist = data ? JSON.parse(data) : [];

        let updatedWishlist;

        if (isWishlisted) {
          // Remove from wishlist
          updatedWishlist = wishlist.filter(i => i.id !== description.id);
        } else {
          // Add to wishlist
          updatedWishlist = [...wishlist, description];
        }

        // Update AsyncStorage with the new list
        await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

        // Update local state
        setIsWishlisted(prevState => !prevState); // Flip the state
      } catch (e) {
        console.error('Error updating wishlist:', e);
      }
    };

    const travelerOptions = Array.from({length: 12}, (_, i) => i + 1);
    const cleanPrice = parseInt(price.replace(/,/g, ''));
    const totalPrice = parseInt(travelers) * parseInt(cleanPrice);
    const formattedTotalPrice = totalPrice.toLocaleString();

    return (
      <View style={[styles.bookingCard, {backgroundColor: colors.card}]}>
        {/* Price */}
        <View style={styles.priceHeader}>
          <Text style={[styles.pricePerPerson, {color: colors.primary}]}>
            ₹ {price}
          </Text>
          <Text style={[styles.perPerson, {color: colors.text}]}>
            per person
          </Text>
        </View>

        {/* Date Picker */}
        <Text style={[styles.bookingLabel, {color: colors.text}]}>
          Select Travel Date
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowDatePicker(true)}
          style={[styles.dropdown, {borderColor: colors.border}]}>
          <Text
            style={[
              styles.dropdownText,
              {color: selectedDate ? colors.text : '#999'},
            ]}>
            {selectedDate ? selectedDate : 'Select a date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Traveler Picker */}
        <Text style={[styles.bookingLabel, {color: colors.text}]}>
          Number of Travelers
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.dropdown, {borderColor: colors.border}]}
          onPress={() => setShowTravelerModal(true)}>
          <Text style={[styles.dropdownText, {color: colors.text}]}>
            {travelers} Traveler{travelers > 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>

        <Modal visible={showTravelerModal} transparent animationType="fade">
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.modalOverlay, {backgroundColor: colors.subbg}]}
            onPress={() => setShowTravelerModal(false)}>
            <View style={[styles.modalContent, {backgroundColor: colors.card}]}>
              <FlatList
                data={travelerOptions}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.optionItem}
                    onPress={() => {
                      setTravelers(item);
                      setShowTravelerModal(false);
                    }}>
                    <Text style={[styles.optionText, {color: colors.text}]}>
                      {item} Traveler{item > 1 ? 's' : ''}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Price Breakdown */}
        <View style={styles.divider} />
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, {color: colors.text}]}>
            Base price:
          </Text>
          <Text style={[styles.priceValue, {color: colors.text}]}>
            ₹ {price}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, {color: colors.text}]}>
            Travelers:
          </Text>
          <Text style={[styles.priceValue, {color: colors.text}]}>
            x {travelers}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.totalLabel, {color: colors.text}]}>Total:</Text>
          <Text style={[styles.totalPrice, {color: colors.text}]}>
            ₹ {formattedTotalPrice}
          </Text>
        </View>

        {/* Actions */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('BookingDetails', {
              description,
              city,
              travelers,
              price: formattedTotalPrice,
            });
          }}
          style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={styles.wishlistBtn}
          onPress={toggleWishlist}>
          <FontAwesome
            name={isWishlisted ? 'heart' : 'heart-o'}
            size={18}
            color={isWishlisted ? '#1abc9c' : colors.text}
          />
          <Text style={[styles.wishlistText, {color: colors.text}]}>
            {isWishlisted ? ' Wishlisted' : ' Add to Wishlist'}
          </Text>
        </TouchableOpacity>

        {/* Notes */}
        <View style={styles.noteRow}>
          <Feather name="calendar" size={18} color={colors.text} />
          <Text style={[styles.noteText, {color: colors.text}]}>
            {' '}
            Free cancellation up to 30 days before departure
          </Text>
        </View>

        <View style={styles.noteRow}>
          <Feather name="users" size={18} color={colors.text} />
          <Text style={[styles.noteText, {color: colors.text}]}>
            {' '}
            Small group experience with maximum 12 people
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: colors.background}}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.imageOverlay}>
          <Text style={[styles.title, {color: colors.text}]}>
            {city}
            {state ? `, ${state}` : ''}
          </Text>
        </View>
      </View>

      {renderTabs()}
      {renderTabContent()}
      <BookingCard />
    </ScrollView>
  );
};

export default CityDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  imageContainer: {
    position: 'relative',
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
  },

  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#fff',
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    paddingVertical: responsiveHeight(1.2),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  activeTabButton: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#2980b9',
  },
  tabText: {
    fontSize: responsiveFontSize(1.8),
    color: '#666',
  },
  tabContent: {
    padding: responsiveWidth(4),
  },
  subtitle: {
    fontSize: responsiveFontSize(2),
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  highlightGrid: {
    justifyContent: 'space-between',
    marginTop: responsiveHeight(1),
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  highlightText: {
    marginLeft: 8,
    fontSize: responsiveFontSize(2),
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#eaf4ff',
    padding: responsiveWidth(3),
    borderRadius: 10,
    marginTop: responsiveHeight(3),
    alignItems: 'flex-start',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    color: '#2980b9',
  },
  infoTextBox: {
    fontSize: responsiveFontSize(1.7),
    color: '#333',
    marginTop: 4,
    paddingRight: responsiveWidth(2),
  },
  infoText: {
    fontSize: responsiveFontSize(1.7),
    color: '#333',
    marginTop: 4,
    lineHeight: responsiveHeight(2.3),
  },
  itineraryDay: {
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(0.5),
    marginTop: responsiveHeight(1),
  },
  itineraryDesc: {
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveHeight(2.5),
  },
  description: {
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveHeight(2.5),
    marginBottom: responsiveHeight(1.5),
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  bulletText: {
    fontSize: responsiveFontSize(2),
  },
  bookingCard: {
    borderRadius: 12,
    padding: responsiveWidth(4),
    margin: responsiveWidth(4),
    backgroundColor: '#fff',
  },
  pricePerPerson: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    maxHeight: 300,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: responsiveFontSize(2),
    color: '#333',
  },

  perPerson: {
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(2),
  },
  bookingLabel: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  dropdownText: {
    fontSize: responsiveFontSize(1.8),
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceLabel: {
    fontSize: responsiveFontSize(1.8),
    color: '#666',
  },
  priceValue: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  totalLabel: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: '#000',
  },
  bookBtn: {
    backgroundColor: '#1abc9c',
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  bookBtnText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  wishlistBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    justifyContent: 'center',
  },
  wishlistText: {
    fontSize: responsiveFontSize(1.8),
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  noteText: {
    fontSize: responsiveFontSize(1.6),
    marginLeft: 5,
  },
});
