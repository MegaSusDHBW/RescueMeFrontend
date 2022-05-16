import React, { useEffect, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Input, Button, View, Text, Image, Icon } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

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
    <View style={[style.wrapper, style.flex]}>
      <Image source={require('../assets/LogoText.png')}
        alt="Rescue Me Logo" size={'1/2'} />
      <View style={[style.fullWidth, style.marginForm]}>
        <Text>E-Mail</Text>
        <Input style={style.fullWidth}
          variant="custom"
          onChangeText={(value) => setEmail(value)}
          value={email} />
      </View>
      <View style={[style.fullWidth, style.marginForm]}>
        <Text>Passwort</Text>
        <Input style={style.fullWidth}
          variant="custom"
          onChangeText={(value) => setPassword(value)}
          value={password}
          secureTextEntry={true} />
      </View>
      <View style={style.fullWidth}>
        <Button style={style.marginForm} onPress={handleSubmit}><Text>Login</Text></Button>
        <Button
          style={[style.marginForm]}
          variant={'unstyled'}
          onPress={handleNavigationRegistry}
          leftIcon={<Ionicons name="key" size={24} color="#fafafa" />}>
          <Text>Registrieren</Text>
        </Button>
        <Button
          style={[style.marginForm]}
          variant={'unstyled'}
          onPress={handleNavigationForgotPassword}
          leftIcon={<FontAwesome name="lock" size={24} color="#fafafa" />}>
          <Text>Passwort vergessen</Text>
        </Button>
      </View>
    </View>
  );
}

export default LoginScreen;