import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Button, Image, Text, View, useToast, VStack, ScrollView } from 'native-base';
import * as Location from '../helper/LocationHelper';
import * as SecureStore from 'expo-secure-store';
import Message from '../components/Message';
import style from "../components/Styles";

function HomeScreen({ navigation }) {
  const style = require('../components/Styles.js');
  const [what3Words, set3Words] = useState(null);
  const [email, setEmail] = useState('test');
  const [loc, setLocation] = useState(null);
  let location = Location.getLocation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [jwt, setJwt] = useState(null)
  const toast = useToast();

  useEffect(async () => {
    try {
      let storeEmail = await SecureStore.getItemAsync('email');
      let jwt = await SecureStore.getItemAsync('jwt');
      console.log('jwt '+jwt)
      setJwt(jwt)
      setEmail(storeEmail);
      if (errorMessage === null && what3Words === null) {
        const requestOptions =
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loc)
        };
        // console.log("POST")
        // console.log(loc)

        await fetch(
          'http://10.0.2.2:5000/get-geodata',
          requestOptions,
        ).then(async response => {
          if (response.ok) {
            console.log("RESPONSE OKAY")
            const data = await response.json()

            let what3words = data.words;
            set3Words(what3words);
          } else {
            console.log("RESPONSE NOT OKAY")
            const data = await response.json()
            let errorMessage = {
              status: "error",
              title: data.words
            };
            setErrorMessage(errorMessage);
            // Alert.alert(errorMessage.title);
            // toast.show({ description: errorMessage.title });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  function handleNavigationData() {
    navigation.navigate('Data')
  };

  return (
    <ScrollView>
      <VStack style={[style.wrapper, style.flex, style.flexStart, style.paddingTop]}>
        <VStack style={style.marginForm}>
          <Text style={style.textCenter}>Willkommen,</Text>
          <Text style={style.textCenter}>{email}!</Text>
        </VStack>
        <Image
          key={new Date().getTime()}
          source={{
            uri: 'http://10.0.2.2:5000/create-qrcode?email=' + email + '&date=' + new Date,
            cache: 'reload', 
            //headers:{jwt: jwt}
          }}
          style={[style.marginForm]}
          alt={'Encrypted QR Code'} />
        <Button
          onPress={handleNavigationData}
          style={[style.marginForm]}>
          <Text>Gesundheitsdaten hinzufügen</Text>
        </Button>
        {errorMessage === null &&
          <View style={style.fullWidth}>
            <Text style={style.textCenter}>GPS-Position</Text>
            <Text>what3words:</Text>
            <Text>///{what3Words}</Text>
          </View>
        }
        {errorMessage !== null && Message(errorMessage)}
      </VStack>
    </ScrollView>
  )
}

export default HomeScreen;