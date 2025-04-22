import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../context/theme';

const SearchScreen = () => {
  const route = useRoute();
  const {
    checkInDate: paramCheckIn,
    checkOutDate: paramCheckOut,
    guests: paramGuests,
    rooms: paramRooms,
  } = route.params || {};

  const {colors} = useTheme();

  const [checkInDate, setCheckInDate] = useState(
    paramCheckIn ? new Date(paramCheckIn) : new Date(),
  );
  const [checkOutDate, setCheckOutDate] = useState(
    paramCheckOut ? new Date(paramCheckOut) : new Date(),
  );
  const [guests, setGuests] = useState(paramGuests || 1);
  const [rooms, setRooms] = useState(paramRooms || 1);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{padding: responsiveWidth(5)}}>
      {/* Date Row */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Check In */}
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.dateBox, {backgroundColor: colors.subbg}]}
          onPress={() => setShowCheckIn(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Icon
              name="calendar-alt"
              size={responsiveFontSize(2.8)}
              color={colors.text}
            />
            <View>
              <Text style={styles.dateText}>Check in</Text>
              <Text style={[styles.dateValue, {color: colors.text}]}>
                {checkInDate.toDateString()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Check Out */}
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.dateBox, {backgroundColor: colors.subbg}]}
          onPress={() => setShowCheckOut(true)}>
          <Text style={styles.dateText}>Check out</Text>
          <Text style={[styles.dateValue, {color: colors.text}]}>
            {checkOutDate.toDateString()}
          </Text>
        </TouchableOpacity>
      </View>

      {showCheckIn && (
        <DateTimePicker
          value={checkInDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selectedDate) => {
            setShowCheckIn(false);
            if (selectedDate) setCheckInDate(selectedDate);
          }}
          minimumDate={new Date()}
        />
      )}

      {showCheckOut && (
        <DateTimePicker
          value={checkOutDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selectedDate) => {
            setShowCheckOut(false);
            if (selectedDate) setCheckOutDate(selectedDate);
          }}
          minimumDate={checkInDate}
        />
      )}

      {/* Guests & Rooms */}
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.inputRow, {backgroundColor: colors.subbg}]}
        onPress={() => setModalVisible(true)}>
        <Icon
          name="door-open"
          size={responsiveFontSize(2)}
          style={styles.icon}
        />
        <Text style={[styles.textInput, {color: colors.text}]}>
          {`${guests} Guests in ${rooms} Room`}
        </Text>
      </TouchableOpacity>

      {/* Guests/Rooms Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, {backgroundColor: colors.bg}]}>
            <Text style={[styles.modalTitle, {color: colors.text}]}>
              Guests & Rooms
            </Text>

            {/* Guests Counter */}
            <View style={styles.counterRow}>
              <Text style={[styles.labelText, {color: colors.text}]}>
                Guests:
              </Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={[
                    styles.counterButton,
                    {backgroundColor: colors.button},
                  ]}
                  onPress={() => guests > 1 && setGuests(guests - 1)}>
                  <Text
                    style={[styles.counterButtonText, {color: colors.text}]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.counterValue, {color: colors.text}]}>
                  {guests}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.counterButton,
                    {backgroundColor: colors.button},
                  ]}
                  onPress={() => setGuests(guests + 1)}>
                  <Text
                    style={[styles.counterButtonText, {color: colors.text}]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Rooms Counter */}
            <View style={styles.counterRow}>
              <Text style={[styles.labelText, {color: colors.text}]}>
                Rooms:
              </Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={[
                    styles.counterButton,
                    {backgroundColor: colors.button},
                  ]}
                  onPress={() => rooms > 1 && setRooms(rooms - 1)}>
                  <Text
                    style={[styles.counterButtonText, {color: colors.text}]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.counterValue, {color: colors.text}]}>
                  {rooms}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.counterButton,
                    {backgroundColor: colors.button},
                  ]}
                  onPress={() => setRooms(rooms + 1)}>
                  <Text
                    style={[styles.counterButtonText, {color: colors.text}]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              style={styles.doneButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={styles.noResultContainer}>
          <Text style={[styles.noResultText, {color: colors.secondary}]}>
            Search Not Found
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    flex: 1,
    padding: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    marginRight: responsiveWidth(2),
  },
  dateText: {
    fontSize: responsiveFontSize(1.8),
    color: '#888',
  },
  dateValue: {
    fontSize: responsiveFontSize(1.8),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(2),
  },
  textInput: {
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),
  },
  icon: {
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    padding: responsiveHeight(3),
    borderTopLeftRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  labelText: {
    fontSize: responsiveFontSize(2),
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    padding: responsiveHeight(1),
    borderRadius: 5,
    marginHorizontal: 10,
  },
  counterButtonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: responsiveFontSize(2),
  },
  doneButton: {
    backgroundColor: '#387c87',
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
  loaderContainer: {
    marginTop: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
  },

  noResultContainer: {
    marginTop: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
  },

  noResultText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
});

export default SearchScreen;
