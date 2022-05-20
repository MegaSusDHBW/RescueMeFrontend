import React, { useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { Input, Button, View, Text, Image } from 'native-base';

function ForgotPasswordScreen({ navigation }) {
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
  //TODO add URL
  const handleSubmit = async () => {
    try {
      const requestOptions =
      {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPassword)
      };
      console.log("POST")
      console.log(JSON.stringify(newPassword))
      console.log(requestOptions.body);
      await fetch(
        'http://10.0.2.2:5000/forget-password',
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

  function handleNavigationLogin() {
    navigation.navigate('Login');
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
          <Button onPress={handleSubmit} style={style.marginForm}>
            <Text variant={'button'}>Bestätigen</Text>
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

export default ForgotPasswordScreen;