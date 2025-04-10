import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const themeOptions = [
  {id: 'light', name: 'Light', icon: 'white-balance-sunny'},
  {id: 'dark', name: 'Dark', icon: 'weather-night'},
  {id: 'system', name: 'System Default', icon: 'theme-light-dark'},
];

const languageOptions = [
  {id: 'en', name: 'English', icon: 'alpha-e-circle-outline'},
  {id: 'hi', name: 'Hindi', icon: 'alpha-h-circle-outline'},
];

const currencyOptions = [
  {
    id: 'usd',
    name: 'US Dollar',
    symbol: 'USD',
    flag: 'https://flagcdn.com/w80/us.png',
  },
  {
    id: 'inr',
    name: 'Indian Rupee',
    symbol: 'INR',
    flag: 'https://flagcdn.com/w80/in.png',
  },
  {
    id: 'eur',
    name: 'Euro',
    symbol: 'EUR',
    flag: 'https://flagcdn.com/w80/eu.png',
  },
  {
    id: 'gbp',
    name: 'British Pound',
    symbol: 'GBP',
    flag: 'https://flagcdn.com/w80/gb.png',
  },
  {
    id: 'jpy',
    name: 'Japanese Yen',
    symbol: 'JPY',
    flag: 'https://flagcdn.com/w80/jp.png',
  },
  {
    id: 'aed',
    name: 'UAE Dirham',
    symbol: 'AED',
    flag: 'https://flagcdn.com/w80/ae.png',
  },
];



