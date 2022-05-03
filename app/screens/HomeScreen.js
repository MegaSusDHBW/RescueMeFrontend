import React, {useState,useEffect} from 'react';
import { StyleSheet,TextInput,View, SafeAreaView,Button,Text,PermissionsAndroid} from 'react-native';
import { Permissions} from 'expo'
//import * as Location from 'expo-location';
import * as Location from '../helper/LocationHelper';
import { NavigationContainer } from '@react-navigation/native';


function HomeScreen({navigation}) {

    
   const loc = Location.getLocation();
   function handleNavQR() {navigation.navigate('QRCodeScanner')};
    return (
        <View>
        <Text>{loc}</Text>
        <Button title='Home'/>
        <Button title='QR' onPress={handleNavQR}/>
        </View>
    );
}

export default HomeScreen;