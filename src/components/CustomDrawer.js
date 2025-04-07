import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomDrawer(props) {
  return (
    <View style={{ flex: 1 }}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {/* <Image
          source={require('../assets/profile.png')} // ✅ apne assets me image daalna
          style={styles.profileImage}
        /> */}
        <Text style={styles.name}>Hello, Raj!</Text>
        <Text style={styles.email}>raj@example.com</Text>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={() => console.log('Logging out')}>
          <View style={styles.logoutRow}>
            <Icon name="log-out-outline" size={22} color="#333" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  logoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#333',
  },
});
