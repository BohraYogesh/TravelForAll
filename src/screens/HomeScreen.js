import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import TravelMenuGrid from '../components/TravelMenuGrid';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ExploreSection from '../components/TravelCategory/ExploreSection';
import PopularDestination from '../components/PopularDestination';
import FlightsIcon from '../assets/plane.png';
import HotelsIcon from '../assets/hotel.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const data = [
  {
    title: 'Magnificent mountains and hill...',
    image: {
      uri: 'https://i.pinimg.com/736x/eb/06/ca/eb06caca7b3e5ede3f763b2343e9aa74.jpg',
    }, // Replace with actual
  },
  {
    title: 'Manali Calling',
    image: {
      uri: 'https://www.himachaltourspackage.org/images/shimla-tour3.jpg',
    },
  },
  {
    title: 'Luxury Hotel in Mussoorie',
    image: {
      uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/c2/cd/46/aerial-view.jpg?w=1200&h=-1&s=1',
    },
  },
  {
    title: 'Explore Nainital',
    image: {
      uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/30/3a/3c/mesmerizing.jpg?w=1200&h=-1&s=1',
    },
  },
  // Add more destinations here
];

const exploreData = [
  {
    title: 'Popular Destinations',
    destinations: 87,
    price: '₹4,233',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fd/Dubai_Expo_2020.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f6/Kuwait_Towers.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4e/Gateway_of_India_Mumbai.jpg',
    ],
  },
  {
    title: 'Visa-free Countries',
    destinations: 60,
    price: '₹17,875',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/d/db/Corfu_town_canal.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/8b/Altun_Ha_Ruins_Belize.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e4/San_Blas_Panama.jpg',
    ],
  },
];

const cardsData = [
  {label: 'Flights', icon: FlightsIcon, screen: 'Flight',},
  {label: 'Hotels', icon: HotelsIcon, screen: 'Hotel',},
];

export default function Home() {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={{flex: 1}}>
      {/* <CustomHeader /> */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
          {/* Profile Icon (FontAwesome) */}
          <TouchableOpacity onPress={() => console.log('Profile pressed')} activeOpacity={0.8}>
            <Icon name="user-circle" size={28} color="gray" />
          </TouchableOpacity>

          {/* Notification Icon (MaterialIcons) */}
          <TouchableOpacity
            onPress={() => console.log('Notifications pressed')}>
            <MaterialIcon name="notifications" size={28} color="gray" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* <TopServiceCards /> */}
      <View style={styles.containerss}>
        {cardsData.map((card, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.cardss}
            onPress={() => navigation.navigate(card.screen)}>
            <Image
              source={card.icon}
              style={[styles.iconss, {tintColor: '#f97316'}]}
              resizeMode="contain"
            />
            <Text style={styles.labelss}>{card.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TravelMenuGrid />
      <View style={styles.container}>
        <Text style={styles.heading}>Hidden Gems</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 12}}
        />
      </View>
      <ExploreSection />
      <PopularDestination />
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
    borderRadius: 8,
    marginRight: 16,
    overflow: 'hidden',
    borderColor: '#ddd',
    borderWidth: 1,
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
    justifyContent:'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 4,
  },
  iconss: {
    width: responsiveWidth(13),
    height: responsiveHeight(8),
    // marginBottom: 10,
  },
  labelss: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#111',
  },
});
