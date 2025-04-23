import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../../context/theme';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function DescriptionDetails() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {description} = route.params;
  const [error, setError] = useState(false);
  const [travelers, setTravelers] = useState(1);
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const travelerOptions = Array.from({length: 12}, (_, i) => i + 1);
  const cleanPrice = parseInt(description?.price.replace(/,/g, ''));
  const totalPrice = parseInt(travelers) * parseInt(cleanPrice);
  const formattedTotalPrice = totalPrice.toLocaleString();

  const handleBooking = () => {
    if (!travelers || travelers < 1) {
      setError(true);
    } else {
      setError(false);
      navigation.navigate('BookingDetails', {
        description: description,
        travelers: travelers,
        price: formattedTotalPrice,
      });
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{uri: description.image}} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.title, {color: colors.text}]}>
            {description.country}
          </Text>
          <Text style={[styles.description, {color: colors.secondary}]}>
            {description.des}
          </Text>
          <Text style={[styles.category, {color: colors.secondary}]}>
            Category: {description.category}
          </Text>
          <Text style={[styles.priceInfo, {color: colors.primary}]}>
            ₹ {description.price} / person
          </Text>

          {/* Inclusions Section */}
          <View style={styles.inclusionsSection}>
            <Text style={[styles.inclusionsTitle, {color: colors.text}]}>
              Inclusions
            </Text>
            <View style={styles.inclusionList}>
              <Text style={[styles.inclusionItem, {color: colors.secondary}]}>
                • Accommodation
              </Text>
              <Text style={[styles.inclusionItem, {color: colors.secondary}]}>
                • Guided Tours
              </Text>
              <Text style={[styles.inclusionItem, {color: colors.secondary}]}>
                • Equipment
              </Text>
              <Text style={[styles.inclusionItem, {color: colors.secondary}]}>
                • Meals
              </Text>
            </View>
          </View>
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
              <View
                style={[styles.modalContent, {backgroundColor: colors.card}]}>
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
        </View>
      </ScrollView>

      {/* Bottom Price & Book Now */}
      <View style={[styles.bottomBar, {backgroundColor: colors.subbg}]}>
        <Text style={[styles.price, {color: colors.primary}]}>
          ₹ {formattedTotalPrice}
        </Text>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={1}
          onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: responsiveHeight(30),
    // borderBottomLeftRadius: responsiveWidth(4),
    // borderBottomRightRadius: responsiveWidth(4),
  },
  content: {
    padding: responsiveWidth(4),
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  description: {
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(1),
  },
  category: {
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(1),
  },
  priceInfo: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginTop: responsiveHeight(0.5),
  },  
  inclusionsSection: {
    marginTop: responsiveHeight(1),
    paddingVertical: responsiveHeight(1),
  },
  inclusionsTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  inclusionList: {
    gap: responsiveHeight(1),
  },
  inclusionItem: {
    fontSize: responsiveFontSize(1.9),
  },
  bookingLabel: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
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
    fontSize: 16,
    color: '#333',
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  price: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#387c87',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveWidth(2),
  },
  bookButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});
