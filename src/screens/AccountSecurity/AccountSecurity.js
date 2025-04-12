import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function AccountSecurity() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('TermsAndConditions')}>
          <Icon
            name="document-text-outline"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Terms & Conditions</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('Privacy')}>
          <Icon
            name="lock-closed-outline"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Privacy & policy</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(4),
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.8),
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  rowText: {
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(4),
    flex: 1,
    color: '#000',
  },
});
