import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from '../../context/theme';
import {useAuth} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';

export default function PersonalInfoScreen() {
  const {colors} = useTheme();
  const {user, login} = useAuth();
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    gender: '',
    dateOfBirth: new Date(),
    nationality: '',
    phoneNumber: '',
    passportNumber: '',
    passportExpiry: '',
    nationalId: '',
    nationalIdExpiry: '',
  });

  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (user?.dateOfBirth) {
      const d = new Date(user.dateOfBirth).toLocaleDateString();
      setFormattedDate(d);
    }
  }, [user]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || userData.dateOfBirth;
    setShowPicker(Platform.OS === 'ios');
    setUserData({...userData, dateOfBirth: currentDate});
    setFormattedDate(currentDate.toLocaleDateString());
  };

  const handleInputChange = (field, value) => {
    setUserData({...userData, [field]: value});
  };

  const handleSave = async () => {
    console.log('Saved Data: ', userData);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    navigation.navigate('MainTabs', {
      screen: 'Profile',
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.dateOfBirth) {
            parsedData.dateOfBirth = new Date(parsedData.dateOfBirth);
          }
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          You are not logged in.
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.saveButton, {backgroundColor: colors.primary}]}
          onPress={login}>
          <Text style={[styles.saveButtonText, {color: '#fff'}]}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.background},
      ]}
      showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, {color: colors.text}]}>
        Personal Details
      </Text>
      <Text style={[styles.subText, {color: colors.textLight}]}>
        All fields are mandatory. Enter exactly as they appear in passport/ID to
        avoid check-in complications.{' '}
        <Text style={[styles.link, {color: colors.link}]}>More Details</Text>
      </Text>

      <TextInput
        style={[styles.input, getInputStyle(colors)]}
        placeholder="First Name"
        placeholderTextColor={colors.placeholder}
        value={userData.firstName}
        onChangeText={text => handleInputChange('firstName', text)}
      />
      <TextInput
        style={[styles.input, getInputStyle(colors)]}
        placeholder="Surname (Last Name)"
        placeholderTextColor={colors.placeholder}
        value={userData.lastName}
        onChangeText={text => handleInputChange('lastName', text)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Gender</Text>
      <View style={styles.radioGroup}>
        {['Male', 'Female'].map(gender => (
          <View key={gender} style={styles.radioOption}>
            <RadioButton
              value={gender}
              status={userData.gender === gender ? 'checked' : 'unchecked'}
              onPress={() => handleInputChange('gender', gender)}
              color={colors.primary}
            />
            <Text style={[styles.radioLabel, {color: colors.text}]}>
              {gender}
            </Text>
          </View>
        ))}
      </View>

      <Pressable onPress={() => setShowPicker(true)}>
        <TextInput
          style={[styles.input, getInputStyle(colors)]}
          placeholder="Date of Birth"
          placeholderTextColor={colors.placeholder}
          value={formattedDate || userData.dateOfBirth.toLocaleDateString()}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={userData.dateOfBirth}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}

      <TextInput
        style={[styles.input, getInputStyle(colors)]}
        placeholder="Nationality"
        placeholderTextColor={colors.placeholder}
        value={userData.nationality}
        onChangeText={text => handleInputChange('nationality', text)}
      />

      <Text style={[styles.sectionTitle, {color: colors.text}]}>
        Contact Information
      </Text>
      <Text style={[styles.subText, {color: colors.textLight}]}>
        All fields are mandatory. Fill out your contact information for a
        smoother booking experience.
      </Text>

      <TextInput
        style={[styles.input, getInputStyle(colors)]}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        value={userData.email}
        onChangeText={text => handleInputChange('email', text)}
        keyboardType="email-address"
      />

      <View style={styles.phoneRow}>
        <TextInput
          style={[
            styles.input,
            {width: responsiveWidth(20), ...getInputStyle(colors)},
          ]}
          placeholder="+91"
          editable={false}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={[
            styles.input,
            {flex: 1, marginLeft: responsiveWidth(3), ...getInputStyle(colors)},
          ]}
          placeholder="Phone Number"
          placeholderTextColor={colors.placeholder}
          value={userData.phoneNumber}
          onChangeText={text => handleInputChange('phoneNumber', text)}
          keyboardType="phone-pad"
        />
      </View>

      <Text style={[styles.sectionTitle, {color: colors.text}]}>
        Travel Documents
      </Text>
      <Text style={[styles.subText, {color: colors.textLight}]}>
        Please ensure that you are holding a valid and correct documentation for
        travel.
      </Text>

      <Text style={[styles.docLabel, {color: colors.text}]}>Passport</Text>
      <TextInput
        style={[styles.input, getInputStyle(colors)]}
        placeholder="Passport Number"
        placeholderTextColor={colors.placeholder}
        value={userData.passportNumber}
        onChangeText={text => handleInputChange('passportNumber', text)}
      />
      <TextInput
        style={[styles.input, getInputStyle(colors)]}
        placeholder="Expiry Date"
        placeholderTextColor={colors.placeholder}
        value={userData.passportExpiry}
        onChangeText={text => handleInputChange('passportExpiry', text)}
      />

      <Text style={[styles.docLabel, {color: colors.text}]}>National ID</Text>
      <TextInput
        style={[styles.input, getInputStyle(colors)]}
        placeholder="ID Card Number"
        placeholderTextColor={colors.placeholder}
        value={userData.nationalId}
        onChangeText={text => handleInputChange('nationalId', text)}
      />
      <TextInput
        style={[styles.input, getInputStyle(colors)]}
        placeholder="Expiry Date"
        placeholderTextColor={colors.placeholder}
        value={userData.nationalIdExpiry}
        onChangeText={text => handleInputChange('nationalIdExpiry', text)}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.saveButton, {backgroundColor: colors.primary}]}
        onPress={handleSave}>
        <Text style={[styles.saveButtonText, {color: '#fff'}]}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const getInputStyle = colors => ({
  borderColor: colors.border,
  backgroundColor: colors.inputBg,
  color: colors.text,
});

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
    fontWeight: '600',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveWidth(5),
  },
  radioLabel: {
    fontSize: responsiveFontSize(1.9),
    marginRight: responsiveWidth(2),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  docLabel: {
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  saveButton: {
    marginTop: responsiveHeight(4),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
