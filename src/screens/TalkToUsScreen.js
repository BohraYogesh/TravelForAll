import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../context/theme';

export default function TalkToUsScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { colors } = useTheme();

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, 
            'Content-Type': 'application/json',
          },
        }
      );

      const botReply = res.data.choices[0].message.content.trim();
      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === 'user'
          ? [styles.userMessage, { backgroundColor: colors.primaryLight }]
          : [styles.botMessage, { backgroundColor: colors.card }],
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>{item.text}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={[styles.inputContainer, { borderColor: colors.border }]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor={colors.placeholder}
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        />
        <TouchableOpacity activeOpacity={1} onPress={sendMessage} style={[styles.sendButton, { backgroundColor: '#097C70' }]}>
          <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8) }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(3),
  },
  chatContainer: {
    paddingBottom: responsiveHeight(2),
  },
  message: {
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(4),
    marginVertical: responsiveHeight(0.7),
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  text: {
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
});
