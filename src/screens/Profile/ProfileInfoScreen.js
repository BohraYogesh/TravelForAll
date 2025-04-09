import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function PersonalInfoScreen() {
  const [gender, setGender] = useState();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // iOS me picker open rahega
    setDate(currentDate);

    // Format date
    const d = currentDate.toLocaleDateString(); // You can customize the format
    setFormattedDate(d);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* Section 1: Personal Details */}
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <Text style={styles.subText}>
        All fields are mandatory. Enter exactly as they appear in passport/ID to
        avoid check-in complications.{' '}
        <Text style={styles.link}>More Details</Text>
      </Text>

      <TextInput style={styles.input} placeholder="First Name" />
      <TextInput style={styles.input} placeholder="Surname (Last Name)" />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioGroup}>
        <RadioButton
          value="Male"
          status={gender === 'Male' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Male')}
        />
        <Text style={styles.radioLabel}>Male</Text>
        <RadioButton
          value="Female"
          status={gender === 'Female' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Female')}
        />
        <Text style={styles.radioLabel}>Female</Text>
      </View>

      <View style={{}}>
        <Pressable onPress={() => setShowPicker(true)}>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: '#ccc',
            }}
            placeholder="Date of Birth"
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
            maximumDate={new Date()} // Prevent future dates
            onChange={onChange}
          />
        )}
      </View>
      <TextInput style={styles.input} placeholder="Nationality" />

      {/* Section 2: Contact Info */}
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <Text style={styles.subText}>
        All fields are mandatory. Fill out your contact information for a
        smoother booking experience.
      </Text>

      <TextInput
        style={[styles.input, {color: 'gray'}]}
        placeholder="xyz@gmail.com"
        editable={false}
      />

      <View style={styles.phoneRow}>
        <TextInput
          style={[styles.input, {width: responsiveWidth(20), color: 'black'}]}
          placeholder="+91"
          editable={false}
        />
        <TextInput
          style={[styles.input, {flex: 1, marginLeft: responsiveWidth(3)}]}
          placeholder="Phone Number"
        />
      </View>

      {/* Section 3: Travel Documents */}
      <Text style={styles.sectionTitle}>Travel Documents</Text>
      <Text style={styles.subText}>
        Please ensure that you are holding a valid and correct documentation for
        travel.
      </Text>

      <Text style={styles.docLabel}>Passport</Text>
      <TextInput style={styles.input} placeholder="Passport Number" />
      <TextInput style={styles.input} placeholder="Expiry Date" />

      <Text style={styles.docLabel}>National ID</Text>
      <TextInput style={styles.input} placeholder="ID Card Number" />
      <TextInput style={styles.input} placeholder="Expiry Date" />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
    paddingBottom: responsiveHeight(5),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    // marginTop:responsiveHeight(2)
  },
  subText: {
    fontSize: responsiveFontSize(1.6),
    color: 'gray',
    marginTop: responsiveHeight(1),
  },
  link: {
    color: '#f97316',
    textDecorationLine: 'underline',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
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
    backgroundColor: '#f97316',
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    borderRadius: 10,
    marginTop: responsiveHeight(4),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
});
