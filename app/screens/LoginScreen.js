import React, { useEffect, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Box, Button, View, Center } from 'native-base'


function LoginScreen({ navigation }) {
  const style = require('../components/Styles.js');
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
    navigation.navigate('Registrieren')
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
        headers: { 'Content-Type': 'application/json' },
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
    <View style={style.wrapper}>
      <TextInput style={style.child} placeholder='Email'
        onChangeText={(value) => setEmail(value)}
        value={email} />
      <TextInput style={style.child}
        placeholder='Passwort'
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry={true} />
      <Button borderRadius={'lg'} style={style.child} onPress={handleSubmit}>Login</Button>
      <Button style={style.child} onPress={handleNavigationRegistry}>Registrieren</Button>
      <Button style={style.child} colorScheme="secondary" onPress={handleNavigationForgotPassword}>Passwort vergessen</Button>
    </View>
  );
}

export default LoginScreen;