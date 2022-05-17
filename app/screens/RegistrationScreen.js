import React, { useState } from 'react';
import { Alert, TextInput, SafeAreaView } from 'react-native';
import { Input, Button, View, Text, Image, Icon } from 'native-base';

function RegistrationScreen({ navigation }) {
  //const account = [email, password]
  const style = require('../components/Styles');
  const user = {
    email: '',
    password: '',
    passwordConfirm: '',
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
        'http://10.0.2.2:5000/sign-up',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          Alert.alert('Post created at : ');
        });
      }).then(props.navigation.navigate('Login'));
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
  user.email = email;
  user.password = password;
  user.passwordConfirm = password
  console.log("renderdRegestration");

  return (
    <SafeAreaView>
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
            value={password} />
        </View>
        <View style={[style.fullWidth, style.marginForm]}>
          <Text>Passwort wiederholen</Text>
          <Input style={style.fullWidth}
            variant="custom"
            onChangeText={(value) => setPasswordConfirm(value)}
            value={passwordConfirm} />
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