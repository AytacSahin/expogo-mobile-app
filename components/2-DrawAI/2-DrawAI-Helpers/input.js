import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

const Input = ({ onChangeText }) => {

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder='Type your imagine...'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 25,
    width: 350,
    height: 60,
    margin: 20,
    borderWidth: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black'
  },
});

export default Input;