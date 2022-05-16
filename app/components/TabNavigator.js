import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';
import ProfileScreen from '../screens/ProfileScreen'
import EmergencyContact from '../screens/EmergencyContact';


console.log("entered Container");
const Tab = createBottomTabNavigator();
console.log("created Tabs" + Tab);

function TabNavigator(props) {
    return (
        
        <Tab.Navigator>
            <Tab.Screen  name="Home" component={HomeScreen}/>
            <Tab.Screen name="Data" component={DataScreen}/>
            <Tab.Screen name='Notfallkontakt' component={EmergencyContact}/>
            <Tab.Screen name="Profil" component={ProfileScreen}/>
        </Tab.Navigator>
      
    );
}

console.log("field Stack" + Tab);
export default TabNavigator