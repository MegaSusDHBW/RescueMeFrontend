import {extendTheme} from "native-base";

export const RescueMeTheme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: '#246c17',
            100: '#246c17',
            200: '#246c17',
            300: '#246c17',
            400: '#AAAAAA',
            500: '#FFFFFF',
            600: '#DD00DD',
            700: '#FFFFFF',
            800: '#FFFFFF',
            900: '#FFFFFF'
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