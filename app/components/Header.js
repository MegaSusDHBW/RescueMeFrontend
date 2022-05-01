import React from 'react';
import { StyleSheet,View,Button,Text} from 'react-native';
function Header({title}) {
    return (
        <View>
            <Text >{title}</Text>
        </View>
    );
}

export default Header;
const styles = StyleSheet.create({
    header: {
        height:60,
        padding: 20,
        backgroundColor: '#000'
    }
})