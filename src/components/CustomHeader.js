import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function CustomHeader() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      {/* Left side: Menu + Logo */}
      {/* <View style={styles.left}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={26} color="#223344" />
        </TouchableOpacity>

        <Image source={require('../assets/my-logo.png')} style={styles.logo} />
      </View> */}
      <Text style={{fontSize:responsiveFontSize(2)}}>Travell For All</Text>
     
      {/* <View style={styles.right}>
        <TouchableOpacity>
          <Icon name="search" size={22} color="#223344" style={styles.icon} />
        </TouchableOpacity>

       
        
        <TouchableOpacity style={styles.myCash}>
          <Text style={{ fontFamily: 'cursive', fontSize: 16 }}>my</Text>
          <Text style={{ fontWeight: '500', fontSize: 16 }}>Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.myBiz}>
          <Image source={require('../assets/biz-icon.png')} style={styles.bizIcon} />
          <Text style={{ fontWeight: '600', color: '#223344' }}>Biz</Text>
        </TouchableOpacity> 
       
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(6),
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  myCash: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  myBiz: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bizIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
});
