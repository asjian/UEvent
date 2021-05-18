import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.navigate('MainScreen')} title="BACK" />
      </View>
    );
}

function MainScreen({navigation}) {

    bs = React.createRef();
    fall = new Animated.Value(1);
    renderInner = () => (
        <View style={styles.panel}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen')}>
                <Text>VIEW DETAILS</Text>
            </TouchableOpacity>
        </View>
    );
    
    renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={this.bs}
                snapPoints={[475, 0]}
                renderContent={this.renderInner}
                renderHeader={this.renderHeader}
                initialSnap={1}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
            }}>
            <TouchableOpacity onPress={()=>bs.current.snapTo(0)}>
                <Text>tap here</Text>
            </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const FindNavigator = createSwitchNavigator(
    {
        MainScreen,
        DetailsScreen
    },
    {initialRouteName: 'MainScreen'
    },
)

const FindContainer = createAppContainer(FindNavigator);

export default function FindScreen() {
    return (
        <FindContainer/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#fff',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -2},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom:10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 300,
    }
})
