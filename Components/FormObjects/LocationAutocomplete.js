import React, {useState,useRef,useEffect} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Globals from '../../../GlobalVariables';

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
    const textRef = useRef();
    return (
        <GooglePlacesAutocomplete
            ref = {ref}
            query={{
                key: key,
                sessiontoken: token,
                language: 'en',
                location: '42.278, -83.738',
                radius: '25000',
                //strictbounds: true,
            }}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                createSessionToken();
                setFormikValue('Address',data.description);
            }}
            //autoFillOnNotFound = {true}
            //onNotFound
            //onFail
            minLength = {3}
            placeholder='Search Locations'
            disableScroll = {true}
            textInputProps = {{
                onFocus: () => createSessionToken(),
                onChangeText: (text) => {
                    if(ref.current.isFocused()) {
                        setFormikValue('Address',text);
                        ref.current.setAddressText(text);
                    }
                },
            }}
        />
    );
}