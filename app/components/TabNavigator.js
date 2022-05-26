import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';
import ProfileScreen from '../screens/ProfileScreen'
import EmergencyContact from '../screens/EmergencyContact';
import { Ionicons, Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from './Colors';
import { useColorMode } from 'native-base';


console.log("entered Container");
const Tab = createBottomTabNavigator();
console.log("created Tabs" + Tab);

function TabNavigator(props) {
    let bgColor = useColorMode()['colorMode'] === 'dark' ? Colors.backgroundColorDark : Colors.backgroundColorLight;
    let textColor = useColorMode()['colorMode'] === 'dark' ? Colors.textColorLight : Colors.textColorDark;
    const weight = 'bold';

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: bgColor,
                },
                headerTintColor: textColor,
                headerTitleStyle: {
                    fontWeight: weight
                }, cardStyle: {
                    backgroundColor: bgColor
                },
                "tabBarActiveTintColor": textColor,
                "tabBarInactiveTintColor": textColor,
                "tabBarActiveBackgroundColor": Colors.primary,
                "tabBarInactiveBackgroundColor": bgColor,
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Start',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name="Data"
                component={DataScreen}
                options={{
                    tabBarLabel: 'Gesundheitsdaten',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heartbeat" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name='Notfallkontakt'
                component={EmergencyContact}
                options={{
                    tabBarLabel: 'Notfallkontakt',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="phone-in-talk" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" color={color} size={size} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

console.log("field Stack" + Tab);
export default TabNavigator