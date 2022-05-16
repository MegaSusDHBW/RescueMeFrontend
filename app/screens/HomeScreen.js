import React, {useState,useEffect} from 'react';
import {Alert,Image,StyleSheet,TextInput,View, SafeAreaView,Button,Text,PermissionsAndroid} from 'react-native';
import { Permissions} from 'expo'
//import * as Location from 'expo-location';
import * as Location from '../helper/LocationHelper';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store'

function HomeScreen({navigation}) {

    const [what3Wrods, set3Words] = useState(null);
    const [email,setEmail] = useState('test'); 
    const [loc,setLocation] = useState(null);
    let location = Location.getLocation();
    
    
    useEffect( async () => {
        try {
            
            
                
            
            
            let storeEmail = await SecureStore.getItemAsync('email');
            console.log('store '+  storeEmail);
            console.log(email)
            setEmail(storeEmail);
            const requestOptions = 
            {
                
                method: 'POST',
                headers: {'Content-Type': 'application/json'},               
                 body: JSON.stringify(loc)
                };
                console.log("POST")
                console.log(loc)
                
                 
                await fetch(
                   'http://10.0.2.2:5000/get-geodata',
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
    
    

   function handleNavQR() {navigation.navigate('QRCodeScanner')};
    return (
        <View>
        
        <Text>{what3Wrods}</Text>
        <Text>{email}</Text>
        <Image key={new Date().getTime()} source={{ uri: 'http://10.0.2.2:5000/create-qrcode?email=' +email+'&date='+ new Date, cache:'reload'}} style={{width: '50%', height: '50%'}}/>
        <Button title='QR' onPress={handleNavQR}/>
        </View>
    );
}

export default HomeScreen;