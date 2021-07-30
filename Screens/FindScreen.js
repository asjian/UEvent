import React, {useState, useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, Image} from 'react-native';
import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import TopBar from '../objects/topBar';
import MapSearchBar from '../objects/mapSearchBar';
import Search from './Search';
import CategoryList from './CategoryList';
import TimeRange from './TimeRange';
import OtherFilters from './OtherFilters';
//import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import LocationPin from '../objects/locationPin';
import AppContext from '../objects/AppContext';
import Globals from '../../GlobalVariables';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
    Geocoder.init('AIzaSyCwpmhlqGnuN1m-MdKp0FOpVZwFR1QFqug');
    Geocoder.from("2281 Bonisteel Blvd, Ann Arbor, MI, 48109")
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
		.catch(error => console.warn(error));
    */  
    const [currentEvent,setCurrentEvent] = useState({
      "id": 1,
      "Name": "OSU Pregame Tailgate",
      "Tags": "",
      "Email": "",
      "Avatar": "",
      "Images": "",
      "Address": "1520 S University Ave, Ann Arbor, MI 48104",
      "Privacy": "Public",
      "Website": "",
      "Invitees": "",
      "Latitude": "42.27475",
      "Attendees": "",
      "Longitude": "-83.72904",
      "Organizer": "FIJI",
      "EndDayTime": "7/8/2021 19:30",
      "Description": "Come pregame with us before the game against Ohio State! \nThere will be food, drink, and plenty of chances to meet the \nbrothers of Phi Gamma Delta. We plan to have around 50\npeople at our tailgate, and you can find us by looking for the\npop-up tents labeled with our logo.",
      "LocationName": "FIJI House",
      "MainCategory": "Parties",
      "Registration": "",
      "StartDayTime": "7/8/2021",
      "InPersonVirtual": "In Person",
      "OtherCategories": "Greek Life Social Food/Drink "
    });

    const categories = [{name:'Extracurriculars', icon: require('../assets/club.png'), key:0,},
    {name:'Parties', icon: require('../assets/parties.png'),key:1,}, {name:'Social',icon: require('../assets/social.png'),key:2,},
    {name:'Career',icon: require('../assets/career.png'),key:3,}, {name:'Networking',icon: require('../assets/networking.png'),key:4,},
    {name:'Community',icon: require('../assets/community.png'),key:5,}, {name:'Fair/Festival',icon: require('../assets/festival.png'),key:6,}, 
    {name:'Greek Life',icon: require('../assets/greeklife.png'),key:7,}, {name:'Sports',icon: require('../assets/sports.png'),key:8,}, 
    {name:'Games',icon: require('../assets/games.png'),key:9,}, {name:'Cultural',icon: require('../assets/cultural.png'),key:10,}, 
    {name:'Activism',icon: require('../assets/activism.png'),key:11,}, {name:'Music',icon: require('../assets/music.png'),key:12,}, 
    {name:'Art/Design', icon: require('../assets/artdesign.png'),key:13,}, {name:'Food + Drink', icon: require('../assets/food.png'),key:14,}, 
    {name:'Performance', icon: require('../assets/performance.png'),key:15,}, {name:'Presentation', icon: require('../assets/presentation.png'),key:16,}, 
    {name:'Exhibition', icon: require('../assets/exhibition.png'),key:17,}, {name:'Academic', icon: require('../assets/academic.png'),key:18,},
    {name:'Science/Tech', icon: require('../assets/science.png'),key:19,}, {name:'Business/Professional', icon: require('../assets/business.png'),key:20,},
    {name:'Language/Literature', icon: require('../assets/language.png'),key:21,}, {name:'Religion', icon: require('../assets/religion.png'),key:22,},
    {name:'Other', icon: require('../assets/other.png'),key:23,}];

    const windowHeight = Dimensions.get('window').height;
    bs = React.createRef();
    fall = new Animated.Value(1);

    const renderCategories = () => {
      let pic = ""
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].name == currentEvent.MainCategory) {
          pic = categories[i].icon
        }
      }
      return (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={pic}
            style={{width:18, height: 18}}>
          </Image>
          <Text style={{marginLeft: 5}}>{currentEvent.MainCategory}</Text>
        </View>
      )
    }
    
    const registration = () => {
      if(currentEvent.Registration != '') {
        return (
          <View>
            <Text style={{fontWeight: 'bold'}}>Registration</Text>
            <Text>{currentEvent.Registration}</Text>
          </View>
        )
      }
    }

    const moreDetails = () => {
      if(currentEvent.Email != '' && currentEvent.Website != '') {
        return (
          <View>
            <Text style={{fontWeight: 'bold'}}>More Details</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Email: </Text>
              <Text>{currentEvent.Email}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Website: </Text>
              <Text>{currentEvent.Website}</Text>
            </View>
          </View>
        )
      } else if (currentEvent.Email != '') {
        return (
          <View>
            <Text style={{fontWeight: 'bold'}}>More Details</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Email: </Text>
              <Text>{currentEvent.Email}</Text>
            </View>
          </View>
        )
      } else if (currentEvent.Website != '') {
        return (
          <View>
            <Text style={{fontWeight: 'bold'}}>More Details</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Website: </Text>
              <Text>{currentEvent.Website}</Text>
            </View>
          </View>
        )
      }
    }

    const [buttonColor1, setButtonColor1] = useState('#D3D3D3')

    const toggle1 = () => {
      if (buttonColor1 == '#D3D3D3') {
        setButtonColor1('#FFCB05')
      } else {
        setButtonColor1('#D3D3D3')
      }
    }

    const [buttonColor2, setButtonColor2] = useState('#D3D3D3')

    const toggle2 = () => {
      if (buttonColor2 == '#D3D3D3') {
        setButtonColor2('#FFCB05')
      } else {
        setButtonColor2('#D3D3D3')
      }
    }

    const [buttonColor3, setButtonColor3] = useState('#D3D3D3')

    const toggle3 = () => {
      if (buttonColor3 == '#D3D3D3') {
        setButtonColor3('#FFCB05')
      } else {
        setButtonColor3('#D3D3D3')
      }
    }

    const [isTruncated, setIsTruncated] = useState(true);
    const resultString = isTruncated ? currentEvent.Description.slice(0, 133) : currentEvent.Description;
    const toggle = () => {
      setIsTruncated(!isTruncated);
    }

    const renderButton = () => {
      if (resultString.length > 130) {
        return (
          <TouchableOpacity onPress={toggle}>
            <Text style={{color: '#FFCB05', marginBottom: 10}}>Read More</Text>
          </TouchableOpacity>
        )
      }
    }
  
    renderInner = () => (
      <View style={styles.panel}>
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
          <View>
            <Text style={{
              fontSize: 24,
              width: Dimensions.get('window').width - 100,
              marginRight: 10    
              }} 
              numberOfLines={2}>
                {currentEvent.Name}
              </Text>
          </View>
          <View style={{backgroundColor: '#D3D3D3', borderRadius: 5, padding: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>{currentEvent.Privacy}</Text>
          </View>
          
        </View>
        <View style={styles.panelHost}>
          <Image
            source={require('../assets/Vector.png')}
            style={{width:18, height: 18}}>
          </Image>
          <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15}}>{currentEvent.Organizer}</Text>
          {renderCategories()}
        </View>
        <View style={styles.panelDate}>
          <Image
            source={require('../assets/CalendarIcon.png')}
            style={{width:18, height:18}}
          ></Image>
          <Text style={{marginLeft: 5}}>{currentEvent.StartDayTime}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 55 }}>
          <TouchableOpacity style={{backgroundColor: buttonColor1,
            borderRadius: 8,
            width: (Dimensions.get('window').width - 81.6) / 3,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 15,
            }}
            onPress={toggle1}>
            <View>
              <Image
                source={require('../assets/star.png')}
                style={{height:18, width: 18, alignSelf: 'center', tintColor: 'white'}}
              ></Image>
              <Text style={styles.panelButtonTitle}>Save</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: buttonColor2,
            borderRadius: 8,
            width: (Dimensions.get('window').width - 81.6) / 3,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 15,
            }}
            onPress={toggle2}>
            <View>
              <Image
                source={require('../assets/check2.png')}
                style={{height:18, width: 18, alignSelf: 'center', tintColor: 'white'}}
              ></Image>
              <Text style={styles.panelButtonTitle}>I'm Going</Text>
            </View>   
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: buttonColor3,
            borderRadius: 8,
            width: (Dimensions.get('window').width - 81.6) / 3,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 15,
            }}
            onPress={toggle3}>
            <View>
              <Image
                source={require('../assets/share2.png')}
                style={{height:18, width: 18, alignSelf: 'center', tintColor: 'white'}}
              ></Image>
              <Text style={styles.panelButtonTitle}>Share</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        
          <View>
            <Image source={require('../assets/avatar.jpeg')}
            resizeMode= 'cover'
            style={{width: Dimensions.get('window').width - 40.8, height: 200, marginBottom: 20}}>
            </Image>
          </View>
          <Text style={{fontWeight: 'bold'}}>Event Description</Text>
          <View>
            <Text>{resultString.replace(/(\r\n|\n|\r)/gm, " ")}</Text>
            {renderButton()}
          </View>
          <Text style={{fontWeight: 'bold'}}>Location</Text>
          <Text>{currentEvent.LocationName}</Text>
          <Text style={{marginBottom: Dimensions.get('window').height}}>{currentEvent.Address}</Text>
          {registration()}
          {moreDetails()}
        
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
            setCurrentEvent(event);
        }
        else if(snapPosition == 0) {
            myContext.toggleShowNavBar(false);
            bs.current.snapTo(1);
            setCurrentEvent(event);
            setSnapPosition(1);
        }
    }
    const [eventList,setEventList] = useState([]);

    const searchParams = {
      SearchType: navigation.getParam('SearchType','none'),
      SearchText: navigation.getParam('SearchText',''),
      Categories: navigation.getParam('Categories',[]),
      TimeRange: navigation.getParam('TimeRange',{startDate:'',endDate:'',duration:''}),
      OtherFilters: navigation.getParam('OtherFilters',[]),
      BotSheetInfo: navigation.getParam('BotSheetInfo',{snapPos:snapPosition}),
      CloseBotSheet: navigation.getParam('CloseBotSheet',false),
    }
    const getEvents = () => {
      console.log('fetching...');
      let fetchurl = Globals.eventsURL;
      fetch(fetchurl)
        .then((response) => response.json())
        .then((json) => {setEventList(json)})
        .catch((error) => console.error(error))
    }
    const [fetched,setFetched] = useState(false);
      useEffect(() => {
        console.log(searchParams);
        if(!fetched) {
          getEvents();
          setFetched(true);
        }
      
      if(searchParams.CloseBotSheet == true) {
        bs.current.snapTo(0);
      }    
      
      if(searchParams.SearchType == 'none') {
        if(snapPosition == 0)
          myContext.toggleShowNavBar(true);
        else
          myContext.toggleShowNavBar(false);
      } 
      else
        myContext.toggleShowNavBar(false);

    }, [navigation]);
    

    const matchesCriteria = (event) => {
      if(event.InPersonVirtual == 'In Person') { //first line of basic checks
        if(searchParams.SearchType == 'text') {
          if(event.Name == searchParams.SearchText)
            return true;
          return false;
        }
        else if(searchParams.SearchType == 'filter') {
          if(event.MainCategory == searchParams.Categories[0].name) {
            return true;
          }
          return false;
        }
        else { //searchtype == none
          return true;
        }
      }
      return false;
    }
    renderEvents = () => {
        return (
          eventList.map((item) => {
            if(matchesCriteria(item)) {
            return (
              <Marker key = {item.id}
              coordinate = {{latitude: parseFloat(item.Latitude), longitude: parseFloat(item.Longitude)}} 
              onPress = {() => openBottomSheet(item)}>
                <LocationPin title = {item.Name}/>
              </Marker>
            )
            }
          })
        )   
    }
    return (
        <View style = {styles.container}>
            <MapView style={styles.map}
            //provider = {PROVIDER_GOOGLE}
            //customMapStyle = {mapStyle}
            initialRegion = {{
            latitude: 42.278,
            longitude: -83.738,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
            }
            }
            showCompass = {false}     
            showsPointsOfInterest = {true}
            rotateEnabled = {false}  
            >
            {renderEvents()}
            
            {/*
            <MapView.Marker coordinate = {{latitude: 42.275200, longitude: -83.735474}}>
                <LocationCircle name = "Joe's Pizza"/>
            </MapView.Marker>
            */}
            
            </MapView>

        <View style={styles.topbar}>
                {searchParams.SearchType=='none'?<TopBar navigation = {navigation} searchDefaultParams = {searchParams}/>:
                <MapSearchBar navigation = {navigation} searchDefaultParams = {searchParams}/>}   
        </View> 

            <View style={styles.pullup}>
                <BottomSheet
                    ref={this.bs}
                    snapPoints={[0, 270, windowHeight - 50]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    initialSnap={0}
                    callbackNode={this.fall}
                    enabledGestureInteraction={true}
                    onCloseEnd={() => {setSnapPosition(0);if(searchParams.SearchType == 'none')myContext.toggleShowNavBar(true)}}
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
    OtherFilters: {
      screen: OtherFilters,
      navigationOptions: {
        headerShown: false
      },
    }
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
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
      marginRight: 10,
      width: Dimensions.get('window').width - 100    
    },
    panelHost: {
      flexDirection: 'row',
      marginBottom: 10
    },
    panelDate: {
      flexDirection: 'row',
      marginBottom: 20
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
})
