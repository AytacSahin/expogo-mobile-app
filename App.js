import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Intro from './components/1-Intro/intro';
import Draw from './components/2-DrawAI/Draw';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={() => (
            <View style={styles.homecontaniner}>
              <StatusBar style="auto" />
              <Intro />
            </View>
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ai" component={Draw} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  homecontaniner: {
    flex: 1,
    backgroundColor: 'white',
  },
});


