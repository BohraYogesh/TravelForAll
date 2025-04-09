import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated } from 'react-native';
import TravelCategoryItem from './TravelCategoryItem';

const { width } = Dimensions.get('window');

// Dummy icons (replace with your actual icons)
import BedIcon from '../../assets/car.png';
import HostelIcon from '../../assets/car.png';
import HolidayIcon from '../../assets/car.png';
import CabsIcon from '../../assets/car.png';
import InsuranceIcon from '../../assets/car.png';
import TrainIcon from '../../assets/car.png';
import CurrencyIcon from '../../assets/car.png';

const TravelCategoryList = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const categories = [
    { icon: BedIcon, label: 'Hourly Stays' },
    { icon: HostelIcon, label: 'Hostels' },
    { icon: HolidayIcon, label: 'Holiday Packages' },
    { icon: CabsIcon, label: 'Cabs' },
    { icon: InsuranceIcon, label: 'Travel Insurance' },
    { icon: TrainIcon, label: 'Train PNR Status' },
    { icon: CurrencyIcon, label: 'Foreign Currency' },
  ];

  const itemsPerPage = 4;
  const pages = [];
  for (let i = 0; i < categories.length; i += itemsPerPage) {
    pages.push(categories.slice(i, i + itemsPerPage));
  }

  return (
    <View>
      <Animated.FlatList
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.page}>
            {item.map((cat, index) => (
              <TravelCategoryItem key={index} icon={cat.icon} label={cat.label} />
            ))}
          </View>
        )}
      />

      {/* Indicator */}
      <View style={styles.indicatorContainer}>
        {pages.map((_, i) => {
          const inputRange = [i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [20, 20],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity: scrollX.interpolate({
                    inputRange: [
                      (i - 1) * width,
                      i * width,
                      (i + 1) * width,
                    ],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TravelCategoryList;

const styles = StyleSheet.create({
  page: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'orange',
    marginHorizontal: 4,
  },
});
