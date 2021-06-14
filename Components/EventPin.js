import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text} from 'react-native';


{/* Map marker icon */}
const LocationPin = () => {
    return (
        <TouchableOpacity >
            <Image style={styles.MapMarkerStyle} source={require('../assets/MapMarker.png')} />
            <Text>Party</Text>
        </TouchableOpacity>
    );
}
    
    
    

const styles = StyleSheet.create({
    MapMarkerStyle : {
        height: 40,
        width: 40,
    }
})

export default LocationPin;
