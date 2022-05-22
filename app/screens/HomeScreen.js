import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Button, Image, Text, View, HStack, VStack, ScrollView } from 'native-base';
import * as Location from '../helper/LocationHelper';
import * as SecureStore from 'expo-secure-store';
import Message from '../components/Message';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import style from "../components/Styles";
import { ipAdress } from '../helper/HttpRequestHelper';

function HomeScreen({ navigation }) {
  const style = require('../components/Styles.js');
  const [what3Words, set3Words] = useState(null);
  const [email, setEmail] = useState('test');
  const [location, setLocation] = useState(null);
  // let location = ;
  // setLoc
  const [errorMessage, setErrorMessage] = useState(null);
  const [jwt, setJwt] = useState(null)
  const [hospitals_short, setHospitalShort] = useState([]);
  const [hospitals_rest, setHospitalRest] = useState([]);
  const hospital_count_short = 5;

  
async function getWhat3Words(){
  let temp = await Location.getLocation()
  console.log('Temp'+temp);
  const requestOptions =
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'jwt': jwt },
          body: JSON.stringify(temp)
        };
       const response= await fetch(ipAdress+'get-geodata', requestOptions )
        const data = await response.json()
        console.log(data);
        set3Words(data.words)

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
          ipAdress+'get-geodata',
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
            latitude: '48.445124666',//location.coords.latitude,
            longitude: '8.6969068093'//location.coords.longitude,
          }
        });
        console.log("request body :" + requestOptions.body);

        console.log("GET HOSPITALS");
        await fetch(
          ipAdress+'get-hospitals',
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

if(jwt != null && email != null )
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
            uri: ipAdress+'create-qrcode?date=' + new Date,
            headers:{'jwt': jwt},
            cache: 'reload', 

          }}
          style={[style.marginForm]}
          alt={'Encrypted QR Code'} />
        <Button
          onPress={handleNavigationData}
          style={[style.marginForm]}>
          <Text variant={'button'}>Gesundheitsdaten hinzufügen</Text>
        </Button>
        {errorMessage === null &&
          <View style={style.fullWidth}>
            <Text style={style.textCenter}>GPS-Position</Text>
            <Text>what3words:</Text>
            <Text>///{what3Words}</Text>
          </View>
        }
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
  else{
    return(
    <View>
     <Text>loading</Text>
  </View>
    )
  }
}

export default HomeScreen;