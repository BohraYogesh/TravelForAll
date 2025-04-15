import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../context/theme';

const HotelScreen = () => {
  const {colors} = useTheme();
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      {/* Destination Input */}
      <View style={[styles.inputRow, {backgroundColor: colors.subbg}]}>
        <Icon name="search" size={responsiveFontSize(2)} style={styles.icon} />
        <TextInput
          placeholder="Destination"
          placeholderTextColor={colors.secondary}
          value={destination}
          onChangeText={setDestination}
          style={[styles.textInput, {color: colors.text}]}
        />
      </View>

      {/* Date Pickers */}
      <View style={[styles.dateRow]}>
        <TouchableOpacity
          style={[styles.dateBox, {backgroundColor: colors.subbg}]}
          onPress={() => setShowCheckIn(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View>
              <Icon name="calendar-alt" size={responsiveFontSize(2.8)} color={colors.text}/>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.dateText}>Check in</Text>
              <Text style={[styles.dateValue, {color:colors.text}]}>{checkInDate.toDateString()}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[styles.dateBox, {backgroundColor: colors.subbg}]}
          onPress={() => setShowCheckOut(true)}>
          <Text style={[styles.dateText]}>Check out</Text>
          <Text style={[styles.dateValue, {color:colors.text}]}>{checkOutDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showCheckIn && (
        <DateTimePicker
          value={checkInDate}
          mode="date"
          display="default"
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
          display="default"
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
          style={[styles.icon, {color: colors.text}]}
        />
        <Text
          style={[styles.textInput, {color:colors.text}]}>{`${guests} Guests in ${rooms} Room`}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={[styles.modalContainer]}>
          <View style={[styles.modalBox, {backgroundColor:colors.bg}]}>
            <Text style={[styles.modalTitle, {color:colors.text}]}>Guests & Rooms</Text>

            <View style={styles.counterRow}>
              <Text style={[styles.labelText, {color:colors.text}]}>Guests:</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                activeOpacity={0.8}
                  style={[styles.counterButton, {backgroundColor:colors.button}]}
                  onPress={() => guests > 1 && setGuests(guests - 1)}>
                  <Text style={[styles.counterButtonText, {color:colors.text}]}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.counterValue, {color:colors.text}]}>{guests}</Text>
                <TouchableOpacity
                activeOpacity={0.8}
                  style={[styles.counterButton, {backgroundColor:colors.button} ]}
                  onPress={() => setGuests(guests + 1)}>
                  <Text style={[styles.counterButtonText, {color:colors.text}]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.counterRow}>
              <Text style={[styles.labelText, {color:colors.text}]}>Rooms:</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                activeOpacity={0.8}
                  style={[styles.counterButton, {backgroundColor:colors.button}]}
                  onPress={() => rooms > 1 && setRooms(rooms - 1)}>
                  <Text style={[styles.counterButtonText, {color:colors.text}]}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.counterValue, {color:colors.text}]}>{rooms}</Text>
                <TouchableOpacity
                activeOpacity={0.8}
                  style={[styles.counterButton, {backgroundColor:colors.button}]}
                  onPress={() => setRooms(rooms + 1)}>
                  <Text style={[styles.counterButtonText, {color:colors.text}]}>+</Text>
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

      {/* Search Button */}
      <TouchableOpacity activeOpacity={1} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search Hotels</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(8),
    paddingLeft: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(2),
    marginBottom: responsiveHeight(1.5),
    height: responsiveHeight(6),
  },
  icon: {
    marginRight: responsiveWidth(3),
    color: '#888',
  },
  textInput: {
    fontSize: responsiveFontSize(2),
    flex: 1,
    color: '#000',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
  },
  dateBox: {
    backgroundColor: '#F7F7F7',
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(3),
    width: '48%',
  },
  dateText: {
    fontSize: responsiveFontSize(1.6),
    color: '#777',
    marginTop: responsiveHeight(1),
  },
  dateValue: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: '#000',
    marginTop: responsiveHeight(0.5),
  },
  searchButton: {
    backgroundColor: '#f97316',
    paddingVertical: responsiveHeight(2),
    borderRadius: responsiveWidth(10),
    marginTop: responsiveHeight(4),
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: responsiveFontSize(2.2),
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(1.5),
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(5),
  },
  labelText: {
    fontSize: responsiveFontSize(2),
    color: '#000',
  },
  
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(4),
  },
  
  counterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  counterButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#000',
  },
  
  counterValue: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: '#000',
  },
  
  doneButton: {
    backgroundColor: '#f97316',
    marginTop: responsiveHeight(3),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
  },
  
  doneButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  
});

export default HotelScreen;
