import React, {useState, useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import TopBar from '../objects/topBar';
import Search from './Search';
import CategoryList from './CategoryList';
import TimeRange from './TimeRange';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Marker from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import LocationPin from '../objects/locationPin';
import AppContext from '../objects/AppContext';

//a sub branch of the main find screen
function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.navigate('MainScreen')} title="BACK" />
      </View>
    );
}

//custom bottom sheet
function MainScreen({navigation}) {
    const myContext = useContext(AppContext);
    /*
    Geocoder.init('AIzaSyBCGE9PpyEZ1FK9OBtL9uMgWW6jl8efD1I');
    Geocoder.from("2281 Bonisteel Blvd, Ann Arbor, MI, 48109")
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
		.catch(error => console.warn(error));
    */

    const [eventTitle,setEventTitle] = useState('Default Title');
    const windowHeight = Dimensions.get('window').height;
    bs = React.createRef();
    fall = new Animated.Value(1);
    renderInner = () => (
        <View style={styles.panel}>
            <View>
                <Text>
                    {eventTitle}
                </Text>
                <Text>
                    lorem ipsum dolor sit amet
                    consectetur adipiscing elit
                    Morbi hendrerit ut felis
                </Text>
            </View>
            <ScrollView>
                <Text>
                    THE BODY GOES HERE:
                </Text>
                <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit ut felis a gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt lorem sit amet ex pretium, eget placerat ante gravida. Duis egestas tellus libero, fringilla consequat nunc porta sed. Morbi pulvinar ligula arcu, in ultrices lorem semper quis. Maecenas non turpis sed felis feugiat scelerisque sed vel sapien. Aliquam dolor nisl, ullamcorper at felis at, venenatis viverra ipsum. Maecenas non ipsum massa. Duis facilisis at enim vitae porttitor. Vivamus eget porttitor mauris. Curabitur nulla velit, vehicula semper lobortis eleifend, interdum id felis.

Ut ornare est lorem, sit amet interdum nulla laoreet vel. Ut ut varius sapien, sit amet pharetra nibh. Vivamus nec arcu mattis, pretium neque et, vestibulum neque. Aenean fringilla laoreet maximus. Quisque in gravida sem, a ornare justo. Proin malesuada ligula dolor. In hac habitasse platea dictumst. Sed at auctor sem. Nam blandit orci libero, id tempor mi vestibulum et. In ultricies sagittis porta. Suspendisse vel ligula id sapien convallis varius. Morbi sem leo, accumsan a placerat sed, tempor in sapien. Etiam pharetra dui justo. Nullam vitae nunc mattis, suscipit urna et, fringilla justo. Nullam et metus lacus. Proin interdum vehicula tortor, eu pharetra dolor pharetra sit amet.

Proin vel neque sed quam tincidunt fringilla. Sed in aliquet justo. Sed nec ex quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer odio turpis, gravida ac velit id, semper imperdiet ex. In sagittis at nulla at tempus. Morbi viverra lectus justo, eu ultricies leo euismod sed. Morbi non lectus eu purus iaculis tempor ac eget lorem. Curabitur dictum laoreet sapien, convallis consequat nibh volutpat ac. Duis tincidunt tortor tellus. Vivamus scelerisque purus est, sagittis egestas arcu tempor eget. Duis sed congue velit, aliquam vulputate nisi.

Quisque pharetra justo libero, id luctus lacus imperdiet et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean laoreet dictum orci, id volutpat urna varius a. Suspendisse orci mauris, dapibus vitae ultricies ut, tincidunt ac velit. Nulla eleifend ullamcorper sapien, ac pharetra justo placerat at. Quisque eu quam sagittis, hendrerit eros in, facilisis nunc. Suspendisse lacus massa, sodales a justo in, scelerisque mollis libero.

Nam in arcu porta, volutpat neque et, finibus ligula. Donec suscipit placerat interdum. Fusce magna urna, iaculis ac tincidunt quis, malesuada ut leo. Mauris sed magna a erat laoreet dictum. Morbi viverra, enim non accumsan placerat, felis diam efficitur erat, nec pharetra quam orci imperdiet elit. Praesent accumsan congue tellus quis convallis. Donec in mi et enim dignissim consequat. Pellentesque venenatis, nunc at malesuada sollicitudin, elit eros aliquam elit, vel malesuada dolor nisi sed lacus. Curabitur egestas nisi tellus, nec venenatis urna tristique lacinia. Suspendisse consequat, sapien eu gravida posuere, ex libero condimentum enim, id pretium leo libero ut sapien. Sed varius eros quis velit gravida, ut venenatis magna suscipit. Nam fermentum erat vel lectus ornare suscipit. Pellentesque volutpat placerat tellus nec pulvinar. Aliquam consequat, nibh vel varius sollicitudin, elit metus pulvinar velit, vitae ultrices est lectus id erat.
                </Text>
            </ScrollView>
        </View>
    );
    
    renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle}>
            </View>
          </View>
        </View>
    );
    const [latDelta, setLatDelta] = useState(0.015);
    const [longDelta, setLongDelta] = useState(latDelta/2);
    
    const [snapPosition,setSnapPosition] = useState(0);
    
    const openBottomSheet = (event) => {
        if(snapPosition == 1) {
            setEventTitle(event.Name);
        }
        else if(snapPosition == 0) {
            myContext.toggleShowNavBar(false);
            bs.current.snapTo(1);
            setEventTitle(event.Name);
            setSnapPosition(1);
        }
    }
    const [eventList,setEventList] = useState([]);

    useEffect(() => {
      fetch('https://retoolapi.dev/rJZk4j/events')
        .then((response) => response.json())
        .then((json) => setEventList(json))
        .catch((error) => console.error(error))
    }, []);

    return (
        <View style = {styles.container}>
            <MapView style={styles.map}
            provider = {PROVIDER_GOOGLE}
            customMapStyle = {mapStyle}
            initialRegion = {{
            latitude: 42.278,
            longitude: -83.738,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
            }
            }
            showCompass = {false}       
            >
            <MapView.Marker coordinate = {{latitude: 42.28, longitude: -83.739}}>
                <LocationPin title = 'Party'/>
            </MapView.Marker>

            {eventList.map((item) => {
              if(item.InPersonVirtual == "In Person") {
              return (
                <View key = {item.id}>
                <MapView.Marker coordinate = {{latitude: parseFloat(item.Latitude), longitude: parseFloat(item.Longitude)}} onPress = {() => openBottomSheet(item)}>
                  <LocationPin title = {item.Name}/>
                </MapView.Marker>
                </View>
              )
              }
            })}
            </MapView>
        <View style={styles.topbar}>
                <TopBar navigation = {navigation} botSheet = {bs} snapPos = {snapPosition} setSnapPos = {setSnapPosition}/>
        </View> 

            <View style={styles.pullup}>
                <BottomSheet
                    ref={this.bs}
                    snapPoints={[0, 300, windowHeight - 50]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    initialSnap={0}
                    callbackNode={this.fall}
                    enabledGestureInteraction={true}
                    onCloseEnd={() => {setSnapPosition(0);myContext.toggleShowNavBar(true)}}
                />
                <Animated.View style={{margin: 20,
                    opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
                }}>
                </Animated.View>   
            
            </View>
        </View>
    );
}

const screens = {
    MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    DetailsScreen: {
        screen: DetailsScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            headerShown: false,
        },
    },
    CategoryList: {
        screen: CategoryList,
        navigationOptions: {
            headerShown: false,
        },
    },
    TimeRange: {
        screen: TimeRange,
        navigationOptions: {
            headerShown: false,
        },
    },
}
const FindNavigator = createStackNavigator(screens);

const FindContainer = createAppContainer(FindNavigator);

export default function FindScreen() {
    return (
        <FindContainer/>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex:1,
    },
    container: {
        flex: 1, 
    },
    topbar: {
        position: 'absolute',
        top: 50,
        width: Dimensions.get('window').width,
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
        //paddingBottom: Dimensions.get('window').height,
    }
})

const mapStyle  = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];
