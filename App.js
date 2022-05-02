import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TouchableWithoutFeedback,Alert, Button, Text, View, Image, SafeAreaView,TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import RegestrationScreen from './app/screens/RegistrationScreen';
import LoginScreen from './app/screens/LoginScreen';
import Header from './app/components/Header';
import StackNavigator from './app/components/StackNavigator';
import TabNavigator from './app/components/TabNavigator';


export default function App() {

  const [auth,setAuth] = React.useState(false)
  
    
    if (auth) {
      console.log("TabNav");
      return(
        <NavigationContainer styles={styles.container}>
          <TabNavigator/>
        </NavigationContainer>

      );
    }
    else
  return (
    
      <NavigationContainer styles={styles.container} auth={auth}>
    <StackNavigator/>
    </NavigationContainer>
    
  );
}



const styles = StyleSheet.create({
  headerContainer:{
    flex: 1,
    width:"100%",
    height:"100%",
    justifyContent: 'flex-start'
  },
  container: {
    flex: 1,
    width:"100%",
    height:"100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
