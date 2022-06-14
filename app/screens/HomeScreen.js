import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, ScrollView, Text, useColorMode, View, VStack} from 'native-base';
import {RefreshControl} from 'react-native';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import {Collapse, CollapseBody, CollapseHeader} from 'accordion-collapse-react-native';
import {Colors} from "../components/Colors";
import {AntDesign} from '@expo/vector-icons';
import {ipAddress} from '../helper/HttpRequestHelper';

async function getLocation() {
    return (async () => {
        let status = await Location.requestForegroundPermissionsAsync();
        if (!status.granted) {
            console.warn('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        return location;
    })();
}

async function getW3W(jwt, location) {
    // setup request options
    const requestOptions = {
        method: 'POST', headers: {'Content-Type': 'application/json', 'jwt': jwt}, body: JSON.stringify({
            coords: {
                latitude: location.coords.latitude, longitude: location.coords.longitude,
            }
        })
    };

    // fetch w3w data
    let response = await fetch(ipAddress + 'get-geodata', requestOptions,);

    const data = await response.json();
    if (response.ok) {
        console.log("W3W RESPONSE OKAY");
        return data.words;
    } else {
        console.log("W3W RESPONSE NOT OKAY");
        return null;
    }
}

async function getHospitals(jwt, location) {
    // add coords to request body
    const requestOptions = {
        method: 'POST', headers: {'Content-Type': 'application/json', 'jwt': jwt}, body: JSON.stringify({
            coords: {
                latitude: location.coords.latitude, longitude: location.coords.longitude,
            }
        })
    };

    // fetch hospital data
    let response = await fetch(ipAddress + 'get-hospitals', requestOptions,);

    const data = await response.json();
    if (response.ok) {
        console.log("HOSPITAL RESPONSE OKAY");
        return data;
    } else {
        console.log("HOSPITAL RESPONSE NOT OKAY");
        return null;
    }
}

const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function HomeScreen({navigation}) {
    const style = require('../components/Styles.js');
    const [what3Words, set3Words] = useState(null);
    const [email, setEmail] = useState('test');
    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [hospitals_short, setHospitalShort] = useState([]);
    const [hospitals_rest, setHospitalRest] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedFirstAidStabileSeitenlage, setIsExpandedFirstAidStabileSeitenlage] = useState(false);
    const [isExpandedFirstAidBewusstlosigkeit, setIsExpandedFirstAidBewusstlosigkeit] = useState(false);
    const [isExpandedFirstAidBeatmung, setIsExpandedFirstAidBeatmung] = useState(false);
    const [isExpandedFirstAidNotruf, setIsExpandedFirstAidNotruf] = useState(false);


    const hospital_count_short = 5;
    let textColor = useColorMode().colorMode === 'dark' ? Colors.textColorLight : Colors.textColorDark;

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false))
    })

    async function getJWT() {
        await SecureStore.getItemAsync('jwt');
    }

    getJWT();

    useEffect(async () => {
        try {
            let storeEmail = await SecureStore.getItemAsync('email');
            let jwt = await SecureStore.getItemAsync('jwt');

            setJwt(jwt);
            setEmail(storeEmail);

            if (errorMessage === null && what3Words === null) {
                if (location === null || location === undefined) {
                    // location
                    let loc = await getLocation();

                    // what3words
                    if (what3Words === null || what3Words === undefined) {
                        let words = await getW3W(jwt, loc);
                        set3Words(words);
                    }
                    // hospitals
                    // if (hospitals_short === [] || hospitals_short === undefined) {
                    let data = await getHospitals(jwt, loc);
                    if (data !== null) {
                        let tempShort = [];
                        let tempRest = [];

                        for (let index = 0; index < Object.keys(data).length; index++) {
                            if (index < hospital_count_short) {
                                tempShort.push(data[index]);
                            } else {
                                tempRest.push(data[index]);
                            }
                        }

                        setHospitalShort(tempShort);
                        setHospitalRest(tempRest);
                    }
                    // }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    function handleNavigationData() {
        navigation.navigate('Data')
    };

    // function handleNavigationGuide() {
    //   navigation.navigate('Guide')
    // }

    if (jwt != undefined && email != undefined) {
        return (<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <VStack style={[style.wrapper, style.flex, style.flexStart, style.paddingTop]}>
                <VStack style={style.marginForm}>
                    <Text style={style.textCenter}>Willkommen,</Text>
                    <Text style={style.textCenter}>{email}!</Text>
                </VStack>
                <Image
                    key={new Date().getTime()}
                    source={{
                        uri: ipAddress + 'create-qrcode?date=' + new Date() + '&jwt=' + jwt,
                        headers: {'jwt': jwt, Pragma: 'no-cache'},
                        cache: 'reload',
                    }}
                    style={[style.marginForm]}
                    alt={'Encrypted QR Code'}/>
                <Button
                    onPress={handleNavigationData}
                    style={[style.marginForm]}>
                    <Text variant={'button'}>Gesundheitsdaten hinzufügen</Text>
                </Button>
                <View style={[style.fullWidth, style.marginForm]}>
                    <Text style={style.textCenter}>GPS-Position</Text>
                    <Text>what3words:</Text>
                    <Text>///{what3Words}</Text>
                </View>
                {/* <Button
            onPress={handleNavigationGuide}
            style={[style.marginForm]}>
            <Text variant={'button'}>Erste Hilfe Guide</Text>
          </Button> */}
                <View>
                    <Collapse isExpanded={isExpanded} onToggle={(expanded) => {
                        setIsExpanded(expanded)
                    }}>
                        <CollapseHeader>
                            <View style={[style.paddingForm, style.marginForm]}>
                                <Text>Krankenhäuser in der Nähe</Text>
                                {hospitals_short.map(hospital => {
                                    return <Text style={[style.dividerBot, style.paddingForm]}
                                                 key={hospital.name}>─ {hospital.name}</Text>
                                })}
                                {!isExpanded && <View style={style.flexBetween}>
                                    <Text style={[style.textCenter]}>Mehr anzeigen</Text>
                                    <AntDesign name="pluscircleo" color={textColor} size={20}/>
                                </View>}
                                {isExpanded && <View style={style.flexBetween}>
                                    <Text style={style.textCenter}>Weniger anzeigen</Text>
                                    <AntDesign name="minuscircleo" color={textColor} size={20}/>
                                </View>}
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <VStack style={style.marginForm}>
                                {hospitals_rest.map(hospital => {
                                    return <Text style={[style.paddingForm]}
                                                 key={hospital.name}>─ {hospital.name}</Text>
                                })}
                            </VStack>
                        </CollapseBody>
                    </Collapse>
                </View>
                <View>
                </View>
                <View>
                </View>
                <VStack style={style.marginForm}>
                    <Text style={style.textCenter}>Erste Hilfe Guide</Text>
                </VStack>
                <View>
                    <Collapse isExpandedFirstAidStabileSeitenlage={isExpandedFirstAidStabileSeitenlage}
                              onToggle={(expanded) => {
                                  setIsExpandedFirstAidStabileSeitenlage(expanded)
                              }}>
                        <CollapseHeader>
                            <View style={[style.paddingForm, style.marginForm]}>
                                <Text>Stabile Seitenlage</Text>
                                {!isExpandedFirstAidStabileSeitenlage && <View style={style.flexBetween}>
                                    <Text style={[style.textCenter]}>Mehr anzeigen</Text>
                                    <AntDesign name="pluscircleo" color={textColor} size={20}/>
                                </View>}
                                {isExpandedFirstAidStabileSeitenlage && <View style={style.flexBetween}>
                                    <Text style={style.textCenter}>Weniger anzeigen</Text>
                                    <AntDesign name="minuscircleo" color={textColor} size={20}/>
                                </View>}
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <VStack style={style.marginForm}>
                                <View>
                                    <Text>
                                        1. Seitlich neben dem Betroffenen knien. Die Beine des Betroffenen
                                        ausstrecken.
                                        Den Arm angewinkelt nach oben legen.
                                    </Text>

                                </View>


                                <View>
                                    <Text>
                                        2. An den fernen Oberschenkel greifen und das Bein beugen und zu sich
                                        ziehen.
                                        Das obere Bein so ausrichten, dass der Oberschenkel im 90° Winkel zur Hüfte
                                        liegt. </Text>
                                </View>

                                <View>
                                    <Text>
                                        3. Hals überstrecken, indem das Kinn nach oben gezogen wird.
                                    </Text>
                                </View>

                                <View>
                                    <Text>
                                        4. Mund des Betroffenen vorsichtig und leicht öffnen.
                                        Die an der Wange liegende Hand so positionieren, dass der Hals überstreckt,
                                        bleibt.</Text>
                                </View>
                            </VStack>
                        </CollapseBody>
                    </Collapse>
                </View>
                <View>
                    <Collapse isExpandedFirstAidBewusstlosigkeit={isExpandedFirstAidBewusstlosigkeit}
                              onToggle={(expanded) => {
                                  setIsExpandedFirstAidBewusstlosigkeit(expanded)
                              }}>
                        <CollapseHeader>
                            <View style={[style.paddingForm, style.marginForm]}>
                                <Text>Bewusstlosigkeit</Text>
                                {!isExpandedFirstAidBewusstlosigkeit && <View style={style.flexBetween}>
                                    <Text style={[style.textCenter]}>Mehr anzeigen</Text>
                                    <AntDesign name="pluscircleo" color={textColor} size={20}/>
                                </View>}
                                {isExpandedFirstAidBewusstlosigkeit && <View style={style.flexBetween}>
                                    <Text style={style.textCenter}>Weniger anzeigen</Text>
                                    <AntDesign name="minuscircleo" color={textColor} size={20}/>
                                </View>}
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <VStack style={style.marginForm}>
                                <View>
                                    <Text>
                                        1. Betroffenen ansprechen und berühren, um Bewusstsein zu überprüfen.

                                    </Text>

                                </View>


                                <View>
                                    <Text>
                                        2. Atmung überprüfen: Schauen, ob Brustkorb sich hebt und senkt; Hören, ob
                                        Atemgeräusche vorhanden; Fühlen, ob Luftstrom fühlbar ist (Nase / Mund) </Text>
                                </View>

                                <View>
                                    <Text>
                                        3. Falls Atmung vorhanden: 112 rufen, Betroffene wärmen und erneut nach Atmung
                                        überprüfen bis Rettungsdienst da ist.
                                    </Text>
                                </View>
                            </VStack>
                        </CollapseBody>
                    </Collapse>
                </View>
                <View>
                    <Collapse isExpandedFirstAidBeatmung={isExpandedFirstAidBeatmung}
                              onToggle={(expanded) => {
                                  setIsExpandedFirstAidBeatmung(expanded)
                              }}>
                        <CollapseHeader>
                            <View style={[style.paddingForm, style.marginForm]}>
                                <Text>Beatmung / Atemspende</Text>
                                {!isExpandedFirstAidBeatmung && <View style={style.flexBetween}>
                                    <Text style={[style.textCenter]}>Mehr anzeigen</Text>
                                    <AntDesign name="pluscircleo" color={textColor} size={20}/>
                                </View>}
                                {isExpandedFirstAidBeatmung && <View style={style.flexBetween}>
                                    <Text style={style.textCenter}>Weniger anzeigen</Text>
                                    <AntDesign name="minuscircleo" color={textColor} size={20}/>
                                </View>}
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <VStack style={style.marginForm}>
                                <View>
                                    <Text>
                                        1. Neigen Sie den Kopf nach hinten, um die Atemwege zu öffnen, während Sie das
                                        Kinn anheben.
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        2. Legen Sie Daumen und Zeigefinger der Hand auf die Stirn und schließen Sie den
                                        weichen Teil der Nase.
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        3. Öffnen Sie den Mund des Betroffenen, während Sie das Kinn hochhalten.
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        4. Atmen Sie normal und legen Sie Ihre Lippen fest auf den Mund des Betroffenen.
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        5. Blasen Sie eine Sekunde lang gleichmäßig in den Mund des Betroffenen, wodurch
                                        sich der Brustkorb deutlich hebt.
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        6. Halten Sie den Kopf des Betroffenen in Position, drehen Sie den eigenen Kopf
                                        zur Seite, atmen Sie erneut ein und beobachten Sie, ob der Brustkorb des Opfers
                                        wieder sinkt.
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        7. Betroffenen erneut beatmen.
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        8. Wenn die Atmung nicht einsetzt, Maßnahmen ergreifen (Druckmassage, Atemspende
                                        im kontinuierlichen 30:2-Wechsel) bis zum Eintreffen des Spezialisten.
                                    </Text>
                                </View>

                            </VStack>
                        </CollapseBody>
                    </Collapse>
                </View>
                <View>
                    <Collapse isExpandedFirstAidNotruf={isExpandedFirstAidNotruf}
                              onToggle={(expanded) => {
                                  setIsExpandedFirstAidNotruf(expanded)
                              }}>
                        <CollapseHeader>
                            <View style={[style.paddingForm, style.marginForm]}>
                                <Text>Notruf absetzen</Text>
                                {!isExpandedFirstAidNotruf && <View style={style.flexBetween}>
                                    <Text style={[style.textCenter]}>Mehr anzeigen</Text>
                                    <AntDesign name="pluscircleo" color={textColor} size={20}/>
                                </View>}
                                {isExpandedFirstAidNotruf && <View style={style.flexBetween}>
                                    <Text style={style.textCenter}>Weniger anzeigen</Text>
                                    <AntDesign name="minuscircleo" color={textColor} size={20}/>
                                </View>}
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <VStack style={style.marginForm}>
                                <View>
                                    <Text>
                                        1. Wo befinden Sie sich?
                                    </Text>
                                    <Text>
                                        - Möglichst exakte Standortangabe geben, selbst bei Verbindungsproblemen ist die
                                        Leitstelle nun fähig, auf den Notfall zu reagieren.
                                    </Text>
                                    <Text>
                                        - Exakte Angaben notwendig. Möglichst genaue Angaben über den Notfallort: Ort,
                                        Straße, Hausnummer, Fabrikgebäude, Zufahrtswege, Stockwerk usw.
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        2. Auf Rückfragen Warten!</Text>

                                    <Text>
                                        - Alle relevanten Informationen werden vom Personal der Leitstelle abgefragt.
                                    </Text>
                                    <Text>
                                        - Erst Auflegen, wenn dort alle wichtigen Informationen vorliegen und die
                                        Leitstelle das Gespräch beendet!
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        Ebenfalls wichtig: Sie können nichts falsch machen: In den Leitstellen treffen
                                        Sie auf professionell geschultes Personal, welches alle Fragen stellt, die dort
                                        benötigt werden.
                                    </Text>
                                </View>


                            </VStack>
                        </CollapseBody>
                    </Collapse>
                </View>

            </VStack>
        </ScrollView>)
    } else {
        return (<View>
            <Text>loading</Text>
        </View>)
    }
}

export default HomeScreen;