import React, {useState,useEffect} from 'react';
import * as Location from 'expo-location';


function getLocation(){
    const [location, setLocation] = useState('test');
    const [errorMsg, setErrorMsg] = useState(null);

    console.log('entered function');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('reject');
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }
}
const location = getLocation();

export default location;