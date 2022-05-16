import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DeleteUserScreen from '../screens/DeleteUserScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import { Box } from "native-base";


console.log("entered Container");
const Stack = createStackNavigator();
console.log("created Stack" + Stack);


function StackNavigator(props) {
    let bgColor = '#1a1a1a';
    return (
        <Stack.Navigator _light={{ bg: "danger.600" }}
            _dark={{ bg: "danger.500" }}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, cardStyle: { backgroundColor: bgColor } }} />
            <Stack.Screen name="Registrieren" component={RegistrationScreen} options={{ headerShown: false, cardStyle: { backgroundColor: bgColor } }} />
            <Stack.Screen name='Passwort Vergessen' component={ForgotPasswordScreen} options={{ headerShown: true, cardStyle: { backgroundColor: bgColor } }} />
            <Stack.Screen name='TabNav' component={TabNavigator} options={{ headerShown: false, cardStyle: { backgroundColor: bgColor } }} />
            <Stack.Screen name='Passwort ändern' component={ChangePasswordScreen} options={{ headerShown: true, cardStyle: { backgroundColor: bgColor } }} />
            <Stack.Screen name='Konto löschen' component={DeleteUserScreen} options={{ headerShown: true, cardStyle: { backgroundColor: bgColor } }} />
            <Stack.Screen name='QRCodeScanner' component={QRCodeScannerScreen} options={{ headerShown: true, cardStyle: { backgroundColor: bgColor } }} />
        </Stack.Navigator>
    );
}

console.log("field Stack" + Stack);
export default StackNavigator