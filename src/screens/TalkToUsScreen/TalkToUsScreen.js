import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TalkToUsScreen() {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I assist you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const { colors } = useTheme();
  const navigation = useNavigation();
  const flatListRef = useRef();

  const handleNewChat = () => {
    setMessages([{ text: 'Hi! How can I assist you today?', sender: 'bot' }]);
    setInput('');
  };

  const responses = {
    'hello': 'Hello! How can I assist you today?',
    'hi': 'Hi there! What would you like to know?',
    'hey': 'Hey! How can I help you?',
    'thank you': 'You’re welcome!',
    'thanks': 'Glad I could help!',
    'tell me tourist places in rajasthan':
      'Jaipur, Udaipur, Jodhpur, Jaisalmer, and Mount Abu are popular tourist destinations in Rajasthan.',
    'what is famous in udaipur':
      'City Palace, Lake Pichola, and Fateh Sagar Lake are famous attractions in Udaipur.',
    'what food is famous in rajasthan':
      'Dal Baati Churma, Gatte ki Sabzi, and Laal Maas are some of the most popular dishes in Rajasthan.',
    'tell me about rajasthan history':
      'Rajasthan has a rich Rajput history with legendary rulers like Maharana Pratap and Prithviraj Chauhan.',
  };

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const lowerInput = input.toLowerCase().trim();
    setInput('');

    const matchedQuestion = Object.keys(responses).find(q =>
      lowerInput.includes(q),
    );

    if (matchedQuestion) {
      const reply = responses[matchedQuestion];
      setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
    } else {
      const fallback = {
        text: "I'm not sure about that. Try asking something related to Rajasthan.",
        sender: 'bot',
      };
      setMessages(prev => [...prev, fallback]);
    }
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
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [navigation]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* New Chat Button at Top */}
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

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />

      {/* Input Box */}
      <View style={[styles.inputContainer, { borderColor: colors.border }]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor={colors.placeholder}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.border },
          ]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(3),
    paddingTop: responsiveHeight(2),
  },
  chatContainer: {
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
