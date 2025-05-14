import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../context/theme';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../api/api';
import {useAuth} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {login} = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [messageColor, setMessageColor] = useState('green');
  const [isLoading, setIsLoading] = useState(false);

  const isEmailEmpty = email.trim() === '';
  const isPasswordEmpty = password.trim() === '';

  const handleSignIn = async () => {
    setIsSubmitted(true);
    setLoginMessage('');

    if (isEmailEmpty || isPasswordEmpty) {
      setLoginMessage('Please fill in both fields');
      setMessageColor('red');
      return;
    }

    try {
      setIsLoading(true);
      const data = await loginUser(email, password);

      if (data) {
        // Save user details
        login({token: data.token, ...data.user});
        await AsyncStorage.setItem('userEmail', data.user.email);
        await AsyncStorage.setItem('userName', data.user.firstName);

        // Navigate immediately
        navigation.navigate('MainTabs');
      }
    } catch (error) {
      setLoginMessage(error.message || 'Invalid email or password');
      setMessageColor('red');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>Welcome back</Text>
      <Text style={[styles.subtitle, {color: colors.textLight}]}>
        Sign in to access your account
      </Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, {color: colors.text}]}>Email address</Text>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.inputBg,
              borderColor: isSubmitted && isEmailEmpty ? 'red' : colors.border,
            },
          ]}>
          <Icon
            name="mail"
            size={responsiveFontSize(2)}
            color={colors.icon}
            style={styles.icon}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, {color: colors.text}]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text
          style={[styles.label, {color: colors.text, marginTop: responsiveHeight(2)}]}>
          Password
        </Text>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.inputBg,
              borderColor: isSubmitted && isPasswordEmpty ? 'red' : colors.border,
            },
          ]}>
          <Icon
            name="lock"
            size={responsiveFontSize(2)}
            color={colors.icon}
            style={styles.icon}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, {color: colors.text}]}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}>
            <Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={responsiveFontSize(2)}
              color={colors.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {loginMessage !== '' && (
        <Text
          style={{
            color: messageColor,
            textAlign: 'center',
            marginBottom: responsiveHeight(1.5),
            fontSize: responsiveFontSize(1.8),
            fontWeight: '600',
          }}>
          {loginMessage}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.button,
          {
            backgroundColor: '#097C70',
            opacity: isLoading ? 0.7 : 1,
          },
        ]}
        onPress={handleSignIn}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Icon
            name="arrow-right-circle"
            size={responsiveFontSize(2.2)}
            color="#fff"
          />
        )}
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        style={styles.footerText}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={[{color: colors.textLight}, styles.footerText]}>
          Don't have an account?{' '}
          <Text style={{color: colors.link, fontWeight: '600'}}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(6),
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: responsiveHeight(0.5),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    marginBottom: responsiveHeight(4),
  },
  label: {
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(1),
    marginLeft: responsiveWidth(1),
  },
  inputContainer: {
    marginBottom: responsiveHeight(3),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(3),
  },
  icon: {
    marginRight: responsiveWidth(2),
  },
  eyeIcon: {
    position: 'absolute',
    right: responsiveWidth(3),
    top: responsiveHeight(1.8),
  },
  input: {
    flex: 1,
    paddingVertical: responsiveHeight(1.2),
    fontSize: responsiveFontSize(1.8),
  },
  button: {
    flexDirection: 'row',
    borderRadius: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
  footerText: {
    marginTop: responsiveHeight(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
  },
});

export default LoginScreen;
