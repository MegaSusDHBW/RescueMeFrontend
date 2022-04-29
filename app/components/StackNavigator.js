import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegestrationScreen from '../screens/RegistrationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';



console.log("entered Container");
const Stack = createStackNavigator();
console.log("created Stack" + Stack);


function StackNavigator(props) {
    return (
        
        <Stack.Navigator>
          <Stack.Screen name="Login"component={LoginScreen}/>
          <Stack.Screen name="Regestrieren" component={RegestrationScreen} />
          <Stack.Screen name='Passwort Vergessen' component={ForgotPasswordScreen}/>
          <Stack.Screen name='TabNav' component={TabNavigator}/>
        </Stack.Navigator>
      
    );
}

console.log("field Stack" + Stack);
export default StackNavigator