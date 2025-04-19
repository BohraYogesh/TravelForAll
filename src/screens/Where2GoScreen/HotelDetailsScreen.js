import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../context/theme';

const HotelDetailsScreen = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { hotel } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: hotel.name });
  }, [navigation, hotel.name]);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={{ uri: hotel.image.uri }} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.name, { color: colors.text }]}>{hotel.name}</Text>
          <Text style={[styles.location, { color: colors.secondary }]}>
            {hotel.location.city}, {hotel.location.state}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            ₹{hotel.price} / night
          </Text>
          <Text style={styles.rating}>⭐ {hotel.rating}</Text>

          <Text style={[styles.description, { color: colors.text }]}>
            Enjoy your stay at {hotel.name}! This hotel offers comfortable accommodations and top-notch service for travelers visiting {hotel.location.city}.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom fixed footer */}
      <View style={[styles.footerBar, { backgroundColor: colors.card }]}>
        <Text style={[styles.footerPrice, { color: '#387c87' }]}>
          ₹{hotel.price} / night
        </Text>
        <TouchableOpacity
        activeOpacity={1}
          style={[styles.bookButton, { backgroundColor: '#387c87' }]}
          onPress={openModal}
        >
          <Text style={styles.bookButtonText}>Book Room</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Dates</Text>

            <View style={styles.dateRow}>
              {/* Check In */}
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.dateBox, { backgroundColor: colors.subbg }]}
                onPress={() => setShowCheckIn(true)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Icon name="calendar-alt" size={responsiveFontSize(2.8)} color={colors.text} />
                  <View>
                    <Text style={[styles.dateText, {color:colors.text}]}>Check in</Text>
                    <Text style={[styles.dateValue, { color: colors.text }]}>
                      {checkInDate.toDateString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Check Out */}
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.dateBox, { backgroundColor: colors.subbg }]}
                onPress={() => setShowCheckOut(true)}
              >
                <Text style={[styles.dateText, {color:colors.text}]}>Check out</Text>
                <Text style={[styles.dateValue, { color: colors.text }]}>
                  {checkOutDate.toDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            <Pressable onPress={closeModal} style={[styles.closeButton, { backgroundColor: colors.primary }]}>
              <Text style={{ color: '#fff' }}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: '100%',
    height: responsiveHeight(30),
  },
  content: {
    padding: responsiveWidth(4),
    paddingBottom: responsiveHeight(10),
  },
  name: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
  },
  location: {
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(0.5),
  },
  price: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
  rating: {
    fontSize: responsiveFontSize(2),
    color: '#f1c40f',
    marginTop: responsiveHeight(0.5),
  },
  description: {
    fontSize: responsiveFontSize(1.9),
    marginTop: responsiveHeight(2),
    lineHeight: responsiveHeight(3),
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerPrice: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
  bookButton: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: responsiveWidth(5),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    marginBottom: responsiveHeight(2),
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  dateBox: {
    flex: 1,
    padding: responsiveHeight(2),
    borderRadius: 10,
  },
  dateText: {
    fontSize: responsiveFontSize(1.8),
    marginBottom: 4,
  },
  dateValue: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  closeButton: {
    marginTop: responsiveHeight(3),
    backgroundColor: '#ff5a5f',
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'center',
    borderRadius: 10,
  },
});
