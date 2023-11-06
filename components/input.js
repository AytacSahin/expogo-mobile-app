import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
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