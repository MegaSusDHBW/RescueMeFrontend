import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import style from "../components/Styles";
import {Button, Input, ScrollView, Text, View} from "native-base";
import {ipAddress} from '../helper/HttpRequestHelper'

function EmergencyContact({navigation}) {
    function formatDate(d) {
        let day = d.getDate();
        let month = (d.getMonth() + 1);
        return (day < 10 ? '0' + day : day)
            + '.' + (month < 10 ? '0' + month : month)
            + '.' + d.getFullYear();
    }

    useEffect(async () => {
        await getUserMail();
        let jwt = await SecureStore.getItemAsync('jwt');

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'jwt': jwt},
        };

        if (birthDate === null) {
            const response = await fetch(
                ipAddress + 'get-emergencycontact',
                requestOptions
            );

            const data = await response.json();
            setBirthDate(data.emergencyBirthday);
            setEmail(data.emergencyEmail);
            setFirstname(data.emergencyFirstname);
            setLastname(data.emergencyLastname);
            setPhoneNumber(data.emergencyPhone);
        }
    }, []);

    async function getUserMail() {
        let store = await SecureStore.getItemAsync('email');
        return setUsermail(store);
    }

    const [firstName, setFirstname] = useState(null);
    const [lastName, setLastname] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [userMail, setUsermail] = useState(null);
    const contact = {
        firstName: firstName,
        lastName: lastName,
        birthDate: formatDate(new Date()),
        phoneNumber: phoneNumber,
        email: email,
        userMail: userMail,
    }

    const handleSubmit = async () => {
        let jwt = await SecureStore.getItemAsync('jwt');

        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'jwt': jwt},
                body: JSON.stringify(contact)
            };

            await fetch(
                ipAddress + 'set-emergencycontact',
                requestOptions,
            ).then(response => {
                if (response.ok) {
                    handleNavigationHome();
                } else {
                    Alert.alert('Anlegen des Notfallkontaktes fehlgeschlagen');
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    function handleNavigationHome() {
        navigation.navigate('Home');
    }

    return (
        <ScrollView style={[style.wrapper, style.paddingTop]}>
            <View style={style.marginForm}>
                <Text>Vorname</Text>
                <Input
                    variant="custom"
                    onChangeText={(value) => setFirstname(value)}
                    value={firstName}
                />
            </View>
            <View style={style.marginForm}>
                <Text>Nachname</Text>
                <Input
                    variant="custom"
                    onChangeText={(value) => setLastname(value)}
                    value={lastName}
                />
            </View>
            {/* <View style={style.marginForm}>
        <Text>Geburtsdatum</Text>
        <Input
          variant="custom"
          onChangeText={(value) => setBirthDate(value)}
          value={birthDate}
        />
      </View> */}
            <View style={style.marginForm}>
                <Text>Telefonnummer</Text>
                <Input
                    variant="custom"
                    onChangeText={(value) => setPhoneNumber(value)}
                    value={phoneNumber}
                />
            </View>
            <View style={style.marginForm}>
                <Text>E-Mail</Text>
                <Input
                    variant="custom"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                />
            </View>
            <View>
                <Button
                    style={[style.marginForm, style.marginBottom]}
                    onPress={handleSubmit}>
                    <Text variant={'button'}>Bestätigen</Text>
                </Button>
            </View>
        </ScrollView>
    );
}

export default EmergencyContact;