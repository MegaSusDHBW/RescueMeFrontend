import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Input, Button, View, Text, Image, Icon, VStack, ScrollView } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../components/Colors';
import {ipAdress} from '../helper/HttpRequestHelper'

function LoginScreen({ navigation }) {
  const style = require('../components/Styles.js');
  const [email, setEmail] = useState(null);
  const [auth, setAuth] = useState(null);
  useEffect(async () => {
    

    
      
      let jwt =  SecureStore.getItemAsync('jwt')
      console.log(jwt);
      
      if (jwt !== null) {
        handleNavigationHome()
      } 
    

    
  });

  function handleNavigationRegistry() {
    navigation.navigate('Registrieren')
  };

  function handleNavigationForgotPassword() {
    navigation.navigate('Passwort vergessen')
  };

  function handleNavigationHome() {
    navigation.navigate('TabNav')
  }

  const user = {
    email: '',
    password: '',
  };
  

  const handleSubmit = async () => {
    try {
      const requestOptions =
      {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
      
      const response= await fetch(
        ipAdress + 'login',
        requestOptions,
      ).then(response  => {
        if (response.ok) {
          SecureStore.deleteItemAsync('jwt').then(() => console.log('deleted'))
          let data = response.json().then(data => SecureStore.setItemAsync('jwt', data.jwt));

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

  const width = Dimensions.get('window').width;
  user.email = email;
  user.password = password;
  return (
    <ScrollView>
      <VStack style={[style.wrapper, style.flex]}>
        <Image source={require('../assets/LogoText.png')}
          alt="Rescue Me Logo" resizeMode='contain' />
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
          <Button
            style={style.marginForm}
            onPress={handleSubmit}>
            <Text variant={'button'}>Login</Text>
          </Button>
          <Button
            style={[style.marginForm]}
            variant={'unstyled'}
            onPress={handleNavigationRegistry}
            leftIcon={<Ionicons name="key" size={24} />}>
            <Text>Registrieren</Text>
          </Button>
          <Button
            style={[style.marginForm]}
            variant={'unstyled'}
            onPress={handleNavigationForgotPassword}
            leftIcon={<FontAwesome name="lock" size={24} />}>
            <Text>Passwort vergessen</Text>
          </Button>
        </View>
      </VStack>
    </ScrollView>
  );
}

export default LoginScreen;