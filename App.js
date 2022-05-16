import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigator from './app/components/StackNavigator';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider } from 'native-base'
import { RescueMeTheme, ToggleDarkMode } from './app/components/RescueMeTheme'
import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'


export default function App() {
    let [fontsLoaded] = useFonts({ Montserrat_600SemiBold });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NativeBaseProvider theme={RescueMeTheme}>

            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>

        </NativeBaseProvider>


    );
}
