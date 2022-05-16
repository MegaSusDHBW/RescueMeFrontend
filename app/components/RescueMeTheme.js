import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { extendTheme, HStack, Switch, Text, useColorMode } from "native-base";


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
        muted: {
            // border color
            700: '#c4c4c4',
        },
        //cancel button
        secondary: {
            50: '#6c1717',
            100: '#6c1717',
            200: '#6c1717',
            300: '#6c1717',
            400: '#6c1717',
            500: '#6c1717',
            600: '#6c1717',
            700: '#6c1717',
            800: '#6c1717',
            900: '#6c1717',
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontSize: 'lg',
                rounded: 'lg',
                borderWidth: 2,
                borderColor: 'muted.700',
            },
            variants: {
                unstyled: {
                    borderWidth: 0,
                }
            }
        },
        Input: {
            baseStyle: {
                //fontSize: 'lg',
                rounded: 'lg',
                borderWidth: 2,
                borderColor: 'error.600', // WTF NOT WORKING!?!?!?!?!?
                _focus: {
                    borderColor: '#ff00ff',
                }
            },
            defaultProps: {
                size: 'lg'
            },
        },
        Text: {
            baseStyle: {
                fontSize: 'lg'
            },
        },
    },
    fontConfig: {
        Montserrat: {
            600: {
                normal: Montserrat_600SemiBold,
            }
        }
    },
    fonts: {
        heading: 'Montserrat_600SemiBold',
        body: 'Montserrat_600SemiBold',
        mono: 'Montserrat_600SemiBold',
    },
    config: {
        // Changing initialColorMode to 'dark'
        initialColorMode: 'dark',
    }
});

export function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack space={2}>
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === "light"}
                onToggle={toggleColorMode}
                aria-label={
                    colorMode === "light" ? "switch to dark mode" : "switch to light mode"
                }
            />
            <Text>Light</Text>
        </HStack>
    );
}