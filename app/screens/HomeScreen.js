import React, {useEffect, useState} from 'react';
import {Alert, Button, Center, CloseIcon, HStack, IconButton, Image, Text, View, VStack} from 'native-base';
import * as Location from '../helper/LocationHelper';
import * as SecureStore from 'expo-secure-store'
import style from "../components/Styles";

function HomeScreen({navigation}) {
    const style = require('../components/Styles.js');
    const [what3Words, set3Words] = useState(null);
    const [email, setEmail] = useState('test');
    const [loc, setLocation] = useState(null);
    let location = Location.getLocation();
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(async () => {
        try {
            let storeEmail = await SecureStore.getItemAsync('email');
            console.log('store ' + storeEmail);
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
            ).then(response => {
                if (response.ok) {
                    console.log("RESPONSE OKAY")
                    const data = response.json()

                    let what3words = data.words;
                    set3Words(what3words);
                } else {
                    console.log("RESPONSE NOT OKAY")
                    const data = response.json()
                    let errorMessage = {
                        status: "error",
                        title: data.words
                    };
                    setErrorMessage(errorMessage);

                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    function showErrorMessage() {
        return (
            <Center>
                <Alert w="100%" h="55%" status={errorMessage.status}>
                    <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} justifyContent="space-between">
                            <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt="1"/>
                                <Text fontSize="md" color="coolGray.800">
                                    {errorMessage.title}
                                </Text>
                            </HStack>
                            <IconButton variant="unstyled" _focus={{
                                borderWidth: 0
                            }} icon={<CloseIcon size="3" color="coolGray.600"/>}/>
                        </HStack>
                    </VStack>
                </Alert>
            </Center>
        )
    }

    function handleNavQR() {
        navigation.navigate('QRCodeScanner')
    };

    if (errorMessage != null) {

        return showErrorMessage();
    } else {
        return (

            <View style={[style.wrapper, style.flex, style.flexStart, style.paddingTop]}>
                <View style={style.marginForm}>
                    <Text style={style.textCenter}>Willkommen,</Text>
                    <Text style={style.textCenter}>{email}!</Text>
                </View>
                <Image key={new Date().getTime()} source={{
                    uri: 'http://10.0.2.2:5000/create-qrcode?email=' + email + '&date=' + new Date,
                    cache: 'reload'
                }} style={[{width: 'auto', height: '55%'}, style.fullWidth, style.marginForm]}/>
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

        )
    }


}

export default HomeScreen;