import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function TalkToUsScreen() {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I assist you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const { colors } = useTheme();
  const navigation = useNavigation();
  const flatListRef = useRef();
  const [keyboardVisible, setKeyboardVisible] = useState(false);  

  const handleNewChat = () => {
    setMessages([{ text: 'Hi! How can I assist you today?', sender: 'bot' }]);
    setInput('');
  };

  const responses = {
    hello: 'Hello! How can I assist you today?',
    hi: 'Hi there! What would you like to know?',
    hey: 'Hey! How can I help you?',
    'thank you': 'You’re welcome!',
    thanks: 'Glad I could help!',
    rajasthan: 'Rajasthan is known for its rich Rajput history, beautiful palaces, and desert landscapes. Some popular cities include Jaipur, Udaipur, Jodhpur, and Jaisalmer.',
    pune: 'Pune is a vibrant city in Maharashtra, known for its historical landmarks, educational institutions, and pleasant weather. It is also called the "Oxford of the East."',
    udaipur: 'Udaipur is a beautiful city in Rajasthan, famous for its stunning lakes, palaces, and temples. The City Palace and Lake Pichola are popular attractions here.',
  };

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const lowerInput = input.toLowerCase().trim();
    setInput('');

    
    setMessages(prev => [...prev, { text: 'bot is typing...', sender: 'bot' }]);

    
    const matchedResponse = Object.keys(responses).find(q =>
      lowerInput.includes(q),
    );

 
    setTimeout(() => {
      const botResponse = matchedResponse
        ? responses[matchedResponse]
        : "I'm having trouble understanding that. Could you please try greeting me with 'Hi' or 'Hello'?";

    
      setMessages(prev => [
        ...prev.filter(msg => msg.text !== 'bot is typing...'), 
        { text: botResponse, sender: 'bot' },
      ]);
    }, 800);
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.botMessageContainer,
        ]}>
        {!isUser && (
          <MaterialCommunityIcons
            name="robot"
            size={responsiveWidth(6)}
            color={colors.text}
            style={styles.iconStyle}
          />
        )}
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isUser ? colors.userBubble : colors.botBubble,
              alignSelf: isUser ? 'flex-end' : 'flex-start',
            },
          ]}>
          <Text style={[styles.messageText, { color: colors.text }]}>
            {item.text}
          </Text>
        </View>
        {isUser && (
          <MaterialCommunityIcons
            name="account-circle"
            size={responsiveWidth(6)}
            color={colors.text}
            style={styles.iconStyle}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }

    // Monitor keyboard visibility changes
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {/* Fixed Header and New Chat Button */}
          <View style={styles.newChatButtonContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleNewChat}
              style={[styles.newChatButton, { backgroundColor: colors.primary }]}>
              <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8) }}>
                New Chat
              </Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Messages and Input */}
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled">
            {/* Messages List */}
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            />

            {/* Input Box */}
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: colors.border,
                  zIndex: keyboardVisible ? 10 : 0, // Set zIndex when keyboard is visible
                },
              ]}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Type a message..."
                placeholderTextColor={colors.placeholder}
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={sendMessage}
                style={[styles.sendButton, { backgroundColor: '#097C70' }]}>
                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8) }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(3),
    paddingTop: responsiveHeight(2),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: responsiveHeight(2),
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(1),
    alignItems: 'center',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    padding: responsiveWidth(3.5),
    borderRadius: responsiveWidth(5),
    maxWidth: '80%',
  },
  messageText: {
    fontSize: responsiveFontSize(1.9),
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: responsiveHeight(1),
    borderTopWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: responsiveWidth(5),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
  },
  sendButton: {
    marginLeft: responsiveWidth(2),
    borderRadius: responsiveWidth(5),
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  newChatButtonContainer: {
    paddingBottom: responsiveHeight(2),
    alignItems: 'flex-end',
  },
  newChatButton: {
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    marginHorizontal: responsiveWidth(2),
  },
});
