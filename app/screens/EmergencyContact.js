import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import style from "../components/Styles";
import { Button, Input, Text, View, ScrollView } from "native-base";
import DatePicker from "react-native-date-picker";


function EmergencyContact({ navigation }) {

  useEffect(async () => {
    await getUserMail()
    if (birthDate === null) {
      const response = await fetch(
        'http://10.0.2.2:5000/get-emergencycontact?email=' + userMail,
      );
      const data = await response.json();
      let birthDate = data.emergencyBirthday
      setBirthDate(birthDate)
      let email = data.emergencyEmail
      setEmail(email)
      let firstName = data.emergencyFirstname
      setFirstname(firstName)
      let lastName = data.emergencyLastname
      setLastname(lastName)
      let phone = data.emergencyPhone
      setPhoneNumber(phone)
    }
  });

  async function getUserMail() {
    let store = await SecureStore.getItemAsync('email');

    return setUsermail(store)
  }

  const contact = {
    firstName: '',
    lastName: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    userMail: ''
  }
  const [firstName, setFirstname] = useState(null);
  const [lastName, setLastname] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [userMail, setUsermail] = useState(null);
  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.birthDate = birthDate;
  contact.phoneNumber = phoneNumber;
  contact.email = email;
  contact.userMail = userMail;

  function handleNavigationHome() {
    navigation.navigate('Home')
  }

  const handleSubmit = async () => {
    console.log(JSON.stringify(contact));

    try {
      const requestOptions =
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      };
      console.log("POST")
      console.log(JSON.stringify(contact))

      await fetch(
        'http://10.0.2.2:5000/set-emergencycontact',
        requestOptions,
      ).then(response => {
        if (response.ok) {
          handleNavigationHome();
        } else {
          Alert.alert('Upps')
        }
        ;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={[style.wrapper, style.paddingTop]}>
      <View style={[style.fullWidth, style.marginForm]}>
        <Text>Vorname</Text>
        <Input style={style.fullWidth}
          variant="custom"
          onChangeText={(value) => setFirstname(value)}
          value={firstName}
        />
      </View>
      <View style={[style.fullWidth, style.marginForm]}>
        <Text>Nachname</Text>
        <Input style={style.fullWidth}
          variant="custom"
          onChangeText={(value) => setLastname(value)}
          value={lastName}
        />
      </View>
      <View style={[style.fullWidth, style.marginForm]}>
        <Text>Geburtsdatum</Text>
        <Input style={style.fullWidth}
          variant="custom"
          onChangeText={(value) => setBirthDate(value)}
          value={birthDate}
        />
      </View>
      <View style={[style.fullWidth, style.marginForm]}>
        <Text>Telefonnummer</Text>
        <Input style={style.fullWidth}
          variant="custom"
          onChangeText={(value) => setPhoneNumber(value)}
          value={phoneNumber}
        />
      </View>
      <View style={[style.fullWidth, style.marginForm]}>
        <Text>E-Mail</Text>
        <Input style={style.fullWidth}
          variant="custom"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
      </View>
      <View style={style.fullWidth}>
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