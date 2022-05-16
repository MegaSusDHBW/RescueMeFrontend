import React from 'react'
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';


import StackNavigator from './app/components/StackNavigator';
import {NativeBaseProvider} from 'native-base'
import {RescueMeTheme} from './app/components/RescueMeTheme'


export default function App() {

    return (
        <NativeBaseProvider theme={RescueMeTheme}>

            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>

        </NativeBaseProvider>


    );
}


const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: 'flex-start'
    },
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
});
