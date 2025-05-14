import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
import {signUpUser} from '../api/api';

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

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async () => {
    let newErrors = {};

    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!email || !emailRegex.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.password = 'Passwords do not match';
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!isChecked) newErrors.terms = 'You must agree to the terms';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await signUpUser(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      );
      console.log('Signup Success:', response);
      navigation.navigate('Login');
    } catch (error) {
      setErrors({api: error.message});
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: colors.background}}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: colors.text}]}>Create an account</Text>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Join us and start exploring amazing destinations
        </Text>

        <View style={styles.row}>
          <View style={{flex: 1}}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  borderColor: errors.firstName ? 'red' : '#ccc',
                },
              ]}
              placeholder="First Name"
              placeholderTextColor={colors.placeholder}
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                setErrors({...errors, firstName: ''});
              }}
            />
            {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
          </View>

          <View style={{flex: 1}}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  borderColor: errors.lastName ? 'red' : '#ccc',
                },
              ]}
              placeholder="Last Name"
              placeholderTextColor={colors.placeholder}
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                setErrors({...errors, lastName: ''});
              }}
            />
            {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
          </View>
        </View>

        <TextInput
          style={[
            styles.fullInput,
            {
              backgroundColor: colors.inputBackground,
              color: colors.text,
              borderColor: errors.email ? 'red' : '#ccc',
            },
          ]}
          placeholder="you@example.com"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={text => {
            setEmail(text);
            setErrors({...errors, email: ''});
          }}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <View style={styles.passwordInputContainer}>
          <TextInput
            secureTextEntry={!passwordVisible}
            style={[
              styles.fullInput,
              {
                backgroundColor: colors.inputBackground,
                color: colors.text,
                borderColor: errors.password ? 'red' : '#ccc',
              },
            ]}
            placeholder="Password"
            placeholderTextColor={colors.placeholder}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrors({...errors, password: ''});
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
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <View style={styles.passwordInputContainer}>
          <TextInput
            secureTextEntry={!confirmPasswordVisible}
            style={[
              styles.fullInput,
              {
                backgroundColor: colors.inputBackground,
                color: colors.text,
                borderColor: errors.confirmPassword ? 'red' : '#ccc',
              },
            ]}
            placeholder="Confirm password"
            placeholderTextColor={colors.placeholder}
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setErrors({...errors, confirmPassword: ''});
            }}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            }
            style={styles.icon}>
            <Icon
              name={confirmPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}

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
        {errors.terms && <Text style={styles.error}>{errors.terms}</Text>}

        {errors.api && <Text style={styles.errors}>{errors.api}</Text>}

        <TouchableOpacity
          onPress={handleSignup}
          activeOpacity={1}
          style={[styles.button, {backgroundColor: '#097C70'}]}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[styles.loginText, {color: colors.text}]}>
            Already have an account?
          </Text>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Login')}>
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
    gap: 10,
  },
  input: {
    height: responsiveHeight(6),
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  fullInput: {
    width: '100%',
    height: responsiveHeight(6),
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginBottom: responsiveHeight(1),
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
    marginTop: responsiveHeight(1),
  },
  checkbox: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: responsiveWidth(3.5),
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
    fontSize: responsiveWidth(3.5),
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: responsiveFontSize(1.5),
    marginBottom: responsiveHeight(1),
  },
  errors: {
    color: 'red',
    fontSize: responsiveFontSize(1.5),
    marginBottom: responsiveHeight(1),
    justifyContent:'center',
    textAlign:'center'
    // alignItems:'center'
  },
});
