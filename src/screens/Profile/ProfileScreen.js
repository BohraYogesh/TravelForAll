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
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/theme';

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
  // const [selectedTheme, setSelectedTheme] = useState('system');
  // const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const {theme, setTheme} = useTheme();

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState('inr');
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const {colors} = useTheme();

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

  const handleSelect = value => {
    setTheme(value);
    setVisible(false);
  };

  const paymentOptions = [
    {
      id: 'mastercard',
      name: 'MasterCard Credit',
    },
    {id: 'visa_credit', name: 'Visa Credit'},
    {id: 'visa_debit', name: 'Visa Debit'},
    {
      id: 'net_banking',
      name: 'Net Banking',
    },
    {id: 'upi', name: 'UPI'},
    {id: 'amex', name: 'American Express'}, // hidden initially
  ];
  const togglePayment = id => {
    setSelectedMethods(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor:colors.bg}]} showsVerticalScrollIndicator={false}>
      <View>
        {/* My Profile */}
        <Text style={[styles.sectionTitle, {color:colors.text}]}>My Profile</Text>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('ProfileInfo')}>
          <Icon
            name="person-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Personal Info</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Preferred Payment Method */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setSelectedPayment(true)}
          activeOpacity={1}>
          <MaterialIcon
            name="credit-card-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Preferred Payment Method</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* My Trips */}
        <Text style={[styles.sectionTitle, {color:colors.text}]}>My Trips</Text>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('HotelBooking')}>
          <MaterialIcon
            name="notebook-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Hotel Bookings</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Flight Bookings */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('FlightBooking')}>
          <MaterialIcon
            name="airplane"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Flight Bookings</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Settings */}
        <Text style={[styles.sectionTitle, {color:colors.text}]}>Settings</Text>

        {/* Appearance */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setVisible(true)}
          activeOpacity={1}>
          <MaterialIcon
            name="theme-light-dark"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Theme</Text>
          <Text style={[styles.statusText, {color:colors.text}]}>{getThemeLabel(theme)}</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Language */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setLanguageModalVisible(true)}
          activeOpacity={1}>
          <MaterialIcon
            name="translate"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Language</Text>
          <Text style={[styles.statusText, {color:colors.text}]}>
            {getLanguageLabel(selectedLanguage)}
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Currency */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setCurrencyModalVisible(true)}
          activeOpacity={1}>
          <MaterialIcon
            name="currency-usd"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Currency</Text>
          <Text style={[styles.statusText, {color:colors.text}]}>
            {getCurrencyLabel(selectedCurrency)}
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('Notification')}>
          <MaterialIcon
            name="bell-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Notifications</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Account & Security */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('Account&Security')}>
          <MaterialIcon
            name="shield-lock-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color:colors.text}]}>Account & Security</Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Help Center */}
        <Text style={[styles.sectionTitle, {color:colors.text}]}>Help Center</Text>

        {/* FAQs */}
        <View style={styles.helpGrid}>
          <TouchableOpacity style={[styles.helpItem, {backgroundColor:colors.subbg}]} activeOpacity={1}>
            <MaterialIcon
              name="help-circle-outline"
              size={responsiveFontSize(3)}
              color={colors.text}
            />
            <Text style={[styles.helpText, {color:colors.text}]}>FAQs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.helpItem, {backgroundColor:colors.subbg}]} activeOpacity={1}>
            <MaterialIcon
              name="chat-outline"
              size={responsiveFontSize(3)}
              color={colors.text}
            />
            <Text style={[styles.helpText, {color:colors.text}]}>Chat with Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.helpItem, {backgroundColor:colors.subbg}]}
            onPress={() => Linking.openURL('https://wa.me/7823812240')}
            activeOpacity={1}>
            <FontAwesome
              name="whatsapp"
              size={responsiveFontSize(3)}
              color="#25D366"
            />
            <Text style={[styles.helpText, {color:colors.text}]}>WhatsApp</Text>
            <Text style={[styles.phoneText, {color:colors.text}]}>+91 7823812240</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.helpItem, {backgroundColor:colors.subbg}]}
            onPress={() => Linking.openURL('tel:7823812240')}
            activeOpacity={1}>
            <MaterialIcon
              name="phone-in-talk-outline"
              size={responsiveFontSize(3)}
              color={colors.text}
            />
            <Text style={[styles.helpText, {color:colors.text}]}>CALL US</Text>
            <Text style={[styles.phoneText, {color:colors.text}]}>+917823812240</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutBtn]}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?')
          }
          activeOpacity={1}>
          <Text style={[styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Modal */}
      <Modal animationType="slide" transparent visible={visible}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}>
          <View style={[styles.modalContent, {backgroundColor:colors.bg}]}>
            <Text style={[styles.modalTitle, {color:colors.text}]}>Choose Theme</Text>

            {themeOptions.map(item => {
              const isSelected = theme === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.option}
                  onPress={() => handleSelect(item.id)}
                  activeOpacity={1}>
                  <MaterialIcon
                    name={item.icon}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : colors.text}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      { color: isSelected ? '#f97316' : colors.text },,
                    ]}>
                    {item.name}
                  </Text>
                  <MaterialIcon
                    name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : colors.text}
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

      {/* Preferred Payment Method */}
      <Modal animationType="slide" transparent visible={selectedPayment}>
        <View style={styles.fullscreenModal}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setSelectedPayment(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment Methods</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setSelectedPayment(false)}>
              <Icon name="checkmark" size={24} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search payment type"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Info Text */}
          <Text style={styles.infoText}>
            By selecting one or more (max 10) payment types, prices on Wego will
            include applicable minimum payment fees. Please note that not all
            providers support all payment types.
          </Text>

          {/* Filtered Payment List */}
          <ScrollView>
            {(showMore ? paymentOptions : paymentOptions.slice(0, 5))
              .filter(option =>
                option.name.toLowerCase().includes(searchText.toLowerCase()),
              )
              .map(option => {
                const isSelected = selectedMethods.includes(option.id);
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={option.id}
                    style={styles.optionRow}
                    onPress={() => togglePayment(option.id)}>
                    <MaterialIcon
                      name={
                        isSelected
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
                      size={22}
                      color={isSelected ? '#f97316' : 'gray'}
                    />
                    <Text style={styles.optionText}>{option.name}</Text>
                    {/* <Image source={option.icon} style={styles.optionIcon} /> */}
                  </TouchableOpacity>
                );
              })}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowMore(!showMore)}>
              <Text style={styles.showMoreText}>
                {showMore ? 'Show less ▲' : 'Show more ▼'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
                    {currency.symbol} {currency.name}
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
    backgroundColor: '#065f56',
    padding: responsiveHeight(2),
    marginTop: responsiveHeight(2),
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
  },
  logoutText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#fff'
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
    borderTopRightRadius: responsiveWidth(3),
    borderTopLeftRadius: responsiveWidth(3),
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
    marginLeft: responsiveWidth(2.5),
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: responsiveWidth(2.5),
    padding: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
  },
  searchInput: {
    marginLeft: responsiveWidth(2),
    flex: 1,
    fontSize: responsiveFontSize(1.8),
  },
  infoText: {
    fontSize: responsiveFontSize(1.5),
    color: '#6b7280',
    marginBottom: responsiveHeight(1.5),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.2),
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e7eb',
  },
  optionIcon: {
    width: responsiveWidth(8),
    height: responsiveHeight(2.5),
    resizeMode: 'contain',
  },
  showMoreText: {
    textAlign: 'center',
    color: '#000',
    marginTop: responsiveHeight(1.5),
    fontSize: responsiveFontSize(1.8),
  },
});
