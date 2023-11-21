import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Intro from './components/1-Intro/intro';
import Draw from './components/2-DrawAI/draw';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as MediaLibrary from 'expo-media-library';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <View style={styles.homecontainer}>
              <StatusBar style="auto" />
              <Intro {...props} />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name="ai" options={{ headerShown: false }} component={Draw} >
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  homecontainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});


