import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TravelMenuGrid from '../components/TravelMenuGrid';
import ExploreSection from '../components/TravelCategory/ExploreSection';
import PopularDestination from '../components/PopularDestination';
import FlightsIcon from '../assets/plane.png';
import HotelsIcon from '../assets/hotel.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../context/theme';


const data = [
  {
    id: 1,
    title: 'Magnificent mountains and hill...',
    image: {
      uri: 'https://i.pinimg.com/736x/eb/06/ca/eb06caca7b3e5ede3f763b2343e9aa74.jpg',
    },
  },
  {
    id: 2,
    title: 'Manali Calling',
    image: {
      uri: 'https://www.himachaltourspackage.org/images/shimla-tour3.jpg',
    },
  },
  {
    id: 3,
    title: 'Luxury Hotel in Mussoorie',
    image: {
      uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/c2/cd/46/aerial-view.jpg?w=1200&h=-1&s=1',
    },
  },
  {
    id: 4,
    title: 'Explore Nainital',
    image: {
      uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/30/3a/3c/mesmerizing.jpg?w=1200&h=-1&s=1',
    },
  },
];

const cardsData = [
  {label: 'Flights', icon: FlightsIcon, screen: 'Flight'},
  {label: 'Hotels', icon: HotelsIcon, screen: 'Hotel'},
];

export default function Home() {
  const navigation = useNavigation();
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const {colors} = useTheme();


  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('GemDetailScreen', {item})}
      style={[styles.card, {backgroundColor: colors.subbg}]}>
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.title, {color:colors.text}]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=2070&q=80',
        }}
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(30),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingTop: 20,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Profile')}>
            <Icon name="user-circle" size={28} color="#1C1C1C" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Notification')}>
            <MaterialIcon name="notifications" size={28} color="#1C1C1C" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Flights and Hotels Cards */}
      <View style={[styles.containerss]}>
        {cardsData.map((card, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            style={[styles.cardss, {backgroundColor: colors.subbg}]}
            onPress={() => navigation.navigate(card.screen)}>
            <Image
              source={card.icon}
              style={[styles.iconss, {tintColor: '#f97316'}]}
              resizeMode="contain"
            />
            <Text style={[styles.labelss, {color: colors.text}]}>{card.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <TravelMenuGrid /> */}

      {/* Destination Input */}
      <View style={{paddingHorizontal: 15, marginTop: responsiveHeight(2)}}>
        <View style={[styles.inputRow, {backgroundColor: colors.subbg}]}>
          <Icon
            name="search"
            size={responsiveFontSize(2)}
            style={styles.icon}
          />
          <TextInput
            placeholder="Where to go ?"
            placeholderTextColor="#888"
            value={destination}
            onChangeText={setDestination}
            style={[styles.textInput, {color:colors.text}]}
          />
        </View>

        {/* Date Pickers */}
        <View style={[styles.dateRow]}>
          <TouchableOpacity
            style={[styles.dateBox, {backgroundColor: colors.subbg}]}
            onPress={() => setShowCheckIn(true)}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View>
                <Icon name="calendar-alt" size={responsiveFontSize(2.8)} style={{color: colors.text}} />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.dateText}>Check in</Text>
                <Text style={[styles.dateValue, {color:colors.text}]}>
                  {checkInDate.toDateString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={[styles.dateBox, {backgroundColor: colors.subbg}]}
            onPress={() => setShowCheckOut(true)}>
            <Text style={styles.dateText}>Check out</Text>
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
            style={styles.icon}
          />
          <Text
            style={
              [styles.textInput, {color: colors.text}]
            }>{`${guests} Guests in ${rooms} Room`}</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={[styles.modalBox, {backgroundColor: colors.bg}]}>
              <Text style={[styles.modalTitle, {color:colors.text}]}>Guests & Rooms</Text>

              <View style={styles.counterRow}>
                <Text style={[styles.labelText, {color:colors.text}]}>Guests:</Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.counterButton, {backgroundColor:colors.button}]}
                    onPress={() => guests > 1 && setGuests(guests - 1)}>
                    <Text style={[styles.counterButtonText, {color:colors.text}]}>-</Text>
                  </TouchableOpacity>
                  <Text style={[styles.counterValue, {color:colors.text}]}>{guests}</Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.counterButton, {backgroundColor:colors.button}]}
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
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity activeOpacity={1} style={styles.searchButton}>
            <Icon
              name="search"
              size={responsiveFontSize(2)}
              style={{color: '#fff'}}
            />
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PopularDestination />
      <ExploreSection />

      {/* Hidden Gems Section */}
      <View style={styles.container}>
        <Text style={[styles.heading, {color:colors.text}]}>Hidden Gems</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 12}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    marginLeft: 16,
    marginBottom: 10,
  },
  card: {
    width: responsiveWidth(50),
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(2),
    marginRight: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
    overflow: 'hidden',
    borderColor: '#ddd',
    // borderWidth: 1,
  },
  image: {
    width: responsiveWidth(55),
    height: 130,
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    padding: 10,
    color: '#000',
  },
  containerss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -50,
  },
  cardss: {
    width: responsiveWidth(40),
    height: responsiveHeight(15),
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 4,
  },
  iconss: {
    width: responsiveWidth(13),
    height: responsiveHeight(8),
  },
  labelss: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#111',
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
    marginRight: responsiveWidth(2),
    color: '#888',
    fontSize: responsiveFontSize(1.8),
  },

  textInput: {
    fontSize: responsiveFontSize(1.8),
    flex: 1,
    color: '#000',
    paddingVertical: 0,
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
  },
  dateBox: {
    backgroundColor: '#fff',
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
    // fontWeight: 'bold',
    color: '#000',
    marginTop: responsiveHeight(0.5),
  },
  searchButton: {
    backgroundColor: '#387c87',
    flexDirection: 'row',
    gap: responsiveWidth(2),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveHeight(3),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: responsiveFontSize(2),
    color: '#fff',
    fontWeight: 'bold',
    Width: responsiveWidth(50),
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
