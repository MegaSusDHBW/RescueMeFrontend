import React,{useState} from 'react';
import { View,Text, TextInput,Button } from 'react-native';


function EmergencyContact(props) {
    
    const contact={
        firstName:'',
        lastName:'',
        birthDate:'',
        phoneNumber:'',
        email:'',
    }
    const [firstName,setFirstname] = useState(null);
    const [lastName, setLastname] = useState(null);
    const [birthDate,setBirthDate] =useState(null);
    const [phoneNumber, setPhoneNumber] =useState(null);
    const [email,setEmail] = useState(null);

    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.birthDate = birthDate;
    contact.phoneNumber = phoneNumber;
    contact.email = email;
    return (
     <View>
         <TextInput placeholder='Vorname' onChangeText={(value) => setFirstname(value)} value={firstName} />
         <TextInput placeholder='Nachname' onChangeText={(value) => setLastname(value)} value={lastName} />
         <TextInput placeholder='Geburtsdatum' onChangeText={(value) => setBirthDate(value)} value={birthDate} />
         <TextInput placeholder='Telefonnummer' onChangeText={(value) => setPhoneNumber(value)} value={phoneNumber} />
         <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} value={email} />
         <Button title='Bestätigen' />
     </View>
    );
}

export default EmergencyContact;