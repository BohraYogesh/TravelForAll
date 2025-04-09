import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Search({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        placeholder="Search..."
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  icon: {
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: '#000',
  },
});
