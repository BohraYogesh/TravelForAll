import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../context/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {signUpUser} from '../api/api'; // Adjust the path as needed

export default function SignupScreen() {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [isChecked, setIsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailBorderColor, setEmailBorderColor] = useState('#ccc');
  const [firstNameBorderColor, setFirstNameBorderColor] = useState('#ccc');
  const [lastNameBorderColor, setLastNameBorderColor] = useState('#ccc');
  const [passwordBorderColor, setPasswordBorderColor] = useState('#ccc');
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] =
    useState('#ccc');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async () => {
    let valid = true;

    if (!email || !emailRegex.test(email)) {
      setEmailBorderColor('red');
      valid = false;
    } else {
      setEmailBorderColor('#ccc');
    }

    if (!firstName) {
      setFirstNameBorderColor('red');
      valid = false;
    } else {
      setFirstNameBorderColor('#ccc');
    }

    if (!lastName) {
      setLastNameBorderColor('red');
      valid = false;
    } else {
      setLastNameBorderColor('#ccc');
    }

    if (!password) {
      setPasswordBorderColor('red');
      valid = false;
    } else {
      setPasswordBorderColor('#ccc');
    }

    if (!confirmPassword) {
      setConfirmPasswordBorderColor('red');
      valid = false;
    } else {
      setConfirmPasswordBorderColor('#ccc');
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordBorderColor('red');
      setConfirmPasswordBorderColor('red');
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!valid) {
      Alert.alert('Error', 'Please fill in all fields correctly');
      return;
    }

    if (!isChecked) {
      Alert.alert(
        'Error',
        'You must agree to the Terms of Service and Privacy Policy',
      );
      return;
    }

    try {
      // Call the signupUser function
      const response = await signUpUser(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      );

      // If successful, show success message
      // Alert.alert('Success', 'Account created successfully!');

      // Optionally, navigate to another screen (e.g., Login)
      navigation.navigate('Login');
    } catch (error) {
      // If there's an error, show the error message
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: colors.background}}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: colors.text}]}>
          Create an account
        </Text>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Join us and start exploring amazing destinations
        </Text>

        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBackground,
                color: colors.text,
                borderColor: firstNameBorderColor,
              },
            ]}
            placeholder="First Name"
            placeholderTextColor={colors.placeholder}
            value={firstName}
            onChangeText={text => {
              setFirstName(text);
              setFirstNameBorderColor('#ccc');
            }}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBackground,
                color: colors.text,
                borderColor: lastNameBorderColor,
              },
            ]}
            placeholder="Last Name"
            placeholderTextColor={colors.placeholder}
            value={lastName}
            onChangeText={text => {
              setLastName(text);
              setLastNameBorderColor('#ccc');
            }}
          />
        </View>

        <TextInput
          style={[
            styles.fullInput,
            {
              backgroundColor: colors.inputBackground,
              color: colors.text,
              borderColor: emailBorderColor,
            },
          ]}
          placeholder="you@example.com"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailBorderColor('#ccc');
          }}
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            secureTextEntry={!passwordVisible}
            style={[
              styles.fullInput,
              {
                backgroundColor: colors.inputBackground,
                color: colors.text,
                borderColor: passwordBorderColor,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={colors.placeholder}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordBorderColor('#ccc');
            }}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.icon}>
            <Icon
              name={passwordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInputContainer}>
          <TextInput
            secureTextEntry={!confirmPasswordVisible}
            style={[
              styles.fullInput,
              {
                backgroundColor: colors.inputBackground,
                color: colors.text,
                borderColor: confirmPasswordBorderColor,
              },
            ]}
            placeholder="Confirm password"
            placeholderTextColor={colors.placeholder}
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setConfirmPasswordBorderColor('#ccc');
            }}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.icon}>
            <Icon
              name={confirmPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setIsChecked(!isChecked)}
          style={styles.checkboxContainer}
          activeOpacity={1}>
          <View
            style={[
              styles.checkbox,
              {borderColor: isChecked ? colors.primary : colors.text},
            ]}>
            {isChecked && <Icon name="check" size={10} color="#097C70" />}
          </View>

          <Text style={[styles.checkboxLabel, {color: colors.text}]}>
            I agree to the <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignup}
          activeOpacity={1}
          style={[styles.button, {backgroundColor: '#097C70'}]}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.loginText,
            {
              color: colors.text,
              flexDirection: 'row',
              justifyContent: 'center',
            },
          ]}>
          <View>
            <Text style={[styles.loginText, {color: colors.text}]}>
              Already have an account?
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(5),
    paddingTop: responsiveHeight(6),
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: responsiveWidth(7),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: responsiveWidth(4),
    textAlign: 'center',
    marginBottom: responsiveHeight(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
  },
  input: {
    width: responsiveWidth(45),
    height: responsiveHeight(6),
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: responsiveWidth(3),
  },
  fullInput: {
    width: '100%',
    height: responsiveHeight(6),
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginBottom: responsiveHeight(2),
  },
  passwordInputContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: '25%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  checkbox: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: '60%',
    height: '60%',
    borderRadius: 3,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: responsiveWidth(3.5),
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    color: '#097C70',
    fontWeight: '600',
    fontSize: responsiveWidth(),
  },
  button: {
    height: responsiveHeight(6.5),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveWidth(4),
    fontWeight: '600',
  },
  loginText: {
    fontSize: responsiveWidth(4),
    textAlign: 'center',
  },
});
