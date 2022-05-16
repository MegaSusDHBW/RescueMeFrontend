import {extendTheme} from "native-base";

export const RescueMeTheme = extendTheme({
    colors: {
        // Add new color
        //submit button
        primary: {
            50: '#246c17',
            100: '#246c17',
            200: '#246c17',
            300: '#246c17',
            400: '#246c17',
            500: '#246c17',
            600: '#246c17',
            700: '#246c17',
            800: '#246c17',
            900: '#246c17',
        },

        //cancel button
        secondary: {
            50: '#e4002b',
            100: '#e4002b',
            200: '#e4002b',
            300: '#e4002b',
            400: '#e4002b',
            500: '#e4002b',
            600: '#e4002b',
            700: '#e4002b',
            800: '#e4002b',
            900: '#e4002b',
        },
// Redefinig only one shade, rest of the color will remain same.
        amber: {
            400: '#d97706'
        }
    },
    config: {
// Changing initialColorMode to 'dark'
        initialColorMode: 'dark'
    }
});