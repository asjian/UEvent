import React from 'react';
import { TouchableOpacity, Image } from 'react-native-gesture-handler';

{/* Map marker icon */}
const MapMarker = () => {
    <TouchableOpacity >
        <Image style={styles.MapMarkerStyle} source={require('../assets/MapMarker.png')} />
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    MapMarkerStyle : {
        height: 40,
        width: 40,
    }
})