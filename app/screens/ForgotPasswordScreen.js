import React, {useState} from 'react';
import { StyleSheet,TextInput,View, SafeAreaView,Button,Text} from 'react-native';


function ForgotPasswordScreen(props) {
    const [password,setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [email,setEmail]= useState(null)
    const newPassword = {
        email:'',
        password:'',
        passwordConfirm:'',
    };
    newPassword.password = password
    newPassword.passwordConfirm = passwordConfirm
    newPassword.email = email
    //TODO add URL
    const handleSubmit= async () => {
        try {
    const requestOptions = 
    {
    
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPassword)
    };
        console.log("POST")
        console.log(JSON.stringify(newPassword))
        console.log(requestOptions.body);
        await fetch(
           'http://10.0.2.2:5000/forget-password',
            requestOptions,
          ).then(response => {
            response.json().then(data => {
            Alert.alert('Post created at : ');
            });
          });
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <SafeAreaView style={styles.container}>    
        <View>
        <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} value={email} />
        <TextInput placeholder='Passwort' onChangeText={(value) => setPassword(value )} value={password} secureTextEntry={true}/>
        <TextInput placeholder='Passwort wiederholen' onChangeText={(value) => setPasswordConfirm(value )} value={passwordConfirm} secureTextEntry={true}/>
        <Button title='Bestätigen' onPress={handleSubmit}/>
        </View>
        </SafeAreaView>
    );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",        
        justifyContent: 'center',
        padding: 20,
      },
    
})