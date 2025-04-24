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
import {useTranslation} from 'react-i18next';

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
  const [visible, setVisible] = useState(false);
  const {theme, setTheme} = useTheme();
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState('inr');
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const {colors} = useTheme();

  const handleLanguageChange = (id) => {
    setSelectedLanguage(id);
    i18n.changeLanguage(id); 
    setLanguageModalVisible(false); 
  };

  const languageOptions = [
    {id: 'en', name: `${t('English')}`, icon: 'alpha-e-circle-outline'},
    {id: 'hi', name: `${t('Hindi')}`, icon: 'alpha-h-circle-outline'},
  ];


  const themeOptions = [
    {id: 'light', name: t('Light'), icon: 'white-balance-sunny'},
    {id: 'dark', name: t('Dark'), icon: 'weather-night'},
    {id: 'system', name: t('System Default'), icon: 'theme-light-dark'},
  ];


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
    <ScrollView
      style={[styles.container, {backgroundColor: colors.bg}]}
      showsVerticalScrollIndicator={false}>
      <View>
        {/* My Profile */}
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          {t('My Profile')}
        </Text>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('ProfileInfo')}>
          <Icon
            name="person-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color: colors.text}]}>
            {t('Personal Info')}
          </Text>
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
          <Text style={[styles.rowText, {color: colors.text}]}>
            {t('Preferred Payment Method')}
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* My Trips */}
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          {t('My Trips')}
        </Text>

        {/* WishList */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('Wishlist')}>
          <MaterialIcon
            name="heart-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color: colors.text}]}>
            {t('WishList')}
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Hotel Bookings */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={() => navigation.navigate('HotelBooking')}>
          <MaterialIcon
            name="notebook-outline"
            size={responsiveFontSize(3)}
            color={colors.text}
          />
          <Text style={[styles.rowText, {color: colors.text}]}>
            {t('Hotel Bookings')}
          </Text>
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
          <Text style={[styles.rowText, {color: colors.text}]}>
            {t('Flight Bookings')}
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Settings */}
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          {t('Settings')}
        </Text>

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
          <Text style={[styles.rowText, {color: colors.text}]}>{t('Theme')}</Text>
          <Text style={[styles.statusText, {color: colors.text}]}>
            {getThemeLabel(theme)}
          </Text>
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
          <Text style={[styles.rowText, {color: colors.text}]}>{t('Language')}</Text>
          <Text style={[styles.statusText, {color: colors.text}]}>
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
          <Text style={[styles.rowText, {color: colors.text}]}>{t('Currency')}</Text>
          <Text style={[styles.statusText, {color: colors.text}]}>
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
          <Text style={[styles.rowText, {color: colors.text}]}>
           {t('Notifications')}
          </Text>
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
          <Text style={[styles.rowText, {color: colors.text}]}>
            {t('Account & Security')}
          </Text>
          <Icon
            name="chevron-forward"
            size={responsiveFontSize(2.2)}
            color={colors.text}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Help Center */}
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          {t('Help Center')}
        </Text>

        {/* FAQs */}
        <View style={styles.helpGrid}>
          <TouchableOpacity
            style={[styles.helpItem, {backgroundColor: colors.subbg}]}
            activeOpacity={1}>
            <MaterialIcon
              name="help-circle-outline"
              size={responsiveFontSize(3)}
              color={colors.text}
            />
            <Text style={[styles.helpText, {color: colors.text}]}>{t('FAQs')}</Text>
          </TouchableOpacity>

          {/* Chat with Us */}
          <TouchableOpacity
            style={[styles.helpItem, {backgroundColor: colors.subbg}]}
            activeOpacity={1} onPress={() => navigation.navigate('Talk To Us')}>
            <MaterialIcon
              name="chat-outline"
              size={responsiveFontSize(3)}
              color={colors.text}
            />
            <Text style={[styles.helpText, {color: colors.text}]}>
              {t('Chat with Us')}
            </Text>
          </TouchableOpacity>

            {/* WhatsApp */}
          <TouchableOpacity
            style={[styles.helpItem, {backgroundColor: colors.subbg}]}
            onPress={() => Linking.openURL('https://wa.me/9352642793')}
            activeOpacity={1}>
            <FontAwesome
              name="whatsapp"
              size={responsiveFontSize(3)}
              color="#25D366"
            />
            <Text style={[styles.helpText, {color: colors.text}]}>
              {t('WhatsApp')}
            </Text>
            <Text style={[styles.phoneText, {color: colors.text}]}>
              +91 9352642793
            </Text>
          </TouchableOpacity>
          
          {/* Phone */}
          <TouchableOpacity
            style={[styles.helpItem, {backgroundColor: colors.subbg}]}
            onPress={() => Linking.openURL('tel:9352642793')}
            activeOpacity={1}>
            <MaterialIcon
              name="phone-in-talk-outline"
              size={responsiveFontSize(3)}
              color={colors.text}
            />
            <Text style={[styles.helpText, {color: colors.text}]}>{t('CALL US')}</Text>
            <Text style={[styles.phoneText, {color: colors.text}]}>
              +919352642793
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutBtn]}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?')
          }
          activeOpacity={1}>
          <Text style={[styles.logoutText]}>{t('Logout')}</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Modal */}
      <Modal animationType="slide" transparent visible={visible}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}>
          <View style={[styles.modalContent, {backgroundColor: colors.bg}]}>
            <Text style={[styles.modalTitle, {color: colors.text}]}>
              Choose Theme
            </Text>

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
                      {color: isSelected ? '#f97316' : colors.text},
                      ,
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
          style={[styles.modalOverlay, {backgroundColor: 'rgba(0,0,0,0.5)'}]}
          activeOpacity={1}
          onPress={() => setLanguageModalVisible(false)}>
          <View style={[styles.modalContent, {backgroundColor: colors.subbg}]}>
            <Text style={[styles.modalTitle, {color: colors.text}]}>
              Choose Language
            </Text>
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
                    color={isSelected ? '#f97316' : colors.icon}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      {color: isSelected ? '#f97316' : colors.text},
                    ]}>
                    {lang.name}
                  </Text>
                  <MaterialIcon
                    name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : colors.icon}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Preferred Payment Method */}
      <Modal animationType="slide" transparent visible={selectedPayment}>
        <View
          style={[
            styles.fullscreenModal,
            {backgroundColor: colors.background},
          ]}>
          {/* Header */}
          <View style={[styles.header, {borderBottomColor: colors.border}]}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setSelectedPayment(false)}>
              <Icon name="close" size={24} color={colors.icon} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {color: colors.text}]}>
              Payment Methods
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setSelectedPayment(false)}>
              <Icon name="checkmark" size={24} color={colors.icon} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={[styles.searchBar, {backgroundColor: colors.inputBg}]}>
            <Icon name="search" size={20} color={colors.placeholder} />
            <TextInput
              style={[styles.searchInput, {color: colors.text}]}
              placeholder="Search payment type"
              placeholderTextColor={colors.placeholder}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Info Text */}
          <Text style={[styles.infoText, {color: colors.textLight}]}>
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
                      color={isSelected ? colors.primary : colors.placeholder}
                    />
                    <Text style={[styles.optionText, {color: colors.text}]}>
                      {option.name}
                    </Text>
                    {/* Optional icon if needed: <Image source={option.icon} style={styles.optionIcon} /> */}
                  </TouchableOpacity>
                );
              })}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowMore(!showMore)}>
              <Text style={[styles.showMoreText, {color: colors.link}]}>
                {showMore ? 'Show less ▲' : 'Show more ▼'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Currency Modal */}
      <Modal animationType="slide" transparent visible={currencyModalVisible}>
        <TouchableOpacity
          style={[styles.modalOverlay, {backgroundColor: 'rgba(0,0,0,0.5)'}]}
          activeOpacity={1}
          onPress={() => setCurrencyModalVisible(false)}>
          <View style={[styles.modalContent, {backgroundColor: colors.subbg}]}>
            <Text style={[styles.modalTitle, {color: colors.text}]}>
              Choose Currency
            </Text>
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
                  <Text
                    style={[
                      styles.optionText,
                      {color: isSelected ? '#f97316' : colors.text},
                    ]}>
                    {currency.symbol} {currency.name}
                  </Text>
                  <MaterialIcon
                    name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                    size={responsiveFontSize(2.8)}
                    color={isSelected ? '#f97316' : colors.icon}
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
    color: '#fff',
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
