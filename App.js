import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootSiblingParent } from 'react-native-root-siblings';

import Intro from './components/1-Intro/intro';
import Music from './components/1-Intro/1-Intro-Helpers/music';
import Draw from './components/2-DrawAI/draw';
import Change from './components/3-PhotoEditorAI/change';

const Stack = createStackNavigator();

export default function App() {

  return (
    <RootSiblingParent>
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

          <Stack.Screen name="drawAI" options={{ headerShown: false }} component={Draw} />
          <Stack.Screen name="changeAI" options={{ headerShown: false }} component={Change} />

        </Stack.Navigator>
        <Music />
      </NavigationContainer>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  homecontainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});


