import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TravelCategoryItem = ({ icon, label }) => {
  return (
    <View style={styles.item}>
      <Image source={icon} style={[styles.icon, { tintColor: '#f97316' }]} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default TravelCategoryItem;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
