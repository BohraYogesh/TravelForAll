import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from '../../context/theme';

export default function PersonalInfoScreen() {
  const {colors} = useTheme();

  const [gender, setGender] = useState();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    const d = currentDate.toLocaleDateString();
    setFormattedDate(d);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, {backgroundColor: colors.background}]}
      showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, {color: colors.text}]}>Personal Details</Text>
      <Text style={[styles.subText, {color: colors.textLight}]}>
        All fields are mandatory. Enter exactly as they appear in passport/ID to
        avoid check-in complications.{' '}
        <Text style={[styles.link, {color: colors.link}]}>More Details</Text>
      </Text>

      <TextInput
        style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.inputBg}]}
        placeholder="First Name"
        placeholderTextColor={colors.placeholder}
      />
      <TextInput
        style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.inputBg}]}
        placeholder="Surname (Last Name)"
        placeholderTextColor={colors.placeholder}
      />

      <Text style={[styles.label, {color: colors.text}]}>Gender</Text>
      <View style={styles.radioGroup}>
        <RadioButton
          value="Male"
          status={gender === 'Male' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Male')}
          color={colors.primary}
        />
        <Text style={[styles.radioLabel, {color: colors.text}]}>Male</Text>
        <RadioButton
          value="Female"
          status={gender === 'Female' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Female')}
          color={colors.primary}
        />
        <Text style={[styles.radioLabel, {color: colors.text}]}>Female</Text>
      </View>

      <Pressable onPress={() => setShowPicker(true)}>
        <TextInput
          style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.inputBg}]}
          placeholder="Date of Birth"
          placeholderTextColor={colors.placeholder}
          value={formattedDate}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}

      <TextInput
        style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.inputBg}]}
        placeholder="Nationality"
        placeholderTextColor={colors.placeholder}
      />

      <Text style={[styles.sectionTitle, {color: colors.text}]}>Contact Information</Text>
      <Text style={[styles.subText, {color: colors.textLight}]}>
        All fields are mandatory. Fill out your contact information for a
        smoother booking experience.
      </Text>

      <TextInput
        style={[styles.input, {color: 'gray', borderColor: colors.border, backgroundColor: colors.inputBg}]}
        placeholder="xyz@gmail.com"
        editable={false}
        placeholderTextColor={colors.placeholder}
      />

      <View style={styles.phoneRow}>
        <TextInput
          style={[
            styles.input,
            {
              width: responsiveWidth(20),
              color: colors.text,
              backgroundColor: colors.inputBg,
              borderColor: colors.border,
            },
          ]}
          placeholder="+91"
          editable={false}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={[
            styles.input,
            {
              flex: 1,
              marginLeft: responsiveWidth(3),
              color: colors.text,
              backgroundColor: colors.inputBg,
              borderColor: colors.border,
            },
          ]}
          placeholder="Phone Number"
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <Text style={[styles.sectionTitle, {color: colors.text}]}>Travel Documents</Text>
      <Text style={[styles.subText, {color: colors.textLight}]}>
        Please ensure that you are holding a valid and correct documentation for travel.
      </Text>

      <Text style={[styles.docLabel, {color: colors.text}]}>Passport</Text>
      <TextInput
        style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.inputBg}]}
        placeholder="Passport Number"
        placeholderTextColor={colors.placeholder}
      />
      <TextInput
        style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.inputBg}]}
        placeholder="Expiry Date"
        placeholderTextColor={colors.placeholder}
      />

      <Text style={[styles.docLabel, {color: colors.text}]}>National ID</Text>
      <TextInput
        style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.inputBg}]}
        placeholder="ID Card Number"
        placeholderTextColor={colors.placeholder}
      />
      <TextInput
        style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.inputBg}]}
        placeholder="Expiry Date"
        placeholderTextColor={colors.placeholder}
      />

      <TouchableOpacity activeOpacity={0.9} style={[styles.saveButton, {backgroundColor: colors.primary}]}>
        <Text style={[styles.saveButtonText, {color: '#fff'}]}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(5),
    paddingBottom: responsiveHeight(5),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: responsiveFontSize(1.6),
    marginTop: responsiveHeight(1),
  },
  link: {
    textDecorationLine: 'underline',
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  label: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  docLabel: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
    marginTop: responsiveHeight(3),
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  radioLabel: {
    marginRight: responsiveWidth(5),
    fontSize: responsiveFontSize(2),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  saveButton: {
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    borderRadius: 10,
    marginTop: responsiveHeight(4),
  },
  saveButtonText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
});
