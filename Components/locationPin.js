import React from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';


{/* Map marker icon */}
export default function LocationPin({title}) {
    return (
        <View>
            <Image style={styles.MapMarkerStyle} source={require('../assets/MapMarker.png')} />
            <Text>{title}</Text>
        </View>
    );
}
    
const styles = StyleSheet.create({
    MapMarkerStyle : {
        height: 40,
        width: 40,
    }
})

