import React, {useState} from 'react';
import {Button, Input, ScrollView, Text, View, VStack} from 'native-base';
import {ipAddress} from '../helper/HttpRequestHelper'

function ChangePasswordScreen({navigation}) {
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
            let jwt = await SecureStore.getItemAsync('jwt');

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'jwt': jwt},
                body: JSON.stringify(newPassword)
            };

            // fetch data
            await fetch(
                ipAddress + 'change-password',
                requestOptions,
            ).then(response => {
                response.json().then(() => {
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
                    <Text>Passwort best??tigen</Text>
                    <Input
                        variant="custom"
                        onChangeText={(value) => setPasswordConfirm(value)}
                        value={passwordConfirm}
                        secureTextEntry={true}/>
                </View>
                <View>
                    <Button onPress={handleSubmit} style={style.marginForm}>
                        <Text>Best??tigen</Text>
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

export default ChangePasswordScreen;