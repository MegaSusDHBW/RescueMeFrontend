import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegestrationScreen from '../screens/RegistrationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DeleteUserScreen from '../screens/DeleteUserScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';



console.log("entered Container");
const Stack = createStackNavigator();
console.log("created Stack" + Stack);


function StackNavigator(props) {
    return (
        
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options ={{headerShown: true}}/>
          <Stack.Screen name="Regestrieren" component={RegestrationScreen} />
          <Stack.Screen name='Passwort Vergessen' component={ForgotPasswordScreen}/>
          <Stack.Screen name='TabNav' options={{headerShown: false}} component={TabNavigator}/>
          <Stack.Screen name='Passwort ändern'  component={ChangePasswordScreen}/>
          <Stack.Screen name= 'Konto löschen' component={DeleteUserScreen}/>
          <Stack.Screen name= 'QRCodeScanner' component={QRCodeScannerScreen}/>
        </Stack.Navigator>
      
    );
}

console.log("field Stack" + Stack);
export default StackNavigator