import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Button, Input, ScrollView, Text, View, VStack} from 'native-base';
import {ipAddress} from "../helper/HttpRequestHelper"

function RegistrationScreen({navigation}) {
    const style = require('../components/Styles');
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const user = {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        firstName: firstName,
        lastName: lastName
    };

    const handleSubmit = async () => {
        try {
            if (password !== passwordConfirm) {
                Alert.alert('Passwörter stimmen nicht überein');
                return
            }

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            };
            console.log("POST")
            console.log(JSON.stringify(user))
            console.log(requestOptions.body);

            await fetch(
                ipAddress + 'sign-up',
                requestOptions,
            ).then(response => {
                response.json().then(() => {

                });
            }).then(navigation.navigate('Login'));
        } catch (error) {
            console.error(error);
        }
    };

    function handleNavigationLogin() {
        navigation.navigate('Login');
    }

    return (
        <ScrollView>
            <VStack style={[style.wrapper, style.flex]}>
                <View style={style.marginForm}>
                    <Text>Vorname</Text>
                    <Input
                        variant="custom"
                        onChangeText={(value) => setFirstName(value)}
                        value={firstName}/>
                </View>
                <View style={style.marginForm}>
                    <Text>Nachname</Text>
                    <Input
                        variant="custom"
                        onChangeText={(value) => setLastName(value)}
                        value={lastName}/>
                </View>
                <View style={style.marginForm}>
                    <Text>E-Mail</Text>
                    <Input
                        variant="custom"
                        onChangeText={(value) => setEmail(value)}
                        value={email}/>
                </View>
                <View style={style.marginForm}>
                    <Text>Passwort</Text>
                    <Input
                        variant="custom"
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                        secureTextEntry={true}/>
                </View>
                <View style={style.marginForm}>
                    <Text>Passwort bestätigen</Text>
                    <Input
                        variant="custom"
                        onChangeText={(value) => setPasswordConfirm(value)}
                        value={passwordConfirm}
                        secureTextEntry={true}/>
                </View>
                <View>
                    <Button onPress={handleSubmit} style={style.marginForm}>
                        <Text variant={'button'}>Registrieren</Text>
                    </Button>
                    <Button
                        onPress={handleNavigationLogin}
                        style={style.marginForm}
                        variant={'unstyled'}>
                        <Text>Abbrechen</Text>
                    </Button>
                </View>
            </VStack>
        </ScrollView>
    );
}

export default RegistrationScreen;