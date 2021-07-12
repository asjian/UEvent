import React from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';


{/* Map marker icon */}
export default function LocationPin({title}) {
    let displayTitle = '';

    let words = title.split(" ");
    let runningLength = 0;

    for(let i=0;i<words.length;i++) {
        displayTitle += words[i];
        runningLength += words[i].length;
        if(runningLength > 12) {
            displayTitle += '\n';
            runningLength = 0;
        }
        else {
            displayTitle += ' ';
        }
    }
    displayTitle = displayTitle.slice(0, -1); 

    return (
        <View style = {styles.container}>
            <View style = {styles.textContainer}>
                <Text style = {styles.titleText}>{displayTitle}</Text>
            </View>
            <View style = {styles.triangle}>
            </View>
            <Image style={styles.mapMarkerStyle} source={require('../assets/MapMarker.png')} />
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    mapMarkerStyle : {
        height: 50,
        width: 50,
    },
    titleText: {
        fontSize: 11,
        fontWeight: '500',
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    textContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 7,
        borderRightWidth: 7,
        borderBottomWidth: 0,
        borderLeftWidth: 7,
        borderTopColor: "white",
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        marginBottom: -7,
    },
})

