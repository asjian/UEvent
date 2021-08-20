import React, {useState, useContext, useEffect,useRef} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, Image, Share, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MapSearchBar from '../objects/mapSearchBar';
import CategoryList from './CategoryList';
import DateRange from './DateRange';
import TimeRange from './TimeRange';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import LocationPin from '../objects/locationPin';
import AppContext from '../objects/AppContext';
import Globals from '../../GlobalVariables';
import SearchResult from '../objects/searchResult';
import EventDetailsScreen from './EventDetailsScreen';
import ManageEventStack from './ManageEvent';
import InviteScreen from './InviteScreen';
import InvitePeopleScreen from './InvitePeopleScreen';
import AddMoreScreen from './AddMoreScreen';
import InviteListView from './InviteListView';
import CreateInviteList from './CreateInviteList';

//custom bottom sheet
function MainScreen({navigation, route}) {
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
    const serverValidation = (response) => { //only use on messages, not jsons
      if(response != 'Fail' && response != 'Validation Error')
        return true;
      return false;
    }
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
      "mainCategoryId": "Parties",
      "registrationLink": "",
      "startTime": "7/8/2021",
      "virtualEvent": "In Person",
      "categoryIds": "Greek Life Social Food/Drink ",
      "host": {
        "id": -1,
      }
    });
    const[index,setIndex] = useState(-1);
    const windowHeight = Dimensions.get('window').height;
    const bs = useRef();
    const bs2 = useRef();
    const mapRef = useRef(null);
    const fall = new Animated.Value(1);
    const fall2 = new Animated.Value(1);
    
    const renderCategories = () => {

      return (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={currentEvent.virtualEvent?require('../assets/virtual.png'):require('../assets/person.png')}
            style={{width:18, height: 18, tintColor: 'orange'}}>
          </Image>
          <Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: 'orange'}}>{currentEvent.virtualEvent?"Virtual":"In Person"}</Text>
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
    const buttonColor1 = currentEvent.isFollower?'#FFCB05':'#FFF';

    const modifyApi = (follow,add) => {
      const fetchurl = follow?Globals.followersURL:Globals.attendeesURL;

      if(add) {
        fetch(fetchurl + '/json/add', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: myContext.user.id,
              eventId: currentEvent.id,
            })
        }).then((response) => response.json())
          .then((json) => {
            if(index != -1) {
              let temp = [...myContext.eventList];
              if(follow)
                temp[index] = JSON.parse(JSON.stringify({...currentEvent,...{isFollower:true}}));
              else
                temp[index] = JSON.parse(JSON.stringify({...currentEvent,...{isAttendee:true}}));
              myContext.updateEventList(temp);
            }
            setCurrentEvent((prevCurrentEvent) => { //server validation is checked by converting to json and catching error
            if(follow)
              return({...prevCurrentEvent,...{isFollower:true}})
            else 
              return ({...prevCurrentEvent,...{isAttendee:true}})
            })     
          }
          )
          .catch((error) => Alert.alert('Server Error',"Sorry, we're unable to process your request. Please try again later :(")); 
      }
      else { //delete
        fetch(fetchurl + '/delete?eventId=' + currentEvent.id + '&userId=' + myContext.user.id, {
          method: 'delete',
        }
        ).then((response) => {
          if(serverValidation(response)) {
            if(index != -1) {
              let temp = [...myContext.eventList];
              if(follow)
                temp[index] = JSON.parse(JSON.stringify({...currentEvent,...{isFollower:false}}));
              else
                temp[index] = JSON.parse(JSON.stringify({...currentEvent,...{isAttendee:false}}));
              myContext.updateEventList(temp);
            }
            setCurrentEvent((prevCurrentEvent) => {
              if(follow)
                return({...prevCurrentEvent,...{isFollower:false}})
              else
                return ({...prevCurrentEvent,...{isAttendee:false}})
            })  
          }
          })
         .catch((error) => Alert.alert('Server Error',"Sorry, we're unable to process your request. Please try again later :("));
      }
    }
      const toggle1 = () => {
        if (buttonColor1 == '#FFF') {
          modifyApi(true,true);
        } 
        else {
          modifyApi(true,false);
        }
      }
      const buttonColor2 = currentEvent.isAttendee?'#FFCB05':'#FFF';
  
      const toggle2 = () => {
        if (buttonColor2 == '#FFF') {
          modifyApi(false,true);
        } else {
          modifyApi(false,false);
        }
      }
      const onShare = async () => {
        try {
          const result = await Share.share({
           title: 'Event Link',
            message: 'Check out this event!', 
            url: 'https://www.espn.com/'
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
      }
    }

  
      const [buttonColor3, setButtonColor3] = useState('#FFF')
      const toggle3 = () => {
        onShare();
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
      return Globals.formatDate(currentEvent.startTime) + ' - ' + Globals.formatDate(currentEvent.endTime);
    }
    const renderInner = () => (

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
            <Text style={{color: 'black'}}>{currentEvent.privateEvent?"Private":"Public"}</Text>
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
       
        {myContext.user.id != currentEvent.host.id?
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
                style={{height:19, width: 18.2, alignSelf: 'center', tintColor: borderColor(buttonColor2)}}
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
                style={{height:21, width: 16, alignSelf: 'center', tintColor: borderColor(buttonColor3)}}
              ></Image>
              <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: borderColor(buttonColor3),
              }}>Share</Text>
            </View>
          </TouchableOpacity>
        </View>:
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20}}>
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
              onPress={() => {navigation.navigate('Manage Event', { screen: 'Manage Event', params: {item: currentEvent} })}}>
              <View>
                <Image
                  source={require('../assets/manage.png')}
                  style={{height:18, width: 21.5, alignSelf: 'center', tintColor: borderColor(buttonColor1)}}
                ></Image>
                <Text style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: borderColor(buttonColor1),
                }}>Manage</Text>
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
              onPress={() => navigation.navigate('InviteScreen',{event:currentEvent})}>
              <View>
                <Image
                  source={require('../assets/invitation.png')}
                  style={{height:18, width: 18, alignSelf: 'center', tintColor: borderColor(buttonColor3)}}
                ></Image>
                <Text style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: borderColor(buttonColor3),
                }}>Invite</Text>
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
                style={{height:21, width: 16, alignSelf: 'center', tintColor: borderColor(buttonColor3)}}
              ></Image>
              <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: borderColor(buttonColor3),
              }}>Share</Text>
            </View>
          </TouchableOpacity>
            
            </View>
        }
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
    
    const renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle}>
            </View>
          </View>
        </View>
    );
    const renderInner2 = () => (
      <View style={{backgroundColor: 'white'}}>
        {myContext.eventList.map((item,index) => {
            return (
              <View key = {item.id} style = {{marginTop: 10,}}>
                <SearchResult onPress = {() => {
                  bs2.current.snapTo(0);
                  setSnapPosition2(0);
                  mapRef.current.animateToRegion({latitude: item.latitude, longitude: item.longitude, latitudeDelta: 0.005, longitudeDelta: 0.0025},500);
                  openBottomSheet(item,index);
                }} 
                  title = {item.name} location = {item.locationName} 
                  time = {Globals.formatDate(item.startTime) + ' - ' + Globals.formatDate(item.endTime)}/>
              </View>
            )
          })}
        <Text style = {{marginBottom: Dimensions.get('window').height,}}></Text>
      </View>
    )
    
    const renderHeader2 = () => (
      <View style={{backgroundColor: '#fff',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -2},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex:1,}}>
          <View style={{flexDirection: 'row'}}>
            <Text style = {{fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10, marginBottom: 15,}}>Search Results</Text>
            <TouchableOpacity style={{width: 80, marginLeft: 210,}} 
              onPress = {() => {
                searchParams.SearchType = 'none'; searchParams.SearchText = ''; myContext.changeMapSearchText('');
                searchParams.Categories.length = 0; searchParams.TimeRange.startTime = ''; searchParams.TimeRange.endTime = ''; 
                searchParams.TimeRange.value = 'Anytime'; bs2.current.snapTo(0);setSnapPosition2(0); myContext.toggleShowNavBar(true);
                navigation.navigate('MainScreen',searchParams)}
              }>
              <Text style={{fontWeight: 'bold', color: 'red', fontSize: 16, marginBottom: 15,}}>CLEAR</Text>
            </TouchableOpacity>
          </View>
            
      </View>
  );
    const [latDelta, setLatDelta] = useState(0.015);
    const [longDelta, setLongDelta] = useState(latDelta/2);
    
    const [snapPosition,setSnapPosition] = useState(0);
    
    const openBottomSheet = (event,index) => {
        console.log(event);
        if(snapPosition == 1) {
            setCurrentEvent(event);
            setIndex(index);
        }
        else if(snapPosition == 0) {
            myContext.toggleShowNavBar(false);
            bs.current.snapTo(1);
            setCurrentEvent(event);
            setIndex(index);
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
    //const [eventList,setEventList] = useState([]);
    /*const searchParams = {
      SearchType: navigation.getParam('SearchType','none'),
      SearchText: navigation.getParam('SearchText',''),
      Categories: navigation.getParam('Categories',[]),
      TimeRange: navigation.getParam('TimeRange',{startTime:'',endTime:'',value:'Anytime'}),
      OtherFilters: navigation.getParam('OtherFilters',[]),
      BotSheetInfo: navigation.getParam('BotSheetInfo',{snapPos:snapPosition}),
      CloseBotSheet: navigation.getParam('CloseBotSheet',false),
      CloseBotSheet2: navigation.getParam('CloseBotSheet2',false),
    };*/
    const searchParams = route.params;

    const getEvents = () => { //gets ONLY eventId, name, lat, lng, virtualEvent, and mainCategoryId,  

      if(searchParams.SearchType == 'none') {
        console.log('fetching all active events (no search)...');
        let fetchurl = Globals.eventsURL + '/active/' + myContext.user.id;
        //let fetchurl = Globals.eventsURL;
        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {myContext.updateEventList(json)})
          .catch((error) => console.error(error));
      }

      else if(searchParams.SearchType == 'text') {
        console.log('fetching events matching keyword search...');
        let fetchurl = Globals.eventsURL + '/search/active?keyword=' + searchParams.SearchText 
        +'&userId=' + myContext.user.id;

        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {myContext.updateEventList(json);
                if(json.length == 1) {
                  mapRef.current.animateToRegion({latitude:json[0].latitude,longitude:json[0].longitude,latitudeDelta:0.005,longitudeDelta:0.0025})
                }
                else if (json.length > 1) {
                  let coordarray = [];
                  for(let i=0;i<json.length;i++) {
                    coordarray.push({latitude:json[i].latitude, longitude:json[i].longitude})
                  }
                  mapRef.current.fitToCoordinates(coordarray,{animted:true})
                }
          })
          .catch((error) => console.error(error));
      }

      else if(searchParams.SearchType == 'filter') {
        console.log('fetching events matching filters...');
        let fetchurl = Globals.eventsURL;

        if(searchParams.Categories.length ==0 && searchParams.TimeRange.value == 'Anytime') //no search...
            fetchurl +=  '/active/' + myContext.user.id;

        else if(searchParams.Categories.length==0) { //date range only
          fetchurl += '/search/timeRange?startTime=' + searchParams.TimeRange.startTime + 
          '&endTime=' + searchParams.TimeRange.endTime + '&userId=' + myContext.user.id;
        }
        else if(searchParams.TimeRange.value == 'Anytime') { //categories only
          let catString = '';
          for(let i=0;i<searchParams.Categories.length;i++) {
            catString += searchParams.Categories[i].id + ',';
          }
          catString = catString.slice(0,-1);
          fetchurl += '/search/category?catIds=' + catString + '&userId=' + myContext.user.id;
        }
        else { //both - tricky
          let catString = '';
          for(let i=0;i<searchParams.Categories.length;i++) {
            catString += searchParams.Categories[i].id + ',';
          }
          catString = catString.slice(0,-1);
          fetchurl += '/search/categoryAndDate?catIds=' + catString + '&startTime=' + searchParams.TimeRange.startTime + 
          '&endTime=' + searchParams.TimeRange.endTime + '&userId=' + myContext.user.id;
        }
        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {myContext.updateEventList(json)})
          .catch((error) => console.error(error));
      }
    }
    /*
    const putBackEvent = (postedEvent) => { //for animation purposes
      console.log('event to be adjusted: ')
      console.log(postedEvent);
      const adjustedEvent = {...postedEvent,...
         {
             mainCategory: (Globals.categories.find((cat) => {return cat.id == postedEvent.mainCategoryId})).name,
             isFollower: false, 
             isAttendee: true,
             isInvitee: false,
         }
      }
      myContext.updateEventList([adjustedEvent,...myContext.eventList])
    }
    */
   const findIsFocused = useIsFocused();

    useEffect(() => {
      if(findIsFocused) {
        console.log(searchParams);
        getEvents();
      }  
      if(findIsFocused && myContext.postedEvent.inUse) {
          mapRef.current.animateToRegion({
          latitude: myContext.postedEvent.latitude, 
          longitude: myContext.postedEvent.longitude,
          latitudeDelta: 0.005, 
          longitudeDelta: 0.0025,
        }, 1000);

        console.log('opening bottom sheet for posted event');
        openBottomSheet(myContext.postedEvent,-1) //this index is bullshit but I think i can get away with it because index is only needed for saving/going to events
        myContext.changePostedEvent({inUse:false})
      }
    
      else {
        if(findIsFocused) {
        if(searchParams.CloseBotSheet == true) {
          bs.current.snapTo(0);
          searchParams.CloseBotSheet = false;
        }    
        if(searchParams.CloseBotSheet2 == true) { //only true if no search
          bs2.current.snapTo(0);
          setSnapPosition2(0);
          searchParams.CloseBotSheet2 = false;
        }
        if(searchParams.SearchType != 'none') {
          openBottomSheet2();
        }
        if(snapPosition == 0 && searchParams.SearchType == 'none')
          myContext.toggleShowNavBar(true);
        else
          myContext.toggleShowNavBar(false);
      }
      }
       
    }, [navigation,route,findIsFocused]);
    
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

    const renderEvents = () => {
        //if there is a search then return searchResults.map(...)
        return (
          myContext.eventList.map((item,index) => {
            //if(matchesCriteria(item)) {
            if(!item.name || !item.id || !item.latitude || !item.longitude || !item.mainCategory) {
              Alert.alert("UH OH!!! SOMETHING IS WRONG WITH THE EVENT BEING RENDERED");
              console.log(item.name);
              console.log(item.id);
              console.log(item.latitude);
              console.log(item.longitude);
              console.log(item.mainCategory);
            }
            return (
              <Marker key = {item.id}
              coordinate = {{latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)}} 
              onPress = {() => openBottomSheet(item,index)}>
                <LocationPin title = {item.name} mainCategory = {item.mainCategory}/>
              </Marker>
            )
            //}
          })
        )   
    }
    return (
        <View style = {styles.container}>
            <MapView style={styles.map}
            //provider = {PROVIDER_GOOGLE}
            //customMapStyle = {mapStyle}
            ref = {mapRef}
            initialRegion = {{
            latitude: 42.278,
            longitude: -83.738,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
            }}
            showCompass = {false}     
            showsPointsOfInterest = {true}
            rotateEnabled = {false}  
            >
            {renderEvents()}      
            </MapView>

        <View style={styles.topbar}>
                <MapSearchBar navigation = {navigation} route = {route} searchDefaultParams = {searchParams}/>
        </View> 
        <View style={styles.pullup}>
            <BottomSheet
                ref={bs2}
                snapPoints={[searchParams.SearchType=='none'?0:50, 240, windowHeight - 75]}
                renderContent={renderInner2}
                renderHeader={renderHeader2}
                initialSnap={0}
                callbackNode={fall2}
                enabledGestureInteraction={true}
                onCloseEnd={() => {setSnapPosition2(0)}} //this time, the navbar is taken care of in the clear button onPress
            />
            <Animated.View style={{margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall2, 1.0)),
            }}>
            </Animated.View>   
        </View>
        <View style={styles.pullup}>
            <BottomSheet
                ref={bs}
                snapPoints={[0, 280, windowHeight - 50]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={0}
                callbackNode={fall}
                enabledGestureInteraction={true}
                onCloseEnd={() => {
                  setSnapPosition(0);
                  if(searchParams.SearchType == 'none')
                    myContext.toggleShowNavBar(true);          
                }}
            />
            <Animated.View style={{margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
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
}
//const FindNavigator = createStackNavigator(screens,{mode: 'modal'});
//const FindContainer = createAppContainer(FindNavigator);
const FindNavigator = createStackNavigator();

export default function FindScreen() {
    return (
        <FindNavigator.Navigator>
            <FindNavigator.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} initialParams = {{
                    SearchType: 'none',
                    SearchText: '',
                    Categories: [],
                    TimeRange: {startTime:'',endTime:'',value:'Anytime'},
                    OtherFilters: [],
                    CloseBotSheet: false,
                    CloseBotSheet2: false,
            }}/>
            <FindNavigator.Screen name="CategoryList" component={CategoryList} options={{ headerShown: false }} />
            <FindNavigator.Screen name="DateRange" component={DateRange} options={{ headerShown: false }} />
            <FindNavigator.Screen name="TimeRange" component={TimeRange} options={{ headerShown: false }} />
            <FindNavigator.Screen name="EventDetailsScreen" component={EventDetailsScreen} options={{ headerShown: false }} />
            <FindNavigator.Screen name="Manage Event" component={ManageEventStack} options={{ headerShown: false }} />
            <FindNavigator.Screen name="InviteScreen" component={InviteScreen} options={{ headerShown: false }} />
            <FindNavigator.Screen name='InvitePeopleScreen' component={InvitePeopleScreen} options={{ headerShown: false }}/>
            <FindNavigator.Screen name='InviteListView' component={InviteListView} options={{ headerShown: false }}/>
            <FindNavigator.Screen name='CreateInviteList' component={CreateInviteList} options={{ headerShown: false }}/>
            <FindNavigator.Screen name='AddMoreScreen' component={AddMoreScreen} options={{ headerShown: false }}/>
        </FindNavigator.Navigator>
    );
        /*
    const myContext = useContext(AppContext);
    const [fetched, setFetched] = useState(false);
    const isFocused = useIsFocused();
    useFocusEffect(
      React.useCallback(() => {
        if(!fetched) {
          console.log('refreshing event list');
          let fetchurl = Globals.eventsURL + '/active/' + myContext.user.id;
          setFetched(true);
          fetch(fetchurl)
            .then((response) => response.json())
            .then((json) => {myContext.updateEventList(json)})
            .catch((error) => {Alert.alert('Unable to fetch events',"Sorry, something isn't working with our server calls :(");
              });
        }

        const unsubscribe = () => {
          if(!isFocused && fetched) {
            setFetched(false);
          }
        }
        return () => unsubscribe();
    })        
    )
    */
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
