import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/theme';

export default function Notification() {
  const {colors} = useTheme();
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView style={[styles.container, {backgroundColor:colors.bg}]} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.row}>
          <MaterialIcon
            name={isEnabled ? 'bell-ring' : 'bell-outline'}
            size={responsiveFontSize(3)}
            color={isEnabled ? '#f97316' : colors.text}
          />

          <Text style={[styles.rowText, {color:colors.text}]}>Notification</Text>
          <Switch
            trackColor={{false: '#ccc', true: '#fdba74'}}
            thumbColor={isEnabled ? '#f97316' : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
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
