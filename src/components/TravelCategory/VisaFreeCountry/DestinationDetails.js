import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../../context/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DescriptionDetails() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { description } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: description.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {description.country}
          </Text>
          <Text style={[styles.description, { color: colors.secondary }]}>
            {description.des}
          </Text>
          <Text style={[styles.category, { color: colors.secondary }]}>
            Category: {description.category}
          </Text>

          {/* Inclusions Section */}
          <View style={styles.inclusionsSection}>
            <Text style={[styles.inclusionsTitle, { color: colors.text }]}>
              Inclusions
            </Text>
            <View style={styles.inclusionList}>
              <Text style={[styles.inclusionItem, { color: colors.secondary }]}>• Accommodation</Text>
              <Text style={[styles.inclusionItem, { color: colors.secondary }]}>• Guided Tours</Text>
              <Text style={[styles.inclusionItem, { color: colors.secondary }]}>• Equipment</Text>
              <Text style={[styles.inclusionItem, { color: colors.secondary }]}>• Meals</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Price & Book Now */}
      <View style={[styles.bottomBar, { backgroundColor: colors.subbg }]}>
        <Text style={[styles.price, { color: colors.primary }]}>
        ₹ {description.price}
        </Text>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('BookingDetails', {description: description})
          }}
        >
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
    borderBottomLeftRadius: responsiveWidth(4),
    borderBottomRightRadius: responsiveWidth(4),
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
  inclusionsSection: {
    marginTop: responsiveHeight(2),
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
