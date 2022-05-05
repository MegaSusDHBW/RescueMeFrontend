import React,{useState} from 'react';
import {Alert ,View,Text, TextInput,Button } from 'react-native';


function EmergencyContact({navigation}) {
    
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

    function handleNavigationHome(){
        navigation.navigate('Home')
    }

    const handleSubmit = async () => {
        console.log(JSON.stringify(contact));

        try {
            const requestOptions = 
            {
            
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(contact)
            };
                console.log("POST")
                console.log(JSON.stringify(contact))

                await fetch(
                   'http://10.0.2.2:5000/encrypt/notfallkontakt',
                    requestOptions,
                  ).then(response => { if(response.ok){
                    handleNavigationHome();
                  }else{
                    Alert.alert('Upps')
                  };
                  });
                } catch (error) {
                  console.error(error);
                }
              };

     
    
    return (
     <View>
         <TextInput placeholder='Vorname' onChangeText={(value) => setFirstname(value)} value={firstName} />
         <TextInput placeholder='Nachname' onChangeText={(value) => setLastname(value)} value={lastName} />
         <TextInput placeholder='Geburtsdatum' onChangeText={(value) => setBirthDate(value)} value={birthDate} />
         <TextInput placeholder='Telefonnummer' onChangeText={(value) => setPhoneNumber(value)} value={phoneNumber} />
         <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} value={email} />
         <Button title='Bestätigen'  onPress={handleSubmit}/>
     </View>
    );
}

export default EmergencyContact;