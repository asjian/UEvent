import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function ProfileScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>this is the profile screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ProfileScreen;