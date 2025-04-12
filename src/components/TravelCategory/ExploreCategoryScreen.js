import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ExploreCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category, image } = route.params;

  // Set dynamic title in header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: category,
    });
  }, [navigation, category]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{category}</Text>
      <Text style={styles.description}>
        This screen shows destinations under the "{category}" category. You can
        list related destinations here.
      </Text>

      {/* You can map more data here like FlatList of cities or countries */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: responsiveHeight(25),
    resizeMode: 'cover',
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: responsiveFontSize(2),
    color: '#666',
    paddingHorizontal: 16,
  },
});

export default ExploreCategoryScreen;
