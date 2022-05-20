import React, { useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { Input, Button, View, Text } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import { ipAdress } from '../helper/HttpRequestHelper';


function DeleteUserScreen({ navigation }) {
  const style = require('../components/Styles');
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null)
  const [email, setEmail] = useState(null)
  const user = {
    email: '',
    password: '',
    passwordConfirm: '',
  };
  user.password = password
  user.passwordConfirm = passwordConfirm
  user.email = email
  //TODO add URL
  const handleSubmit = async () => {
    try {
      if (user.password = !password) {
        Alert.alert('Passwörter stimmen nicht überein');
        return;
      }
      let jwt = await SecureStore.getItemAsync('jwt');
      const requestOptions =
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','jwt':jwt },
      };
      console.log("POST")
      console.log(JSON.stringify(user))
      console.log(requestOptions.body);
      await fetch(
        ipAdress+'delete-user?email=' + email,
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          Alert.alert('Post created at : ');
        }).then(SecureStore.deleteItemAsync('email')).then(SecureStore.deleteItemAsync('jwt')).then(navigation.navigate('Login'));
      });

    } catch (error) {
      console.error(error);
    }
  };

  function handleNavigationProfile() {
    navigation.navigate('Profil');
  }

  return (
    <SafeAreaView>
      <View style={[style.wrapper, style.flex]}>
        {/* <Image source={require('../assets/LogoText.png')}
            alt="Rescue Me Logo" size={'1/2'} /> */}
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
        <View style={[style.fullWidth, style.marginForm]}>
          <Text>Passwort wiederholen</Text>
          <Input style={style.fullWidth}
            variant="custom"
            onChangeText={(value) => setPasswordConfirm(value)}
            value={passwordConfirm}
            secureTextEntry={true} />
        </View>
        <View style={style.fullWidth}>
          <Button onPress={handleSubmit} style={style.marginForm} colorScheme={'secondary'}>
            <Text>Konto löschen</Text>
          </Button>
          <Button
            onPress={handleNavigationProfile}
            style={style.marginForm}
            variant={'unstyled'}>
            <Text>Abbrechen</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <View>
  //       <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} value={email} />
  //       <TextInput placeholder='Passwort' onChangeText={(value) => setPassword(value)} value={password} secureTextEntry={true} />
  //       <TextInput placeholder='Passwort wiederholen' onChangeText={(value) => setPasswordConfirm(value)} value={passwordConfirm} secureTextEntry={true} />
  //       <Button title='Bestätigen' onPress={handleSubmit} />
  //     </View>
  //   </SafeAreaView>
  // );
}

export default DeleteUserScreen;