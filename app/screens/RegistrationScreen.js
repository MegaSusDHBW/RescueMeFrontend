import React, { useState } from 'react';
import { Alert, TextInput, SafeAreaView } from 'react-native';
import { Input, Button, View, Text, Image, Icon } from 'native-base';
import style from "../components/Styles";
import {ipAdress} from "../helper/HttpRequestHelper"

function RegistrationScreen({ navigation }) {
  //const account = [email, password]
  const style = require('../components/Styles');
  const user = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: ''
  };

  const handleSubmit = async () => {
    try {
      if (password != passwordConfirm) { Alert.alert('Passwörter stimmen nicht überein'); return };
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
        ipAdress+'sign-up',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          Alert.alert('Post created at : ');
        });
      }).then(navigation.navigate('Login'));
    } catch (error) {
      console.error(error);
    }
  };

  function handleNavigationLogin() {
    navigation.navigate('Login');
  }

  console.log("Login");
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null)
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  user.email = email;
  user.password = password;
  user.passwordConfirm = password;
  user.lastName = lastName;
  user.firstName = firstName;
  console.log("renderdRegestration");

  return (
    <SafeAreaView>
      <View style={[style.wrapper, style.flex]}>
        {/* <Image source={require('../assets/LogoText.png')}
          alt="Rescue Me Logo" size={'1/2'} /> */}
        <View style={[style.fullWidth, style.marginForm]}>
          <Text>Vorname</Text>
          <Input style={style.fullWidth}
                 variant="custom"
                 onChangeText={(value) => setFirstName(value)}
                 value={firstName} />
        </View>
        <View style={[style.fullWidth, style.marginForm]}>
          <Text>Nachname</Text>
          <Input style={style.fullWidth}
                 variant="custom"
                 onChangeText={(value) => setLastName(value)}
                 value={lastName} />
        </View>
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
            <Text>Registrieren</Text>
          </Button>
          <Button
            onPress={handleNavigationLogin}
            style={style.marginForm}
            variant={'unstyled'}>
            <Text>Abbrechen</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RegistrationScreen;