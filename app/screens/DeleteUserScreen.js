import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Input, Button, View, Text, VStack, ScrollView} from 'native-base';
import * as SecureStore from 'expo-secure-store';
import { ipAddress } from '../helper/HttpRequestHelper';

function DeleteUserScreen({ navigation }) {
  const style = require('../components/Styles');
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [email, setEmail] = useState(null);
  const user = {
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  };

  const handleSubmit = async () => {
    try {
      if (user.password = !password) {
        Alert.alert('Passwörter stimmen nicht überein');
        return;
      }

      let jwt = await SecureStore.getItemAsync('jwt');
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'jwt': jwt },
      };

      // fetch data
      await fetch(
        ipAddress + 'delete-user?email=' + email,
        requestOptions,
      ).then(response => {
        response.json().then(() => {
          Alert.alert('Post created at : ');
        }).then(SecureStore.deleteItemAsync('email'))
          .then(SecureStore.deleteItemAsync('jwt'))
          .then(navigation.navigate('Login'));
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleNavigationProfile() {
    navigation.navigate('Profil');
  }

  return (
    <ScrollView>
      <VStack style={[style.wrapper, style.flex]}>
        <View style={style.marginForm}>
          <Text>E-Mail</Text>
          <Input
            variant="custom"
            onChangeText={(value) => setEmail(value)}
            value={email} />
        </View>
        <View style={style.marginForm}>
          <Text>Passwort</Text>
          <Input
            variant="custom"
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true} />
        </View>
        <View style={style.marginForm}>
          <Text>Passwort bestätigen</Text>
          <Input
            variant="custom"
            onChangeText={(value) => setPasswordConfirm(value)}
            value={passwordConfirm}
            secureTextEntry={true} />
        </View>
        <View>
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
      </VStack>
    </ScrollView>
  );
}

export default DeleteUserScreen;