import React, {useState,useEffect} from 'react';
import { StyleSheet,TextInput,View, SafeAreaView,Button,Text,PermissionsAndroid} from 'react-native';
import { Permissions} from 'expo'
//import * as Location from 'expo-location';
import * as Location from '../helper/LocationHelper';



function HomeScreen(props) {

    
   const loc = Location.getLocation();

    return (
        <View>
        <Text>{loc}</Text>
        <Button title='Home'/>
        </View>
    );
}

export default HomeScreen;