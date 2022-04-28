import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';




console.log("entered Container");
const Tab = createBottomTabNavigator();
console.log("created Tabs" + Tab);

function TabNavigator(props) {
    return (
        
        <Tab.Navigator>
            <Tab.Screen  name="Home" component={HomeScreen}/>
            <Tab.Screen name="Data" component={DataScreen}/>
        </Tab.Navigator>
      
    );
}

console.log("field Stack" + Tab);
export default TabNavigator