import React from 'react';
import { useColorMode } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from './Colors';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import TabNavigator from './TabNavigator';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DeleteUserScreen from '../screens/DeleteUserScreen';

console.log("entered Container");
const Stack = createStackNavigator();
console.log("created Stack" + Stack);

function StackNavigator(props) {
  let bgColor = useColorMode()['colorMode'] === 'dark' ? Colors.backgroundColorDark : Colors.backgroundColorLight;
  let textColor = useColorMode()['colorMode'] === 'dark' ? Colors.textColorLight : Colors.textColorDark;
  const weight = 'bold';

  return (
    <Stack.Navigator
      _light={{ bg: "danger.600" }}
      _dark={{ bg: "danger.500" }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, headerStyle: { backgroundColor: bgColor, }, headerTintColor: textColor, headerTitleStyle: { fontWeight: weight, fontFamily: 'Montserrat' }, cardStyle: { backgroundColor: bgColor } }} />
      <Stack.Screen name="Registrieren" component={RegistrationScreen} options={{ headerShown: true, headerStyle: { backgroundColor: bgColor, }, headerTintColor: textColor, headerTitleStyle: { fontWeight: weight, fontFamily: 'Montserrat' }, cardStyle: { backgroundColor: bgColor } }} />
      <Stack.Screen name='Passwort vergessen' component={ForgotPasswordScreen} options={{ headerShown: true, headerStyle: { backgroundColor: bgColor, }, headerTintColor: textColor, headerTitleStyle: { fontWeight: weight, fontFamily: 'Montserrat' }, cardStyle: { backgroundColor: bgColor } }} />
      <Stack.Screen name='TabNav' component={TabNavigator} options={{ headerShown: false, headerStyle: { backgroundColor: bgColor, }, headerTintColor: textColor, headerTitleStyle: { fontWeight: weight, fontFamily: 'Montserrat' }, cardStyle: { backgroundColor: bgColor } }} />
      <Stack.Screen name='Passwort ändern' component={ChangePasswordScreen} options={{ headerShown: true, headerStyle: { backgroundColor: bgColor, }, headerTintColor: textColor, headerTitleStyle: { fontWeight: weight, fontFamily: 'Montserrat' }, cardStyle: { backgroundColor: bgColor } }} />
      <Stack.Screen name='Konto löschen' component={DeleteUserScreen} options={{ headerShown: true, headerStyle: { backgroundColor: bgColor, }, headerTintColor: textColor, headerTitleStyle: { fontWeight: weight, fontFamily: 'Montserrat' }, cardStyle: { backgroundColor: bgColor } }} />
    </Stack.Navigator>
  );
}

console.log("field Stack" + Stack);
export default StackNavigator