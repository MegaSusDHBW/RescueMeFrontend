import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Input, Button, View, Text, Image } from 'native-base';
import {ipAdress} from '../helper/HttpRequestHelper'

function ChangePasswordScreen({ navigation }) {
  const style = require('../components/Styles');
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null)
  const [email, setEmail] = useState(null)
  const newPassword = {
    email: '',
    password: '',
    passwordConfirm: '',
  };
  newPassword.password = password
  newPassword.passwordConfirm = passwordConfirm
  newPassword.email = email

  const handleSubmit = async () => {
    try {
      let jwt = await SecureStore.getItemAsync('jwt');
      const requestOptions =
      {

        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'jwt':jwt },
        body: JSON.stringify(newPassword)
      };
      //TODO add URL
      console.log("POST")
      console.log(JSON.stringify(newPassword))
      console.log(requestOptions.body);
      await fetch(
        ipAdress+'change-password',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          Alert.alert('Post created at : ');
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleNavigationProfile() {
    navigation.navigate('Profil');
  }

  return (
    // <SafeAreaView style={styles.container}>    
    // <View>
    // <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} value={email} />
    // <TextInput placeholder='Passwort' onChangeText={(value) => setPassword(value )} value={password} secureTextEntry={true}/>
    // <TextInput placeholder='Passwort wiederholen' onChangeText={(value) => setPasswordConfirm(value )} value={passwordConfirm} secureTextEntry={true}/>
    // <Button title='Bestätigen' onPress={handleSubmit}/>
    // </View>
    // </SafeAreaView>
    <SafeAreaView>
      <View style={[style.wrapper, style.flex]}>
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
          <Button onPress={handleSubmit} style={style.marginForm}>
            <Text>Bestätigen</Text>
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
}

export default ChangePasswordScreen;