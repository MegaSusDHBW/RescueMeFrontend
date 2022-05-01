import React, {useState,useEffect} from 'react';
import { StyleSheet,TextInput,View, SafeAreaView,Button,Text,PermissionsAndroid} from 'react-native';
import { Permissions} from 'expo'
//import * as Location from 'expo-location';




function ProfileScreen({navigation}) {

  function handleChangePassword () {navigation.navigate('Passwort ändern')};
   
      
    return (
        <View>
        <Button title='Passwort ändern' onPress={handleChangePassword}/>
        <Button title='Konto Löschen' />
        </View>
    );
}

export default ProfileScreen;