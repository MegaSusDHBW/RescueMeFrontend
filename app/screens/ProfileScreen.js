import React from 'react';
import { View, Button, Text } from 'native-base';
import style from "../components/Styles";

function ProfileScreen({ navigation }) {
  function handleChangePassword() { navigation.navigate('Passwort ändern') };
  function handleDeleteUser() { navigation.navigate('Konto löschen') }

  return (
    <View style={[style.wrapper, style.flex, style.flexStart, style.paddingTop]}>
      <Button
        onPress={handleChangePassword}
        style={[style.fullWidth, style.marginForm]}>
        <Text>Passwort ändern</Text>
      </Button>
      <Button
        onPress={handleDeleteUser}
        style={[style.fullWidth, style.marginForm]}
        colorScheme={"secondary"}>
        <Text>Konto löschen</Text>
      </Button>
    </View>
  );
}

export default ProfileScreen;