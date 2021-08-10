import React, {useState, useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, Image, Share} from 'react-native';
import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import TopBar from '../objects/topBar';
import MapSearchBar from '../objects/mapSearchBar';
import Search from './Search';
import CategoryList from './CategoryList';
import DateRange from './DateRange';
import TimeRange from './TimeRange';
import OtherFilters from './OtherFilters';
//import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import LocationPin from '../objects/locationPin';
import AppContext from '../objects/AppContext';
import Globals from '../../GlobalVariables';
import ProfileButton from '../objects/searchResults';

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
      "name": "OSU Pregame Tailgate",
      "Tags": "",
      "Email": "",
      "Avatar": "",
      "Images": "",
      "location": "1520 S University Ave, Ann Arbor, MI 48104",
      "privateEvent": "Public",
      "organizerWebsite": "",
      "Invitees": "",
      "latitude": "42.27475",
      "Attendees": "",
      "longitude": "-83.72904",
      "organizer": "FIJI",
      "endTime": "7/8/2021 19:30",
      "description": "Come pregame with us before the game against Ohio State! \nThere will be food, drink, and plenty of chances to meet the \nbrothers of Phi Gamma Delta. We plan to have around 50\npeople at our tailgate, and you can find us by looking for the\npop-up tents labeled with our logo.",
      "locationName": "FIJI House",
      "mainCategoryIdId": "Parties",
      "registrationLink": "",
      "startTime": "7/8/2021",
      "virtualEvent": "In Person",
      "categoryIds": "Greek Life Social Food/Drink "
    });
    const inPerson = [{name:'In Person', icon: require('../assets/person.png'), ket: 0,},
    {name:'Virtual', icon: require('../assets/virtual.png'), key: 1}]

    const windowHeight = Dimensions.get('window').height;
    bs = React.createRef();
    bs2 = React.createRef();
    fall = new Animated.Value(1);
    

    const renderCategories = () => {
      let pic = ""
      for (let i = 0; i < inPerson.length; i++) {
        if (inPerson[i].name == currentEvent.virtualEvent) {
          pic = inPerson[i].icon
        }
      }
      return (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={pic}
            style={{width:18, height: 18, tintColor: 'orange'}}>
          </Image>
          <Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: 'orange'}}>{currentEvent.virtualEvent}</Text>
        </View>
      )
    }
    const registration = () => {
      if(currentEvent.registrationLink != '') {
        return (
          <View>
            <Text style={{fontWeight: 'bold'}}>Registration</Text>
            <Text>{currentEvent.registrationLink}</Text>
          </View>
        )
      }
    }
    const moreDetails = () => {
      if(currentEvent.Email != '' && currentEvent.organizerWebsite != '') {
        return (
          <View>
            <Text style={{fontWeight: 'bold'}}>More Details</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Email: </Text>
              <Text>{currentEvent.Email}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Website: </Text>
              <Text>{currentEvent.organizerWebsite}</Text>
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
      } else if (currentEvent.organizerWebsite != '') {
        return (
          <View>
            <Text style={{fontWeight: 'bold'}}>More Details</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Website: </Text>
              <Text>{currentEvent.organizerWebsite}</Text>
            </View>
          </View>
        )
      }
    }

    const [buttonColor1, setButtonColor1] = useState('#FFF')
  
      const toggle1 = () => {
        if (buttonColor1 == '#FFF') {
          setButtonColor1('#FFCB05')
        } else {
          setButtonColor1('#FFF')
        }
      }
  
      const [buttonColor2, setButtonColor2] = useState('#FFF')
  
      const toggle2 = () => {
        if (buttonColor2 == '#FFF') {
          setButtonColor2('#FFCB05')
        } else {
          setButtonColor2('#FFF')
        }
      }
      const share = async () => {
        Share.share(
          {
            title: 'test title',
            url: 'fakeurl',
          },
          {
            excludedActivityTypes: [
              // 'com.apple.UIKit.activity.PostToWeibo',
            ],
          }
        );
      };
  
      const [buttonColor3, setButtonColor3] = useState('#FFF')
      const toggle3 = () => {
        share();
      }
    const borderColor = (buttonColor) => {
      if (buttonColor == '#FFF') {
        return 'black'
      } else {
        return 'white'
      }
    }

    const [isTruncated, setIsTruncated] = useState(true);
    const resultString = isTruncated ? currentEvent.description.slice(0, 133) : currentEvent.description;
    const readMore = isTruncated ? 'Read More' : 'Read Less'
    const toggle = () => {
      setIsTruncated(!isTruncated);
    }
    const renderButton = () => {
      if (resultString.length > 130) {
        return (
          <TouchableOpacity onPress={toggle}>
            <Text style={{color: '#FFCB05', marginBottom: 10}}>{readMore}</Text>
          </TouchableOpacity>
        );
      }
    }

    const renderTime = () => {
      if (currentEvent.startTime.split(' ')[0] == currentEvent.endTime.split(' ')[0]) {
        return currentEvent.startTime + ' - ' + currentEvent.endTime.split(' ')[1]
      }
      else {
        return currentEvent.startTime + ' - ' + currentEvent.endTime
      }
    }
    renderInner = () => (
      <View style={styles.panel}>
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
          <View>
            <Text style={{
              fontSize: 24,
              width: Dimensions.get('window').width - 105,
              marginRight: 10    
              }} 
              numberOfLines={2}>
                {currentEvent.name}
              </Text>
          </View>
          <View style={{borderRadius: 5, borderWidth: 1, borderColor: 'black', padding: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'black'}}>{currentEvent.privateEvent}</Text>
          </View>
          
        </View>
        <View style={styles.panelHost}>
          <Image
            source={require('../assets/Vector.png')}
            style={{width:18, height: 18}}>
          </Image>
          <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15, fontSize: 16, fontWeight: 'bold', color: 'orange'}}>{currentEvent.organizer}</Text>
          {renderCategories()}
        </View>
        <View style={styles.panelDate}>
          <Image
            source={require('../assets/CalendarIcon.png')}
            style={{width:18, height:18}}
          ></Image>
          <Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: '#03a9f4'}}>{renderTime()}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
          <TouchableOpacity style={{backgroundColor: buttonColor1,
            borderRadius: 8,
            borderColor: borderColor(buttonColor1),
            borderWidth: 1,
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
                style={{height:18, width: 18, alignSelf: 'center', tintColor: borderColor(buttonColor1)}}
              ></Image>
              <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: borderColor(buttonColor1),
              }}>Save</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: buttonColor2,
            borderRadius: 8,
            borderColor: borderColor(buttonColor2),
            borderWidth: 1,
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
                style={{height:18, width: 18, alignSelf: 'center', tintColor: borderColor(buttonColor2)}}
              ></Image>
              <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: borderColor(buttonColor2),
              }}>I'm Going</Text>
            </View>   
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: buttonColor3,
            borderRadius: 8,
            borderColor: borderColor(buttonColor3),
            borderWidth: 1,
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
                style={{height:18, width: 18, alignSelf: 'center', tintColor: borderColor(buttonColor3)}}
              ></Image>
              <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: borderColor(buttonColor3),
              }}>Share</Text>
            </View>
          </TouchableOpacity>
        </View>
          <View>
            <Image source={require('../assets/avatar.jpeg')}
            resizeMode= 'cover'
            style={{width: Dimensions.get('window').width - 40.8, height: 200, marginBottom: 20}}>
            </Image>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>Event Description</Text>
          <View>
            <Text style={{marginBottom: 5}}>{resultString.replace(/(\r\n|\n|\r)/gm, " ")}</Text>
            {renderButton()}
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>Location</Text>
          <Text>{currentEvent.locationName}</Text>
          <Text style={{marginBottom: 10}}>{currentEvent.location}</Text>
          {registration()}
          {moreDetails()}
          
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/CalendarIcon.png')}
                style={{width:18, height: 18, marginBottom: 5}}>
              </Image>
              <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15, fontSize: 16, color: '#03a9f4'}}>Add Event to Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/report.png')}
                style={{width:18, height: 18, tintColor: 'red', marginBottom: Dimensions.get('window').height}}>
              </Image>
              <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15, fontSize: 16, color: 'red'}}>Report</Text>
            </TouchableOpacity>
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

    renderInner2 = () => (
      <View style={{backgroundColor: '#fff'}}>
        <ProfileButton title = 'ALEX IS A NERD' location = ''/>
        <ProfileButton title = 'ALEX IS A NERD' location = ''/>
        <ProfileButton title = 'ALEX IS A NERD' location = ''/>
        <ProfileButton title = 'ALEX IS A NERD' location = ''/>
        <ProfileButton title = 'ALEX IS A NERD' location = ''/>
        <View style={{backgroundColor: '#fff', marginBottom: windowHeight}}></View>
      </View>
    )
    
    renderHeader2 = () => (
      <View style={{backgroundColor: '#fff',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -2},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20}}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity style={{width: 80}}>
              <Text style={{fontWeight: 'bold', color: 'red', fontSize: 16, marginRight: 25, marginBottom: 25}}>CLEAR</Text>
            </TouchableOpacity>
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

    const [snapPosition2,setSnapPosition2] = useState(0);
    
    const openBottomSheet2 = () => {
        if(snapPosition2 == 1) {
            
        }
        else if(snapPosition2 == 0) {
            myContext.toggleShowNavBar(false);
            bs2.current.snapTo(1);
            setSnapPosition2(1);
        }
    }
    const [eventList,setEventList] = useState([]);
    //const [searchResults,setSearchResults] = useState([]);
    //each time search is called change the searchResults list, not the main one, that way it's fast to revert back on clear
    const searchParams = {
      SearchType: navigation.getParam('SearchType','none'),
      SearchText: navigation.getParam('SearchText',''),
      Categories: navigation.getParam('Categories',[]),
      TimeRange: navigation.getParam('TimeRange',{startDate:'',endDate:'',startTime:'',endTime:'',value:'Anytime'}),
      OtherFilters: navigation.getParam('OtherFilters',[]),
      BotSheetInfo: navigation.getParam('BotSheetInfo',{snapPos:snapPosition}),
      CloseBotSheet: navigation.getParam('CloseBotSheet',false),
    };
    const getEvents = () => {
      console.log('fetching...');
      let fetchurl = Globals.eventsURL;
      fetch(fetchurl)
        .then((response) => response.json())
        .then((json) => {console.log(json);setEventList(json)})
        .catch((error) => console.error(error))
    }
    const [fetched,setFetched] = useState(false);
    useEffect(() => {
        console.log(searchParams);

        //if(!fetched) {
          getEvents();
          setFetched(true);
        //}

    if(searchParams.CloseBotSheet == true) {
      bs.current.snapTo(0);
    }    
    
    if(snapPosition == 0)
      myContext.toggleShowNavBar(true);
    else
      myContext.toggleShowNavBar(false);
       

    }, [navigation]);
    
    const matchesCriteria = (event) => {
      if(event.virtualEvent == 'In Person') { //first line of basic checks
        if(searchParams.SearchType == 'text') {
          if(event.name == searchParams.SearchText)
            return true;
          return false;
        }
        else if(searchParams.SearchType == 'filter') {
          if(searchParams.Categories.length>0 && event.mainCategoryId == searchParams.Categories[0].name) {
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
        //if there is a search then return searchResults.map(...)
        return (
          eventList.map((item) => {
            if(matchesCriteria(item)) {
            return (
              <Marker key = {item.id}
              coordinate = {{latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)}} 
              onPress = {() => openBottomSheet(item)}>
                <LocationPin title = {item.name}/>
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
            <Marker
            coordinate = {{latitude: 42.276200, longitude: -83.735474}}
            onPress = {() => openBottomSheet2()}
            >
              <LocationPin title = "lmfao another bottomsheet"/>
            </Marker>
            <Marker key = '100'
            coordinate = {{latitude: 42.275200, longitude: -83.735474}}
            onPress = {() => {console.log('pressed');searchParams.Categories.length = 0;navigation.navigate('MainScreen',searchParams)}}>
                <LocationPin title = "Clear Search From Outside"/>
            </Marker>
            
            </MapView>

        <View style={styles.topbar}>
                <MapSearchBar navigation = {navigation} searchDefaultParams = {searchParams}/>
        </View> 

        <View style={styles.pullup}>
            <BottomSheet
                ref={this.bs}
                snapPoints={[0, 260, windowHeight - 100]}
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
        <View style={styles.pullup}>
            <BottomSheet
                ref={this.bs2}
                snapPoints={[0, windowHeight - 160, 70]}
                renderContent={this.renderInner2}
                renderHeader={this.renderHeader2}
                initialSnap={0}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
                onCloseEnd={() => {setSnapPosition2(0);myContext.toggleShowNavBar(true)}}
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
    Search: {
        screen: Search,
        navigationOptions: {
            headerShown: false,
        },
        mode: 'modal'
    },
    CategoryList: {
        screen: CategoryList,
        navigationOptions: {
            headerShown: false,
        },
    },
    DateRange: {
      screen: DateRange,
      navigationOptions: {
        headerShown:false,
      }
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
const FindNavigator = createStackNavigator(screens,{mode: 'modal'});

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
        top: 0,
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
