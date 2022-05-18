import React, { useState, useEffect } from 'react';
import { Alert, Switch } from 'react-native';
import { Input, Button, View, Text, Select, VStack, ScrollView } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

function DataScreen({ navigation }) {
  const style = require('../components/Styles');

  function handleNavigationHome() {
    navigation.navigate('Home')
  }

  useEffect(async () => {
    getUserMail();
    if (bloodGroup === null) {
      const response = await fetch(
        'http://10.0.2.2:5000/get-healthdata?email=' + userMail,
      );
      const data = await response.json();

      let bloodGroup = data.bloodgroup
      setBloodGroup(bloodGroup)
      let firstName = data.firstname
      setFirstName(firstName)
      let lastName = data.lastname
      setLastName(lastName)
      let birthDate = data.birthdate
      setBirthDate(birthDate)
      let organDonorState = data.organDonorState
      if (organDonorState == 1) {
        setOrganDonorState(true)
      }
      else {
        setOrganDonorState(false)
      }
    }
  });

  async function getUserMail() {
    let store = await SecureStore.getItemAsync('email');
    console.log('store ' + store);
    return setUsermail(store)
  }

  const healthData = {
    firstName: '',
    lastName: '',
    organDonorState: '',
    bloodGroup: '',
    userMail: '',
    birthDate: '',
  }
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [birthDate, setBirthDate] = useState(null)
  const [organDonorState, setOrganDonorState] = useState(false)
  const [bloodGroup, setBloodGroup] = useState(null)
  const [userMail, setUsermail] = useState(null)
  const [diseases, setDisease] = useState([])
  healthData.firstName = firstName;
  healthData.lastName = lastName;
  healthData.organDonorState = organDonorState;
  healthData.bloodGroup = bloodGroup;
  healthData.userMail = userMail;
  const handleSubmit = async () => {
    try {
      const requestOptions =
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(healthData)
      };
      console.log("POST")
      console.log(JSON.stringify(healthData))

      await fetch(
        'http://10.0.2.2:5000/set-healthdata',
        requestOptions,
      ).then(response => {
        if (response.ok) {

          handleNavigationHome();
        } else {
          Alert.alert('Ups')
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={[style.wrapper, style.paddingTop]}>
      <VStack>
        <View style={[style.fullWidth, style.marginForm]}>
          <Text>Vorname</Text>
          <Input onChangeText={(value) => setFirstName(value)} value={firstName} />
        </View>
        <View style={[style.fullWidth, style.marginForm]}>
          <Text>Nachname</Text>
          <Input onChangeText={(value) => setLastName(value)} value={lastName} />
        </View>
        <View style={[style.fullWidth, style.marginForm]}>
          <Text>Geburtsdatum</Text>
          <Input onChangeText={(value) => setBirthDate(value)} value={birthDate} />
          {/* <RNDateTimePicker mode='date' onChange={(value) => setBirthDate(value)} value={new Date()} /> */}
        </View>
        <View style={[style.flexBetween, style.flexHorizontal, style.fullWidth, style.marginForm]}>
          <Text>Blutgruppe</Text>
          <Select w='100' selectedValue={bloodGroup} placeholder='' onValueChange={(value, index) => setBloodGroup(value)}>
            {/* <Select.Item label='Blutgruppe Auswählen' /> */}
            <Select.Item label='A+' value={"A+"} />
            <Select.Item label='A-' value={"A-"} />
            <Select.Item label='B+' value={"B+"} />
            <Select.Item label='B-' value={"B-"} />
            <Select.Item label='AB+' value={"AB+"} />
            <Select.Item label='AB-' value={"AB-"} />
            <Select.Item label='0+' value={"0+"} />
            <Select.Item label='0-' value={"0-"} />
          </Select>
        </View>
        <View style={[style.flexBetween, style.flexHorizontal, style.fullWidth, style.marginForm]}>
          <Text>Organspender</Text>
          <Switch title="Organd Spender" onValueChange={(value) => setOrganDonorState(value)} value={organDonorState} />
        </View>
        <Collapse>
          <CollapseHeader>
            <View style={[style.paddingForm, style.dividerTop]}>
              <Text>Vorerkrankungen</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={style.marginForm}>
              <Text>- Keine Einträge</Text>
              <View style={[style.fullWidth, style.marginForm]}>
                <Text>Neuer Eintrag</Text>
                <Input onChangeText={(value) => setFirstName(value)} value={firstName} />
                <Button onPress={handleSubmit} style={[style.fullWidth, style.marginForm]}>
                  <Text>Hinzufügen</Text>
                </Button>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
        <Button onPress={handleSubmit} style={[style.fullWidth, style.marginForm]}>
          <Text>Speichern</Text>
        </Button>
      </VStack>
    </ScrollView>
  );
}

export default DataScreen;