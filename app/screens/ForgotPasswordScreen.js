import React from 'react';
import { StyleSheet,TextInput,View, SafeAreaView,Button,Text} from 'react-native';

function ForgotPasswordScreen(props) {
    return (
        <SafeAreaView style={styles.container}>    
        <View>
        <TextInput placeholder='Email' />
        <TextInput placeholder='Passwort' />
        <TextInput placeholder='Passwort wiederholen'/>
        <Button title='Passwort zurücksetzen'/>
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