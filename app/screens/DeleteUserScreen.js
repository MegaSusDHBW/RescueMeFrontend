import React, {useState} from 'react';
import { Alert,StyleSheet,TextInput,View, SafeAreaView,Button,Text} from 'react-native';
import * as SecureStore from 'expo-secure-store';


function DeleteUserScreen({navigation}) {
    const [password,setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [email,setEmail]= useState(null)
    const user = {
        email:'',
        password:'',
        passwordConfirm:'',
    };
    user.password = password
    user.passwordConfirm = passwordConfirm
    user.email = email
    //TODO add URL
    const handleSubmit= async () => {
        try {
          if(user.password =! password){Alert.alert('Passwörter stimmen nicht überein')}
    const requestOptions = 
    {
    
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        
    };
        console.log("POST")
        console.log(JSON.stringify(user))
        console.log(requestOptions.body);
        await fetch(
          
           'http://10.0.2.2:5000/delete-user?email='+email,
            requestOptions,
          ).then(response => {
            response.json().then(data => {
            Alert.alert('Post created at : ');
            }).then(SecureStore.deleteItemAsync('email')).then(navigation.navigate('Login'));
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

export default DeleteUserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",        
        justifyContent: 'center',
        padding: 20,
      },
    
})