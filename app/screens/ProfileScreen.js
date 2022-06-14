import React from 'react';
import {Button, Switch, Text, useColorMode, View, VStack} from 'native-base';
import style from "../components/Styles";

function ProfileScreen({navigation}) {
    // const [isDarkMode, setDarkMode] = useState(true)
    const {colorMode, toggleColorMode} = useColorMode();

    function handleChangePassword() {
        navigation.navigate('Passwort ändern')
    };

    function handleDeleteUser() {
        navigation.navigate('Konto löschen')
    }

    return (
        <View style={[style.wrapper, style.flex, style.flexStart, style.paddingTop]}>
            <VStack>
                <View style={[style.flexBetween]}>
                    <Text>Darkmode</Text>
                    <Switch
                        isChecked={colorMode === "dark" ? true : false}
                        onChange={toggleColorMode}
                    />
                </View>
                <Button
                    onPress={handleChangePassword}
                    style={[style.marginForm]}>
                    <Text variant={'button'}>Passwort ändern</Text>
                </Button>
                <Button
                    onPress={handleDeleteUser}
                    style={[style.marginForm]}
                    colorScheme={"secondary"}>
                    <Text variant={'button'}>Konto löschen</Text>
                </Button>
            </VStack>
        </View>
    );
}

export default ProfileScreen;