import React from 'react'
import { NativeBaseProvider, Center, Text, extendTheme } from 'native-base'


function Example() {
    // let [fontsLoaded] = useFonts({ Montserrat_600SemiBold });
    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }
    // return (
    //     <NativeBaseProvider theme={RescueMeTheme}>

    //         <NavigationContainer>
    //             <StackNavigator />
    //         </NavigationContainer>

    //     </NativeBaseProvider>
    // );
    const theme = extendTheme({
        colors: {
            primary: {
                400: '#00f',
            },
        },
        components: {
            Text: {
                baseStyle: {
                    color: 'primary.400',
                    bg: 'primary.500',
                },
                defaultProps: {
                    size: 'lg'
                },
                sizes: {
                    xl: {
                        fontSize: '64px'
                    },
                    lg: {
                        fontSize: '32px'
                    },
                    md: {
                        fontSize: '16px'
                    },
                    sm: {
                        fontSize: '12px'
                    }
                }
            }
        }
    });
    //console.log(theme['components']['Text']);
    return <NativeBaseProvider theme={theme}>
        <Center flex={1}>
            <Text>NativeBase</Text>
        </Center>
    </NativeBaseProvider>;
}
export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
        </NativeBaseProvider>
    );
};