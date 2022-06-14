import React, {useState} from 'react';
import {Button, Input, ScrollView, Text, View, VStack} from 'native-base';
import {ipAddress} from '../helper/HttpRequestHelper'

function ForgotPasswordScreen({navigation}) {
    const style = require('../components/Styles');
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [email, setEmail] = useState(null)
    const newPassword = {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
    };

    const handleSubmit = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPassword)
            };

            await fetch(
                ipAddress + 'forget-password',
                requestOptions,
            ).then(response => {
                if (response.ok) {

                    response.json().then(() => {
                        navigation.navigate('Login')
                    });
                }
            });
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
                        <Text variant={'button'}>Bestätigen</Text>
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

export default ForgotPasswordScreen;