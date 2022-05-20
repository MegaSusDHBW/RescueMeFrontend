import React, { useState, useEffect } from 'react';
import { View, Button, Text, Switch, useColorMode } from 'native-base';
import style from "../components/Styles";

function ProfileScreen({ navigation }) {
  // const [isDarkMode, setDarkMode] = useState(true)
  const { colorMode, toggleColorMode } = useColorMode();

  function handleChangePassword() { navigation.navigate('Passwort ändern') };
  function handleDeleteUser() { navigation.navigate('Konto löschen') }

  return (
    <View style={[style.wrapper, style.flex, style.flexStart, style.paddingTop]}>
      <View style={[style.flexBetween, style.flexHorizontal, style.fullWidth, style.marginForm]}>
        <Text>Darkmode</Text>
        <Switch
          isChecked={colorMode === "dark" ? true : false}
          onChange={toggleColorMode}
        />
      </View>
      <Button
        onPress={handleChangePassword}
        style={[style.fullWidth, style.marginForm]}>
        <Text variant={'button'}>Passwort ändern</Text>
      </Button>
      <Button
        onPress={handleDeleteUser}
        style={[style.fullWidth, style.marginForm]}
        colorScheme={"secondary"}>
        <Text variant={'button'}>Konto löschen</Text>
      </Button>
    </View>
  );
}

export default ProfileScreen;