const SettingsScreen = () => {
  const navigation = useNavigation();
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState('inr');
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const handleThemeChange = mode => {
    setSelectedTheme(mode);
    setModalVisible(false);
  };

  const handleLanguageChange = lang => {
    setSelectedLanguage(lang);
    setLanguageModalVisible(false);
  };

  const getThemeLabel = id => {
    const found = themeOptions.find(theme => theme.id === id);
    return found ? found.name : '';
  };

  const getLanguageLabel = id => {
    const found = languageOptions.find(lang => lang.id === id);
    return found ? found.name : '';
  };

  const getCurrencyLabel = id => {
    const found = currencyOptions.find(c => c.id === id);
    return found ? `${found.symbol}` : '';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        {/* My Profile */}
        <Text style={styles.sectionTitle}>My Profile</Text>
        <TouchableOpacity style={styles.row} activeOpacity={1} onPress={() => navigation.navigate('ProfileInfo')}>
          <Icon
            name="person-outline"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Personal Info</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} activeOpacity={1}>
          <MaterialIcon
            name="credit-card-outline"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Preferred Payment Method</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* My Trips */}
        <Text style={styles.sectionTitle}>My Trips</Text>
        <TouchableOpacity style={styles.row} activeOpacity={1}>
          <MaterialIcon
            name="notebook-outline"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Hotel Bookings</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} activeOpacity={1}>
          <MaterialIcon
            name="airplane"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Flight Bookings</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity
          style={styles.row}
          onPress={() => setModalVisible(true)}
          activeOpacity={1}>
          <MaterialIcon
            name="theme-light-dark"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Appearance</Text>
          <Text style={styles.statusText}>{getThemeLabel(selectedTheme)}</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => setLanguageModalVisible(true)}
          activeOpacity={1}>
          <MaterialIcon
            name="translate"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Language</Text>
          <Text style={styles.statusText}>
            {getLanguageLabel(selectedLanguage)}
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => setCurrencyModalVisible(true)}
          activeOpacity={1}>
          <MaterialIcon
            name="currency-usd"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Currency</Text>
          <Text style={styles.statusText}>
            {getCurrencyLabel(selectedCurrency)}
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} activeOpacity={1}>
          <MaterialIcon
            name="bell-outline"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Notifications</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} activeOpacity={1}>
          <MaterialIcon
            name="shield-lock-outline"
            size={responsiveFontSize(3)}
            color="#000"
          />
          <Text style={styles.rowText}>Account & Security</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color="#000"
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Help Center */}
        <Text style={styles.sectionTitle}>Help Center</Text>

        <View style={styles.helpGrid}>
          <TouchableOpacity style={styles.helpItem} activeOpacity={1}>
            <MaterialIcon
              name="help-circle-outline"
              size={responsiveFontSize(3)}
              color="#000"
            />
            <Text style={styles.helpText}>FAQs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpItem} activeOpacity={1}>
            <MaterialIcon
              name="chat-outline"
              size={responsiveFontSize(3)}
              color="#000"
            />
            <Text style={styles.helpText}>Chat with Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpItem}
            onPress={() => Linking.openURL('https://wa.me/7823812240')}
            activeOpacity={1}>
            <FontAwesome
              name="whatsapp"
              size={responsiveFontSize(3)}
              color="#25D366"
            />
            <Text style={styles.helpText}>WhatsApp</Text>
            <Text style={styles.phoneText}>+91 7823812240</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpItem}
            onPress={() => Linking.openURL('tel:7823812240')}
            activeOpacity={1}>
            <MaterialIcon
              name="phone-in-talk-outline"
              size={responsiveFontSize(3)}
              color="#000"
            />
            <Text style={styles.helpText}>CALL US</Text>
            <Text style={styles.phoneText}>+917823812240</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?')
          }
          activeOpacity={1}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Theme</Text>
            {themeOptions.map(theme => {
              const isSelected = selectedTheme === theme.id;
              return (
                <TouchableOpacity
                  key={theme.id}
                  style={styles.option}
                  onPress={() => handleThemeChange(theme.id)}
                  activeOpacity={1}>
                  <MaterialIcon
                    name={theme.icon}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : '#000'}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && {color: '#f97316'},
                    ]}>
                    {theme.name}
                  </Text>
                  <MaterialIcon
                    name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : '#000'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Language Modal */}
      <Modal animationType="slide" transparent visible={languageModalVisible}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setLanguageModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Language</Text>
            {languageOptions.map(lang => {
              const isSelected = selectedLanguage === lang.id;
              return (
                <TouchableOpacity
                  key={lang.id}
                  style={styles.option}
                  onPress={() => handleLanguageChange(lang.id)}
                  activeOpacity={1}>
                  <MaterialIcon
                    name={lang.icon}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : '#000'}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && {color: '#f97316'},
                    ]}>
                    {lang.name}
                  </Text>
                  <MaterialIcon
                    name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : '#000'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Currency Modal */}
      <Modal animationType="slide" transparent visible={currencyModalVisible}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCurrencyModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Currency</Text>
            {currencyOptions.map(currency => {
              const isSelected = selectedCurrency === currency.id;
              return (
                <TouchableOpacity
                  key={currency.id}
                  style={styles.option}
                  onPress={() => {
                    setSelectedCurrency(currency.id);
                    setCurrencyModalVisible(false);
                  }}
                  activeOpacity={1}>
                  {/* <MaterialIcon
                    name="currency-usd"
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : '#000'}
                  /> */}
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && {color: '#f97316'},
                    ]}>
                    {currency.symbol}  {currency.name}
                  </Text>
                  <MaterialIcon
                    name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : '#000'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default SettingsScreen;

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
  statusText: {
    fontSize: responsiveFontSize(1.8),
    color: '#555',
    marginRight: responsiveWidth(2),
  },
  divider: {
    height: responsiveHeight(2),
  },
  helpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  helpItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    borderRadius: 12,
    alignItems: 'center',
  },
  helpText: {
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(1),
    textAlign: 'center',
  },
  phoneText: {
    fontSize: responsiveFontSize(1.6),
    color: 'gray',
    marginTop: responsiveHeight(0.5),
  },
  logoutBtn: {
    backgroundColor: '#eee',
    padding: responsiveHeight(2),
    marginTop: responsiveHeight(2),
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
  },
  logoutText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.5),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    padding: responsiveHeight(2),
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
  },
  optionText: {
    fontSize: responsiveFontSize(2),
    flex: 1,
  },
});
