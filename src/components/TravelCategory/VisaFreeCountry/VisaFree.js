import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../../context/theme';
import {useNavigation} from '@react-navigation/native';

const visaFreeData = [
  {
    country: 'Mountain Retreat',
    price: '21,577',
    des: 'Experience the thrill of mountain climbing and scenic beauty',
    image:
      'https://www.andbeyond.com/wp-content/uploads/sites/5/nepal-village.jpg',
    category: 'Adventure',
    Accommodation: true,
    GuidedTours: true,
    Equipment: true,
    Meals: true,
  },
  {
    country: 'Beach Paradise',
    price: '24,159',
    des: 'Romantic beachfront getaway with luxury amenities',
    image:
      'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/555000/555257-qatar.jpg',
    category: 'Honeymoon',
    Accommodation: true,
    GuidedTours: true,
    Equipment: true,
    Meals: true,
  },
  {
    country: 'Forest Adventure',
    price: '26,541',
    des: 'Family-friendly forest adventure with activities for all ages',
    image: 'https://www.holidify.com/images/bgImages/BALI.jpg',
    category: 'Family',
    Accommodation: true,
    GuidedTours: true,
    Equipment: true,
    Meals: true,
  },
  {
    country: 'Mauritius',
    price: '46,930',
    des: 'Tropical island vibes with stunning beaches and lagoons',
    image:
      'https://bigthink.com/wp-content/uploads/2022/02/1_8nBTmy5qQlhq-YhYsB4wzw.jpg',
    category: 'Group',
    Accommodation: true,
    GuidedTours: true,
    Equipment: true,
    Meals: true,
  },
];

const categories = [
  'All',
  'Adventure',
  'Honeymoon',
  'Family',
  'Solo',
  'Group',
  'Corporate',
];

export default function VisaFreeScreen() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredData =
    selectedCategory === 'All'
      ? visaFreeData
      : visaFreeData.filter(item => item.category === selectedCategory);

  const renderCard = ({item}) => (
    <TouchableOpacity activeOpacity={1} style={styles.cardWrapper}>
      <View style={[styles.card, {backgroundColor: colors.subbg}]}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.details}>
          <Text style={[styles.name, {color: colors.text}]}>
            {item.country}
          </Text>
          <Text style={[styles.description, {color: colors.secondary}]}>
            {item.des}
          </Text>
          <View style={styles.bottomRow}>
            <Text style={[styles.price, {color: colors.primary}]}>
            ₹ {item.price}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.button, {backgroundColor: '#387c87'}]}
              onPress={() =>
                navigation.navigate('DescriptionDetails', {description: item})
              }>
              <Text style={styles.buttonText}>View Package</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      {/* Category Buttons */}
      <View style={{height: responsiveHeight(7), justifyContent: 'center'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}>
          {categories.map(category => (
            <TouchableOpacity
              activeOpacity={1}
              key={category}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedCategory === category ? '#387c87' : colors.subbg,
                },
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                numberOfLines={1}
                style={[
                  styles.categoryText,
                  {
                    color: selectedCategory === category ? '#fff' : colors.text,
                  },
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* No Data Message */}
      {filteredData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={[styles.noDataText, {color: colors.secondary}]}>
            No Destination Available
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderCard}
          keyExtractor={item => item.country}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: responsiveHeight(2)}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  categoryScroll: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
  },
  categoryButton: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    marginRight: responsiveWidth(2),
    borderWidth: 1,
    borderColor: '#387c87',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(5.2),
  },
  categoryText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
  },
  cardWrapper: {
    width: responsiveWidth(92),
    marginVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    overflow: 'hidden',
  },
  card: {
    borderRadius: responsiveWidth(3),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: responsiveHeight(22),
    borderTopLeftRadius: responsiveWidth(3),
    borderTopRightRadius: responsiveWidth(3),
  },
  details: {
    padding: responsiveWidth(4),
    gap: responsiveHeight(1),
  },
  name: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  description: {
    fontSize: responsiveFontSize(1.8),
  },
  price: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.8),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
});
