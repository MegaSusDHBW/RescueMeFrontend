import React, { useEffect, useState } from 'react';
// import { Alert } from 'react-native';
import { Button, Image, Text, View, HStack, VStack, ScrollView } from 'native-base';
// import * as Location from '../helper/LocationHelper';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
// import GetLocation from 'react-native-get-location'
// import Message from '../components/Message';
//import Geolocation from '@react-native-community/geolocation'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
// import style from "../components/Styles";
import { ipAdress } from '../helper/HttpRequestHelper';

async function GetLocation() {
  return (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('reject');
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('LOC ' + JSON.stringify(location));
    // setLocation(location);
    return location;
  })();
}

function HomeScreen({ navigation }) {
  const style = require('../components/Styles.js');
  const [what3Words, set3Words] = useState(null);
  const [email, setEmail] = useState('test');
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jwt, setJwt] = useState(null)
  const [hospitals_short, setHospitalShort] = useState([]);
  const [hospitals_rest, setHospitalRest] = useState([]);
  const hospital_count_short = 5;

  async function getJWT() {
    await SecureStore.getItemAsync('jwt')
  }

  getJWT()
  console.log(jwt);

  if (location === null) {
    GetLocation().then((loc) => {
      setLocation(loc);
    })
  }

  useEffect(async () => {
    try {
      let storeEmail = await SecureStore.getItemAsync('email');
      let jwt = await SecureStore.getItemAsync('jwt');
      setJwt(jwt)
      setEmail(storeEmail);
      if (errorMessage === null && what3Words === null) {
        const requestOptions =
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'jwt': jwt },
          body: JSON.stringify(location)
        };
        await fetch(
          ipAdress + 'get-geodata',
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
            console.log("Error msg: " + JSON.stringify(errorMessage));
            // Alert.alert(errorMessage.title);
          }
        });

        // add coords to request body
        requestOptions.body = JSON.stringify({
          coords: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        });

        console.log("GET HOSPITALS");
        await fetch(
          ipAdress + 'get-hospitals',
          requestOptions,
        ).then(async response => {
          const data = await response.json()

          if (response.ok) {
            console.log("HOSPITAL RESPONSE OKAY")
            // hospitals_all = data;
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

  if (jwt != undefined && email != undefined)
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
              uri: ipAdress + 'create-qrcode?date=' + new Date + '&jwt=' + jwt,
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
          {/* {errorMessage === null && */}
          <View style={style.fullWidth}>
            <Text style={style.textCenter}>GPS-Position</Text>
            <Text>what3words:</Text>
            <Text>///{what3Words}</Text>
          </View>
          {/* } */}
          {/* {errorMessage !== null && Message(errorMessage)} */}
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
  else {
    return (
      <View>
        <Text>loading</Text>
      </View>
    )
  }
}

export default HomeScreen;