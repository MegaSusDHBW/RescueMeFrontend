import { setStatusBarHidden } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput,View, SafeAreaView,Button,Text} from 'react-native';
import App from '../../App';

function LoginScreen({navigation},{auth}) {

    function handleNavigationRegistry () {navigation.navigate('Regestrieren')};
    function handleNavigationForgotPassword () {navigation.navigate('Passwort Vergessen')};
    
    const user = {
        email: '',
        password:'',
    };

    const handleSubmit= async () => {
            try {
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
               'http://10.0.2.2:5000/login',
                requestOptions,
              ).then(response => {
                response.json().then(data => {
                Alert.alert('Post created at : ');
                }).then(console.log('loged in')).then(() => setLogin(true));
              });
            } catch (error) {
              console.error(error);
            }
          };
    const [password,setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [logedIn,setLogin] = useState(false);
    auth = logedIn;
    user.email = email;
    user.password = password;
    return (        
       <View style={styles.container}>
       <TextInput placeholder='Email'  
       onChangeText={(value) => setEmail(value )} 
       value={email}/>
       <TextInput
        placeholder='Passwort'
        onChangeText={(value) => setPassword(value )} 
        value={password} 
        secureTextEntry={true} />
       <Button title='Login' style={styles.loginButton} onPress={handleSubmit}/>
       <Button title='Registrieren' style={styles.loginButton} onPress={handleNavigationRegistry}/>
       <Button title='Passwort' style={styles.loginButton} onPress={handleNavigationForgotPassword}/>
       </View>
    );
}
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        width:"100%",        
        justifyContent: 'center',
        padding: 20,
      },
    loginButton: {
          width:"100%",
          height: 70,
          backgroundColor: "#fc5c55"
      },
    })
export default LoginScreen;