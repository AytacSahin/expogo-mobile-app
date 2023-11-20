import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';

const TextInputExample = ({ onTextChange, onSendPress }) => {
  const handleTextChange = (text) => {
    onTextChange(text);
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
      />
      <Button
        title='Gönder'
        onPress={onSendPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 380,
    height: 'auto',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;