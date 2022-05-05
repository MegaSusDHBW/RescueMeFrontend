import React, {useState,useEffect} from 'react';
import {Alert,Image,StyleSheet,TextInput,View, SafeAreaView,Button,Text,PermissionsAndroid} from 'react-native';
import { Permissions} from 'expo'
//import * as Location from 'expo-location';
import * as Location from '../helper/LocationHelper';
import { NavigationContainer } from '@react-navigation/native';


function HomeScreen({navigation}) {

    const [what3Wrods, set3Words] = useState(null);
    useEffect( async () => {
        try {
            const requestOptions = 
            {
            
                method: 'POST',
                headers: {'Content-Type': 'application/json'},               
                 body: JSON.stringify( {"timestamp":1651249739395,"mocked":false,"coords":
                {"altitude":492.6000061035156,"heading":188.02468872070312,"altitudeAccuracy":1,"latitude":48.3467175,"speed":0.15243065357208252,"longitude":8.4118659,"accuracy":14.265999794006348}})
            };
                console.log("POST")
                console.log(loc)
                
                 
                await fetch(
                   'http://10.0.2.2:5000/getGeodata',
                    requestOptions,
                  ).then(response => { if(response.ok){
                      console.log(JSON.parse(response.body,'words'));
                    set3Words(JSON.parse(response.body,'words'));
                    
                  }else{
                    Alert.alert('Ups')
                  };
                  });
                } catch (error) {
                  console.error(error);
                }
              


    });
    
   const loc = Location.getLocation();


   function handleNavQR() {navigation.navigate('QRCodeScanner')};
    return (
        <View>
        <Text>{what3Wrods}</Text>
        <Image source={{ uri: 'http://10.0.2.2:5000/encrypt/qrcode' }} style={{width: '50%', height: '50%'}}/>
        <Button title='Home'/>
        <Button title='QR' onPress={handleNavQR}/>
        </View>
    );
}

export default HomeScreen;