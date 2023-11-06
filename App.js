import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';
import AnimatedText from './components/animatedtext';
import Music from './components/music';

export default function App() {

  Music(); // müzik componenti çalıştırıldı.

  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/Ocean.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        useNativeControls={false}
        style={StyleSheet.absoluteFillObject} // Videoyu ekranı kaplayacak şekilde ayarla
      />
      <View style={styles.overlay}>
        <AnimatedText text='Mobile App' style={styles.text}>Mobile App</AnimatedText>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    marginTop: 80,
  },
  
});
