import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, VStack, ScrollView } from 'native-base';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { ipAddress } from '../helper/HttpRequestHelper';

async function GetLocation() {
  return (async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  })();
}

function HomeScreen({ navigation }) {
  const style = require('../components/Styles.js');
  const [what3Words, set3Words] = useState(null);
  const [email, setEmail] = useState('test');
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [hospitals_short, setHospitalShort] = useState([]);
  const [hospitals_rest, setHospitalRest] = useState([]);
  const hospital_count_short = 5;

  async function getJWT() {
    await SecureStore.getItemAsync('jwt');
  }

  getJWT();

  if (location === null) {
    GetLocation().then((loc) => {
      setLocation(loc);
    })
  }

  useEffect(async () => {
    try {
      let storeEmail = await SecureStore.getItemAsync('email');
      let jwt = await SecureStore.getItemAsync('jwt');

      setJwt(jwt);
      setEmail(storeEmail);

      if (errorMessage === null && what3Words === null) {
        // setup request options
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'jwt': jwt },
          body: JSON.stringify(location)
        };

        // fetch w3w data
        await fetch(
          ipAddress + 'get-geodata',
          requestOptions,
        ).then(async response => {
          const data = await response.json();
          if (response.ok) {
            console.log("W3W RESPONSE OKAY");
            set3Words(data.words);
          } else {
            console.log("W3W RESPONSE NOT OKAY");
            setErrorMessage({
              status: "error",
              title: data.words
            });
          }
        });

        // add coords to request body
        requestOptions.body = JSON.stringify({
          coords: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        });

        // fetch hospital data
        await fetch(
          ipAddress + 'get-hospitals',
          requestOptions,
        ).then(async response => {
          const data = await response.json();
          if (response.ok) {
            console.log("HOSPITAL RESPONSE OKAY");
            let tempShort = [];
            let tempRest = [];

            for (let index = 0; index < Object.keys(data).length; index++) {
              if (index < hospital_count_short) {
                tempShort.push(data[index]);
              } else {
                tempRest.push(data[index]);
              }
            }

            setHospitalShort(tempShort);
            setHospitalRest(tempRest);
          } else {
            console.log("HOSPITAL RESPONSE NOT OKAY");
            setErrorMessage({
              status: "error",
              title: data.words
            });
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

  function handleNavigationGuide() {
    navigation.navigate('Guide')
  }

  if (jwt != undefined && email != undefined) {
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
              uri: ipAddress + 'create-qrcode?date=' + new Date() + '&jwt=' + jwt,
              headers: { 'jwt': jwt },
              cache: 'reload',
            }}
            style={[style.marginForm]}
            alt={'Encrypted QR Code'} />
          <Button
            onPress={handleNavigationData}
            style={[style.marginForm]}>
            <Text variant={'button'}>Gesundheitsdaten hinzufügen</Text>
          </Button>
          {/* {errorMessage !== null && Message(errorMessage)} */}
          <View style={[style.fullWidth, style.marginForm]}>
            <Text style={style.textCenter}>GPS-Position</Text>
            <Text>what3words:</Text>
            <Text>///{what3Words}</Text>
          </View>
          <Button
            onPress={handleNavigationGuide}
            style={[style.marginForm]}>
            <Text variant={'button'}>Erste Hilfe Guide</Text>
          </Button>
          <View>
            <Collapse>
              <CollapseHeader>
                <View style={[style.paddingForm, style.marginForm]}>
                  <Text>Krankenhäuser in der Nähe</Text>
                  {hospitals_short.map(hospital => {
                    return <Text style={[style.dividerBot, style.paddingForm]}>─ {hospital.name}</Text>
                  })}
                </View>
              </CollapseHeader>
              <CollapseBody>
                <VStack style={style.marginForm}>
                  {hospitals_rest.map(hospital => {
                    return <Text style={[style.paddingForm]}>─ {hospital.name}</Text>
                  })}
                </VStack>
              </CollapseBody>
            </Collapse>
          </View>
        </VStack>
      </ScrollView>
    )
  } else {
    return (
      <View>
        <Text>loading</Text>
      </View>
    )
  }
}

export default HomeScreen;