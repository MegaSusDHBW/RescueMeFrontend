import React   from 'react';
import { StyleSheet,TextInput, SafeAreaView,Button,View} from 'react-native';
import Header from '../components/Header';
function RegestrationScreen(props) {
  //const account = [email, password]
  console.log("renderdRegestration");
  return (
    <SafeAreaView style={styles.container}>    
    <View>
    <TextInput placeholder='Email' />
    <TextInput placeholder='Passwort' />
    <TextInput placeholder='Passwort wiederholen'/>
    <Button title='Regestrieren'/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",        
    justifyContent: 'center',
    padding: 20,
  },
})
export default RegestrationScreen;

  