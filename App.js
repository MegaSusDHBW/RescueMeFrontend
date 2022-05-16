import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';


import StackNavigator from './app/components/StackNavigator';
import {NativeBaseProvider} from 'native-base'
import {RescueMeTheme, ToggleDarkMode} from './app/components/RescueMeTheme'



export default function App() {

    return (
        <NativeBaseProvider theme={RescueMeTheme}>

            <NavigationContainer>
                <StackNavigator/>
                <ToggleDarkMode />
            </NavigationContainer>

        </NativeBaseProvider>


    );
}
