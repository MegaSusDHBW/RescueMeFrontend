import React from 'react'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';


import StackNavigator from './app/components/StackNavigator';
import TabNavigator from './app/components/TabNavigator';
import {NativeBaseProvider,extendTheme}from 'native-base'

const newColorTheme = {
  brand:{
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({colors: newColorTheme})
export default function App() {

  
  
  return (
    <NativeBaseProvider theme={theme}>
    <NavigationContainer >
    <StackNavigator/>
    </NavigationContainer>
    </NativeBaseProvider>   
    
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
