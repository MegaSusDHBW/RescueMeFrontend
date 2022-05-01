import React, {useState} from 'react';
import { StyleSheet,Text,TextInput,View,Button, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';


function DataScreen(props) {
    const [firstName,setFristName]= useState(null)
    const [lastName,setLastName]= useState(null)
    const [organDonorState,setOrganDonorState] = useState(false)
    const [bloodGroupe, setBloodGroupe] = useState(null)
    return (
        <View>
            <TextInput placeholder='Vorname' onChangeText={(value) => setFristName(value)} value={firstName} />
            <TextInput placeholder='Nachname' onChangeText={(value) => setLastName(value)} value={lastName} />
            <Text>Organspender</Text>
            <Switch title="Organd Spender" onValueChange={(value) => setOrganDonorState(value)} value={organDonorState}/>
            <Text>Blutgruppe</Text>
            <Picker selectedValue={bloodGroupe} placeholder="Blutgruppe" onValueChange={(value, index) => setBloodGroupe(value)}>
            <Picker.Item label='Blutgruppe Auswählen' />
                <Picker.Item label='A+' value={"A+"}/>
                <Picker.Item label='A-'value={"A-"}/>
                <Picker.Item label='B+' value={"B+"}/>
                <Picker.Item label='B-' value={"B-"}/>
                <Picker.Item label='AB+' value={"AB+"}/>
                <Picker.Item label='AB-' value={"AB-"}/>
                <Picker.Item label='0+' value={"0+"}/>
                <Picker.Item label='0-' value={"0-"}/>
            </Picker>
             
        <Button title='Data'/>
        </View>
    );
}

export default DataScreen;