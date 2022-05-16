import React, {useState}   from 'react';
import {Alert, StyleSheet,TextInput, SafeAreaView,Button,View} from 'react-native';


function RegistrationScreen(props) {
  //const account = [email, password]
  const user = {
    email: '',
    password:'',
    passwordConfirm:'',
};

  const handleSubmit= async () => {
    try {
      if(password != passwordConfirm){Alert.alert('Passwörter stimmen nicht überein'); return};
        const requestOptions = 
{

method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify(user)
};
        console.log("POST")
        console.log(JSON.stringify(user))
        console.log(requestOptions.body);
      await fetch(
        'http://10.0.2.2:5000/sign-up',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          Alert.alert('Post created at : ');
        });
      }).then(props.navigation.navigate('Login'));
    } catch (error) {
      console.error(error);
    }
  };

console.log("Login");
const [password,setPassword] = useState(null);
const [passwordConfirm, setPasswordConfirm] = useState(null)
const [email, setEmail] = useState(null);
const [error,setError] = useState(null);
user.email = email;
user.password = password;
user.passwordConfirm = password
  console.log("renderdRegestration");
  return (
    <SafeAreaView style={styles.container}>    
    <View>
    <TextInput placeholder='Email' onChangeText={(value) => setEmail(value )} value={email} />
    <TextInput placeholder='Passwort' onChangeText={(value) => setPassword(value )} value={password} secureTextEntry={true}/>
    <TextInput placeholder='Passwort wiederholen' onChangeText={(value) => setPasswordConfirm(value)} value={passwordConfirm} />
    <Button title='Registrieren' onPress={handleSubmit}/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",        
    justifyContent: 'center',
    padding: 20,
  },
})
export default RegistrationScreen;

  