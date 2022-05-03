import { setStatusBarHidden } from 'expo-status-bar';
import React, {useState,useEffect,useCallback} from 'react';
import { StyleSheet,TextInput,View, SafeAreaView,Button,Text} from 'react-native';
import App from '../../App';
//import styles from '../components/GlobalStyles';
import * as HTTP from '../helper/HttpRequestHelper';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native-web';


function LoginScreen({navigation}) {
     
    const [auth, setAuth] = useState(null);
    useEffect( async () => {
      await SecureStore.deleteItemAsync('email')
      async function checkAuth(){
        let store = await SecureStore.getItemAsync('email');
        console.log('store ' + store);
        if(store === null){
          setAuth(false);
        }
        else{
          return setAuth(true)
        } 
      }
      SecureStore.getItemAsync('email').then((value) => console.log(value));
      await checkAuth()
      console.log(auth);
      if(auth){
        console.log('user was already loged in');
        navigation.navigate('TabNav')
      }
    });

    function handleNavigationRegistry () {navigation.navigate('Regestrieren')};
    function handleNavigationForgotPassword () {navigation.navigate('Passwort Vergessen')};
    function handleNavigationHome() {navigation.navigate('TabNav')}
    const user = {
        email: '',
        password:'',
    };
    //const handleSubmit1 =  httpHelper.Post('',user);
    
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
              ).then(response => { if(response.ok){
                console.log(Promise.resolve(response.ok)).then(console.log('loged in')).then(SecureStore.setItemAsync('email',email))
                .then(console.log(SecureStore.getItemAsync('email'))).then(handleNavigationHome())
              }else{
                Alert.alert('Nutzername oder Passwort falsch')
              };
              });
            } catch (error) {
              console.error(error);
            }
          };
    const [password,setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [error,setError] = useState(false);
    user.email = email;
    user.password = password;
    return (        
       <View style={style.container}>
       <TextInput placeholder='Email'  
       onChangeText={(value) => setEmail(value )} 
       value={email}/>
       <TextInput
        placeholder='Passwort'
        onChangeText={(value) => setPassword(value )} 
        value={password} 
        secureTextEntry={true} />
       <Button title='Login' style={style.loginButton} onPress={handleSubmit}/>
       <Button title='Registrieren' style={style.loginButton} onPress={handleNavigationRegistry}/>
       <Button title='Passwort' style={style.loginButton} onPress={handleNavigationForgotPassword}/>
       </View>
    );
}
const style = StyleSheet.create({
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