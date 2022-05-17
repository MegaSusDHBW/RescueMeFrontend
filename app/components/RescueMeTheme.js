import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { extendTheme, HStack, Switch, Text, useColorMode } from "native-base";
import { Colors } from './Colors';


export const RescueMeTheme = extendTheme({
    colors: {
        // Add new color
        //submit button
        primary: {
            50: Colors.primary,
            100: Colors.primary,
            200: Colors.primary,
            300: Colors.primary,
            400: Colors.primary,
            500: Colors.primary,
            600: Colors.primary,
            700: Colors.primary,
            800: Colors.primary,
            900: Colors.primary,
        },
        muted: {
            // border color
            700: Colors.borderColor,
        },
        //cancel button
        secondary: {
            50: Colors.secondary,
            100: Colors.secondary,
            200: Colors.secondary,
            300: Colors.secondary,
            400: Colors.secondary,
            500: Colors.secondary,
            600: Colors.secondary,
            700: Colors.secondary,
            800: Colors.secondary,
            900: Colors.secondary,
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