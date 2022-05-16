import React, {useEffect, useState} from 'react';
import {Alert, TextInput, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {Button} from 'native-base'


function LoginScreen({navigation}) {
    const [email, setEmail] = useState(null);
    const [auth, setAuth] = useState(null);
    useEffect(async () => {
        SecureStore.deleteItemAsync('email')

        async function checkAuth() {

            console.log('mail from store ' + store);
            console.log('mail in var ' + email);
            if (store === null) {
                setAuth(false);
            } else {
                return setAuth(true)
            }
        }

        SecureStore.getItemAsync('email').then((value) => console.log(value));
        await checkAuth()
        console.log(auth);
        if (auth) {
            console.log('user was already loged in');
            navigation.navigate('TabNav')
        }
    });

    function handleNavigationRegistry() {
        navigation.navigate('Regestrieren')
    };

    function handleNavigationForgotPassword() {
        navigation.navigate('Passwort Vergessen')
    };

    function handleNavigationHome() {
        navigation.navigate('TabNav')
    }

    const user = {
        email: '',
        password: '',
    };
    //const handleSubmit1 =  httpHelper.Post('',user);

    const handleSubmit = async () => {
        try {
            const requestOptions =
                {

                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(user)
                };
            console.log("POST")
            console.log(JSON.stringify(user))
            console.log(requestOptions.body);

            await fetch(
                'http://10.0.2.2:5000/login',
                requestOptions,
            ).then(response => {
                if (response.ok) {
                    SecureStore.setItemAsync('email', email);
                    handleNavigationHome();
                } else {
                    Alert.alert('Nutzername oder Passwort falsch')
                }
                ;
            });
        } catch (error) {
            console.error(error);
        }
    };
    const [password, setPassword] = useState(null);


    user.email = email;
    user.password = password;
    return (
        <View>
            <TextInput placeholder='Email'
                       onChangeText={(value) => setEmail(value)}
                       value={email}/>
            <TextInput
                placeholder='Passwort'
                onChangeText={(value) => setPassword(value)}
                value={password}
                secureTextEntry={true}/>
            <Button onPress={handleSubmit} colorScheme="primary"> Login</Button>
            <Button
                onPress={handleNavigationRegistry}>Registrieren</Button>

            <Button colorScheme="secondary" onPress={handleNavigationForgotPassword}>Passwort
                vergessen</Button>
        </View>
    );
}

export default LoginScreen;