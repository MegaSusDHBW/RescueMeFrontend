import React,{useState,useEffect} from 'react';
import {Alert ,View,Text, TextInput,Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';




function EmergencyContact({navigation}) {
       
    useEffect( async () => {
        await getUserMail()
        
      const response = await fetch(
          'http://10.0.2.2:5000/get-emergencycontact?email=' + userMail,
         );
        const data = await response.json();
        let birthDate =  data.emergencyBirthday
        setBirthDate(birthDate)
        let email =  data.emergencyEmail
        setEmail(email)
        let firstName = data.emergencyFirstname
        setFirstname(firstName)
        let lastName = data.emergencyLastname
        setLastname(lastName)
        let phone = data.emergencyPhone
        setPhoneNumber(phone)         
        
    });

    async function getUserMail(){
        let store = await SecureStore.getItemAsync('email');
        console.log('store ' + store);
          return setUsermail(store) 
      }    
    const contact={
        firstName:'',
        lastName:'',
        birthDate:'',
        phoneNumber:'',
        email:'',
        userMail: ''
    }
    const [firstName,setFirstname] = useState(null);
    const [lastName, setLastname] = useState(null);
    const [birthDate,setBirthDate] =useState(null);
    const [phoneNumber, setPhoneNumber] =useState(null);
    const [email,setEmail] = useState(null);
    const [userMail,setUsermail] =useState(null);
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.birthDate = birthDate;
    contact.phoneNumber = phoneNumber;
    contact.email = email;
    contact.userMail = userMail;
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
                   'http://10.0.2.2:5000/set-emergencycontact',
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