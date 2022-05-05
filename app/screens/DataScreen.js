import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet,Text,TextInput,View,Button, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

function DataScreen({navigation}) {

   function handleNavigationHome(){
       navigation.navigate('Home')
   }
   
   useEffect( async () => {
    getUserMail();
});

async function getUserMail(){
    let store = await SecureStore.getItemAsync('email');
    console.log('store ' + store);
      return setUsermail(store) 
  }
   


    const healthData = {
        firstName: '',
        lastName: '',
        organDonorState:'',
        bloodGroup:'',
        userMail:'' ,
    }
    const [firstName,setFristName]= useState(null)
    const [lastName,setLastName]= useState(null)
    const [organDonorState,setOrganDonorState] = useState(false)
    const [bloodGroup, setBloodGroup] = useState(null)
    const [userMail,setUsermail] = useState(null)
    healthData.firstName = firstName;
    healthData.lastName = lastName;
    healthData.organDonorState = organDonorState;
    healthData.bloodGroup = bloodGroup;
    healthData.userMail = userMail;
    const handleSubmit= async () => {
        try {
    const requestOptions = 
    {
    
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(healthData)
    };
        console.log("POST")
        console.log(JSON.stringify(healthData))
        
         
        await fetch(
           'http://10.0.2.2:5000/encrypt/gesundheitsdaten',
            requestOptions,
          ).then(response => { if(response.ok){
            
            handleNavigationHome();
          }else{
            Alert.alert('Ups')
          };
          });
        } catch (error) {
          console.error(error);
        }
      };



    return (
        <View>
            <TextInput placeholder='Vorname' onChangeText={(value) => setFristName(value)} value={firstName} />
            <TextInput placeholder='Nachname' onChangeText={(value) => setLastName(value)} value={lastName} />
            <Text>Organspender</Text>
            <Switch title="Organd Spender" onValueChange={(value) => setOrganDonorState(value)} value={organDonorState}/>
            <Text>Blutgruppe</Text>
            <Picker selectedValue={bloodGroup} placeholder="Blutgruppe" onValueChange={(value, index) => setBloodGroup(value)}>
            <Picker.Item label='Blutgruppe Auswählen' />
                <Picker.Item label='A+' value={"A+"}/>
                <Picker.Item label='A-'value={"A-"}/>
                <Picker.Item label='B+' value={"B+"}/>
                <Picker.Item label='B-' value={"B-"}/>
                <Picker.Item label='AB+' value={"AB+"}/>
                <Picker.Item label='AB-' value={"AB-"}/>
                <Picker.Item label='0+' value={"0+"}/>
                <Picker.Item label='0-' value={"0-"}/>
            </Picker>
             
        <Button title='Data' onPress={handleSubmit}/>
        </View>
    );
}

export default DataScreen;