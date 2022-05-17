import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Input, Button, View, Text, Image, Icon } from 'native-base';
import * as Location from '../helper/LocationHelper';
import * as SecureStore from 'expo-secure-store'

function HomeScreen({ navigation }) {
  const style = require('../components/Styles.js');
  const [what3Words, set3Words] = useState(null);
  const [email, setEmail] = useState('test');
  const [loc, setLocation] = useState(null);
  let location = Location.getLocation();


  useEffect(async () => {
    try {
      let storeEmail = await SecureStore.getItemAsync('email');
      console.log('store ' + storeEmail);
      console.log(email)
      setEmail(storeEmail);
      const requestOptions =
      {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loc)
      };
      console.log("POST")
      console.log(loc)

      await fetch(
        'http://10.0.2.2:5000/get-geodata',
        requestOptions,
      ).then(response => {
        if (response.ok) {
          console.log(JSON.parse(response.body, 'words'));
          set3Words(JSON.parse(response.body, 'words'));

        } else {
          Alert.alert('Ups')
        }
        ;
      });
    } catch (error) {
      console.error(error);
    }
  });

  function handleNavQR() {
    navigation.navigate('QRCodeScanner')
  };
  return (
    <View style={[style.wrapper, style.flex, style.flexStart, style.paddingTop]}>
      <View style={style.marginForm}>
        <Text style={style.textCenter}>Willkommen,</Text>
        <Text style={style.textCenter}>{email}!</Text>
      </View>
      {/* <Text style={style.fullWidth}>{email}</Text> */}
      {/* <View> */}
      <Image key={new Date().getTime()} source={{
        uri: 'http://10.0.2.2:5000/create-qrcode?email=' + email + '&date=' + new Date,
        cache: 'reload'
      }} style={[{ width: 'auto', height: '55%' }, style.fullWidth, style.marginForm]} />
      <Button
        onPress={handleNavQR}
        style={[style.fullWidth, style.marginForm]}>
        <Text>Gesundheitsdaten hinzufügen</Text>
      </Button>
      {/* </View> */}
      <View style={style.fullWidth}>
        <Text style={style.textCenter}>GPS-Position</Text>
        <Text>what3words:</Text>
        <Text>///{what3Words}</Text>
      </View>
    </View>
  );
}

export default HomeScreen;