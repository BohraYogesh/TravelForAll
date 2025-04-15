import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from '../../context/theme';

const exploreData = [
  {
    title: 'Popular Destinations',
    destinations: 87,
    price: '₹4,233',
    images: [
      'https://www.holidify.com/images/bgImages/ROME.jpg',
      'https://www.qantas.com/content/travelinsider/en/explore/europe/best-places-to-visit-in-europe-historical-destinations-sites/jcr:content/verticalGalleryMain/gallery/galleryItems/218_1686624395243.img.480.medium.jpg/1728624738279.jpg',
      'https://www.explore.com/img/gallery/the-worlds-best-places-to-put-on-your-travel-bucket-list/rome-italy-1668448379.jpg',
    ],
  },
  {
    title: 'Visa-free Countries',
    destinations: 60,
    price: '₹17,875',
    images: [
      'https://lp-cms-production.imgix.net/2024-10/-CantoiStock-1299735828.jpg?auto=compress&format=auto&fit=crop&q=50&w=1200&h=800',
      'https://media-cdn.tripadvisor.com/media/photo-m/1280/1b/4b/5d/c8/caption.jpg',
      'https://www.chaseforadventure.com/wp-content/uploads/2023/07/Things-to-do-in-Krabi.webp',
    ],
  },
  {
    title: 'Weekend Getaways',
    destinations: 3,
    price: '₹10,466',
    images: [
      'https://www.tourmyindia.com/blog//wp-content/uploads/2023/09/Best-Weekend-Destinations-from-Jaipur.jpg',
      'https://blog.weekendthrill.com/wp-content/uploads/2016/05/053016_0515_16IDEALWEEK1.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST6I1HUhGQtFEy-ZQsXRprzvCP-BY6QYisPw&s',
    ],
  },
  {
    title: 'Romantic Destinatios',
    destinations: 14,
    price: '₹10,945',
    images: [
      'https://media.cntraveler.com/photos/67782447e93d5ea2c59fec07/4:3/w_3148,h_2361,c_limit/Le_Sirenuse_Room_62-0553.jpg',
      'https://media.cntraveller.com/photos/62f36e42e062900b0e3b7637/master/w_320%2Cc_limit/Le_Sirenuse_ALDOs_BAR-9051-La%2520Sponda%2C%2520Le%2520Sireneuse%2C%2520Positano%2C%2520Italy%2C-jun21-pr.jpg',
      'https://www.ecstaticindiatours.com/uploads/blog/1696338863o0ow3-udaipur.jpg',
    ],
  },
  {
    title: 'Nature Destinations',
    destinations: 13,
    price: '₹10,945',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA1zM1NH3jWBmN47Z-XVm4JiHq1QoDD3Ovow&s',
      'https://hips.hearstapps.com/hmg-prod/images/snowdonia-national-park-in-wales-uk-royalty-free-image-1729091363.jpg?crop=0.530xw:1.00xh;0.239xw,0&resize=640:*',
      'https://specials-images.forbesimg.com/imageserve/61cc77ede18f95935e179434/Llynnau-Mymbyr--Mount-Snowdon---Snowdon-Massif/960x0.jpg?fit=scale',
    ],
  },
];

const ExploreSection = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Explore')}
        activeOpacity={1}
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={[styles.heading, {color:colors.text}]}>Explore</Text>
        <Icon name="chevron-right" size={22} color={colors.secondary} />
      </TouchableOpacity>
      <FlatList
        data={exploreData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (item.title === 'Popular Destinations') {
              navigation.navigate('PopulorDestination', {
                category: item.title,
                image: item.images[0],
              });
            } else if (item.title === 'Visa-free Countries') {
              navigation.navigate('VisaFreeCountry', {
                category: item.title,
                image: item.images[0],
              });
            // } else if (item.title === 'Weekend Getaways') {
            //   navigation.navigate('WeekendGetawayScreen', {
            //     category: item.title,
            //     image: item.images[0],
            //   });
            } else {
              // Default screen for other categories
              navigation.navigate('ExploreCategoryScreen', {
                category: item.title,
                image: item.images[0],
              });
            }
          }}
        >
            <View style={[styles.card, {backgroundColor: colors.subbg}]}>
              <View style={styles.imageGrid}>
                <Image
                  source={{uri: item.images[0]}}
                  style={styles.mainImage}
                />
                <View style={styles.smallImageColumn}>
                  <Image
                    source={{uri: item.images[1]}}
                    style={styles.smallImage}
                  />
                  <Image
                    source={{uri: item.images[2]}}
                    style={styles.smallImages}
                  />
                </View>
              </View>
              <Text style={[styles.cardTitle, {
                color:colors.text
              }]}>{item.title}</Text>
              <Text style={styles.subtitle}>
                {item.destinations} Destinations from
              </Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 12,
    paddingBottom: 10,
    width: responsiveWidth(50),
  },
  imageGrid: {
    flexDirection: 'row',
    height: responsiveHeight(15),
  },
  mainImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderTopLeftRadius: 8,
  },
  smallImageColumn: {
    width: responsiveWidth(20),
    justifyContent: 'space-between',
    paddingLeft: 1,
  },
  smallImage: {
    height: responsiveHeight(7.5),
    width: responsiveWidth(20),
    borderTopRightRadius: 12,
  },
  smallImages: {
    height: responsiveHeight(7.4),
    width: responsiveWidth(20),
  },
  cardTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  subtitle: {
    fontSize: responsiveFontSize(1.6),
    color: '#888',
    paddingHorizontal: 8,
  },
  price: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: '#2ecc71',
    paddingHorizontal: 8,
  },
});

export default ExploreSection;
