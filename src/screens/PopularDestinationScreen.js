import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import popularindiacities from '../components/popular_indian_cities.json';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../context/theme';

export default function PopularDestination() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const filteredCities = popularindiacities.filter(item =>
    item.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={{padding: responsiveWidth(4), flex: 1}}>
      {/* Search Bar */}
      <View style={[styles.inputRow, {backgroundColor: colors.subbg}]}>
        <Icon name="search" size={responsiveFontSize(2)} style={[styles.icon]} />
        <TextInput
          placeholder="Search city..."
          value={search}
          onChangeText={setSearch}
          style={[styles.textInput, {color: colors.text}]}
          placeholderTextColor="#999"
        />
      </View>

      {/* City Grid or Empty Message */}
      {filteredCities.length > 0 ? (
        <FlatList
          data={filteredCities}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.city}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.card, {backgroundColor: colors.subbg}]}
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('CityDetail', {
                  city: item.city,
                  state: item.state,
                  country: item.country,
                  price: item.price,
                  description: item.description,
                  image: item.image.uri,
                })
              }>
              <ImageBackground
                source={{uri: item.image.uri}}
                style={styles.image}
                imageStyle={styles.imageRadius}>
                <View style={styles.overlay}>
                  <Text style={styles.city}>{item.city}</Text>
                  <Text style={styles.country}>{item.country}</Text>
                </View>
              </ImageBackground>
              <Text style={styles.label}>Round-trip from</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.noDataView}>
          <Text style={styles.noDataText}>No City Available</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(12),
    paddingHorizontal: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
  },
  icon: {
    marginRight: responsiveWidth(2),
    color: '#888',
    fontSize: responsiveFontSize(1.8),
  },
  textInput: {
    flex: 1,
    fontSize: responsiveFontSize(1.8),
    color: '#000',
    paddingVertical: responsiveHeight(1),
  },
  card: {
    width: responsiveWidth(44),
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: responsiveHeight(18),
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  overlay: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  city: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
  country: {
    color: '#fff',
    fontSize: responsiveFontSize(1.6),
  },
  label: {
    color: 'gray',
    marginTop: 4,
    paddingHorizontal: 8,
    fontSize: responsiveFontSize(1.4),
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingBottom: 8,
    fontSize: responsiveFontSize(2),
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
  },
  noDataText: {
    fontSize: responsiveFontSize(2),
    color: 'gray',
  },
});
