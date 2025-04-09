import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

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
      'https://www.holidify.com/images/bgImages/ROME.jpg',
      'https://www.qantas.com/content/travelinsider/en/explore/europe/best-places-to-visit-in-europe-historical-destinations-sites/jcr:content/verticalGalleryMain/gallery/galleryItems/218_1686624395243.img.480.medium.jpg/1728624738279.jpg',
      'https://www.explore.com/img/gallery/the-worlds-best-places-to-put-on-your-travel-bucket-list/rome-italy-1668448379.jpg'
    ],
  },
  {
    title: 'Weekend Getaways',
    destinations: 3,
    price: '₹10,466',
    images: [
      'https://www.holidify.com/images/bgImages/ROME.jpg',
      'https://www.qantas.com/content/travelinsider/en/explore/europe/best-places-to-visit-in-europe-historical-destinations-sites/jcr:content/verticalGalleryMain/gallery/galleryItems/218_1686624395243.img.480.medium.jpg/1728624738279.jpg',
      'https://www.explore.com/img/gallery/the-worlds-best-places-to-put-on-your-travel-bucket-list/rome-italy-1668448379.jpg'
    ],
  },
  {
    title: 'Romantic Destinatios',
    destinations: 14,
    price: '₹10,945',
    images: [
      'https://www.holidify.com/images/bgImages/ROME.jpg',
      'https://www.qantas.com/content/travelinsider/en/explore/europe/best-places-to-visit-in-europe-historical-destinations-sites/jcr:content/verticalGalleryMain/gallery/galleryItems/218_1686624395243.img.480.medium.jpg/1728624738279.jpg',
      'https://www.explore.com/img/gallery/the-worlds-best-places-to-put-on-your-travel-bucket-list/rome-italy-1668448379.jpg'
    ],
  },
  {
    title: 'Nature Destinations',
    destinations: 13,
    price: '₹10,945',
    images: [
      'https://www.holidify.com/images/bgImages/ROME.jpg',
      'https://www.qantas.com/content/travelinsider/en/explore/europe/best-places-to-visit-in-europe-historical-destinations-sites/jcr:content/verticalGalleryMain/gallery/galleryItems/218_1686624395243.img.480.medium.jpg/1728624738279.jpg',
      'https://www.explore.com/img/gallery/the-worlds-best-places-to-put-on-your-travel-bucket-list/rome-italy-1668448379.jpg'
    ],
  },
];



const ExploreSection = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Explore')} activeOpacity={0.8} style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
      <Text style={styles.heading}>Explore</Text>
      <Icon name="chevron-right" size={22} color="#000" />
      </TouchableOpacity>
      <FlatList
        data={exploreData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageGrid}>
              <Image source={{ uri: item.images[0] }} style={styles.mainImage} />
              <View style={styles.smallImageColumn}>
                <Image source={{ uri: item.images[1] }} style={styles.smallImage} />
                <Image source={{ uri: item.images[2] }} style={styles.smallImages} />
              </View>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.destinations} Destinations from</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
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
