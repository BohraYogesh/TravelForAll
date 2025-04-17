import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../context/theme'; 

export default function AccountSecurity() {
  const navigation = useNavigation();
  const {colors} = useTheme(); 

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.bg}]}
      showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: colors.bg}}>
        <TouchableOpacity
          style={[styles.row, {borderBottomColor: colors.border}]}
          activeOpacity={1}
          onPress={() => navigation.navigate('TermsAndConditions')}>
          <Icon
            name="document-text-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color: colors.text}]}>
            Terms & Conditions
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.row, {borderBottomColor: colors.border}]}
          activeOpacity={1}
          onPress={() => navigation.navigate('Privacy')}>
          <Icon
            name="lock-closed-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color: colors.text}]}>
            Privacy & policy
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
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
  },
  rowText: {
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(4),
    flex: 1,
  },
});
