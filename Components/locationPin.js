import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text} from 'react-native';


{/* Map marker icon */}
export default function LocationPin({title,onPress}) {
    return (
        <TouchableOpacity onPress = {onPress}>
            <Image style={styles.MapMarkerStyle} source={require('../assets/MapMarker.png')} />
            <Text>{title}</Text>
        </TouchableOpacity>
    );
}
    
    
    

const styles = StyleSheet.create({
    MapMarkerStyle : {
        height: 40,
        width: 40,
    }
})

