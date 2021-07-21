import React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Globals from '../../../GlobalVariables';
import MapView from 'react-native-maps';
import {PROVIDER_GOOGLE,Marker} from 'react-native-maps';

export default function LocationAutocomplete({address,setFormikValue}) {
    const [key,setKey] = useState('AIzaSyQ71aMba5yieWm7Lqp4KXs6oIOKrwPUI0m');
    const getKey = () => {
        const fetchurl = Globals.apiKeysURL;
        fetch(fetchurl + '?KeyName=LocationAutocomplete')
        .then((response) => response.json())
        .then((json) => {setKey(json[0].ApiKey)})
        .catch((error) => {console.error(error)});
    }
    if(key == 'AIzaSyQ71aMba5yieWm7Lqp4KXs6oIOKrwPUI0m') {
        getKey();
    }
    const [token,setToken] = useState('adfhsdoffvio');
    const createSessionToken  = () => {
        let uuid = require("uuid");
        let newToken = uuid.v4();
        setToken(newToken);
    }
    const ref = useRef();
    useEffect(() => {
        ref.current.setAddressText(address);
    }, []);

    const [pressed,setPressed] = useState(false);

    const [mapRegion,setMapRegion] = useState({
        latitude: 42.278,
        longitude: -83.738,
        latitudeDelta: 0.015,
        longitudeDelta: 0.075,
    });

    return (
        <View>
        <GooglePlacesAutocomplete
            ref = {ref}
            query={{
                key: key,
                sessiontoken: token,
                language: 'en',
                location: '42.278, -83.738',
                radius: '25000',
                //strictbounds: true,
                components: 'country:us',
            }}
            fetchDetails = {true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true         
                setPressed(true);
                setMapRegion({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng,latitudeDelta:0.012,longitudeDelta:0.006});
                createSessionToken();
                setFormikValue('Address',data.description);
            }}
            //autoFillOnNotFound = {true}
            //onNotFound
            //onFail
            minLength = {3}
            placeholder='Search Locations'
            disableScroll = {true}
            //suppressDefaultStyles = {true}
            styles = {{
                textInput: {
                    backgroundColor: '#fffbf2',
                    height: 40,
                    borderBottomColor: '#c4c4c4',
                    borderBottomWidth: 1,
                    fontSize: 14,
                }
            }}
            textInputProps = {{
                onFocus: () => {
                    createSessionToken();
                },
                onChangeText: (text) => {
                    if(ref.current.isFocused()) {
                        setPressed(false);
                        setFormikValue('Address',text);
                        ref.current.setAddressText(text);
                    }
                },
                onSubmitEditing: () => {
                    if(!pressed) {
                        //display form error somehow
                        console.log('please choose an address from the dropdown');
                    }
                }
                //the other error with tapping out before completing a valid address probably needs to be done in the main file
            }
            }
        />
        <View style = {styles.mapContainer}>
            <MapView style = {styles.map}   
                provider = {PROVIDER_GOOGLE}  
                region = {mapRegion}
                zoomEnabled = {true}
                >
                <Marker coordinate = {{latitude: mapRegion.latitude,longitude:mapRegion.longitude}}/>
            </MapView>
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    map: {
        width: '75%',
        height: 175,
    },
    mapContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
})
