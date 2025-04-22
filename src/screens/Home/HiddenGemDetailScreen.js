import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useTheme } from '../../context/theme';

const hotels = [
  {
    name: 'Radisson Hotel Shimla',
    location: 'Shimla City Center',
    rating: '8.2',
    status: 'Very Good',
    Reviews: '780 Reviews',
    image:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/445773682.jpg?k=0f35bfef4772be87015561f512a3ca0e3f2aa2d665e7bf70475d01c1edc67548&o=&hp=1',
  },
  {
    name: 'Welcomhotel by ITC Hotels',
    location: 'Mashobra',
    rating: '8.5',
    status: 'Very Good',
    Reviews: '780 Reviews',
    image:
      'https://www.itchotels.com/content/dam/itchotels/in/umbrella/welcomHotel/hotels/welcomhotelshimla-shimla/images/overview-landing-page/headmast/desktop/inner-facade-evening-view.png',
  },
  {
    name: 'The Oberoi Cecil',
    location: 'Chaura Maidan, Shimla',
    rating: '9.1',
    status: 'Very Good',
    Reviews: '780 Reviews',
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/26/7b/ce/caption.jpg?w=900&h=500&s=1',
  },
  {
    name: 'The Hillsong Homey',
    location: 'Chaura Maidan, Shimla',
    rating: '9.3',
    status: 'Very Good',
    Reviews: '780 Reviews',
    image:
      'https://r1imghtlak.ibcdn.com/9b98ab84d35811ebad360242ac110002.jpg?&downsize=520:350&crop=520:350;81,0&output-format=jpg',
  },
  {
    name: 'Royal Tulip Shimla, Kufri',
    location: 'Chaura Maidan, Shimla',
    rating: '9.1',
    status: 'Very Good',
    Reviews: '780 Reviews',
    image:
      'https://royal-tulip-shimla-kufri-hills.shimlahotels.net/data/Imgs/OriginalPhoto/11431/1143157/1143157720/img-royal-tulip-kufri-hills-hotel-shimla-71.JPEG',
  },
];

const HiddenGemDetailScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this beautiful destination: ${item.title}\n${
          item.description ||
          'Explore scenic views, comfortable stays, and more!'
        }`,
        title: item.title,
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.subbg}]}>
      {/* Header Image */}
      <View>
        <Image source={item.image} style={styles.headerImage} />

        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
          activeOpacity={1}>
          <Icon name="arrow-back" size={responsiveFontSize(2.8)} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareIcon}
          onPress={handleShare}
          activeOpacity={1}>
          <Icon
            name="share-social"
            size={responsiveFontSize(2.8)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Title & Description */}
      <View style={styles.contentContainer}>
        <Text style={[styles.title, {color:colors.text}]}>{item.title}</Text>
        <Text style={[styles.description, {color: colors.secondary}]}>
          {item.description ||
            'Experience the beauty and charm of this hidden gem. Explore scenic views, comfortable stays, and unforgettable memories.'}
        </Text>
      </View>

      {/* Hotel List */}
      <View style={styles.hotelContainer}>
        <Text style={[styles.sectionTitle, {color:colors.text}]}>Places to stay</Text>

        {hotels.map((hotel, index) => (
          <View style={styles.card} key={index}>
            <Image source={{uri: hotel.image}} style={styles.hotelImage} />
            <View style={styles.cardContent}>
              <Text style={[styles.hotelName, {color:colors.text}]}>{hotel.name}</Text>
              <Text style={[styles.location, {color: colors.secondary}]}>
                <Icon name="location-outline" size={responsiveFontSize(1.8)} />{' '}
                {hotel.location}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{borderRadius: 5}}>
                  <Text style={styles.ratings}>{hotel.rating}</Text>
                </View>
                <View>
                  <Text style={styles.rating}> {hotel.status}</Text>
                  <Text style={[styles.ratinges,{color: colors.secondary}]}> {hotel.Reviews}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  backIcon: {
    position: 'absolute',
    top: responsiveHeight(4),
    left: responsiveWidth(4),
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: responsiveWidth(2),
    borderRadius: responsiveWidth(5),
  },
  shareIcon: {
    position: 'absolute',
    top: responsiveHeight(4),
    right: responsiveWidth(4),
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: responsiveWidth(2),
    borderRadius: responsiveWidth(5),
  },
  contentContainer: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  title: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  description: {
    fontSize: responsiveFontSize(2),
    color: '#666',
    lineHeight: responsiveFontSize(2.8),
  },
  hotelContainer: {
    paddingHorizontal: responsiveWidth(5),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    marginVertical: responsiveHeight(2),
  },
  card: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
  },
  hotelImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(16),
  },
  cardContent: {
    flex: 1,
    padding: responsiveWidth(3),
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(0.5),
  },
  location: {
    fontSize: responsiveFontSize(1.8),
    color: '#666',
    marginBottom: responsiveHeight(0.5),
  },
  rating: {
    fontSize: responsiveFontSize(1.8),
    color: '#388e3c',
    fontWeight: '600',
  },
  ratinges: {
    fontSize: responsiveFontSize(1.5),
    color:'#666'
  },
  ratings: {
    fontSize: responsiveFontSize(1.8),
    backgroundColor: '#388e3c',
    color: '#fff',
    fontWeight: '600',
    borderRadius:5,
    padding:responsiveWidth(1)
  },
});

export default HiddenGemDetailScreen;
