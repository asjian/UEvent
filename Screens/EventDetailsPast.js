import React, {useState, useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, Image, SafeAreaView} from 'react-native';
import Animated from 'react-native-reanimated';
import BackButton from '../objects/backButton';
import Globals from '../../GlobalVariables';
import AppContext from '../objects/AppContext';


export default function EventDetailsScreenPast({navigation, route}) {
      // const user = navigation.getParam('user');
      // const currentEvent = navigation.getParam('event');
      const myContext = useContext(AppContext);
      const { user } = route.params;
      const { currentEvent } = route.params;
      const renderCategories = () => {
        let pic = "";
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

      const renderButtons = () => {
        let yes = true;
        /* CHECK IF USER IS ORGANIZER
        for (let i = 0; i < user.EventsHosting.split(" ").length; i++) {
          if (eventId == user.EventsHosting.split(" ")[i]) {
            yes = true;
          }
        }
        */
        console.log('current event: ')
        console.log(currentEvent);
        if (user.id == currentEvent.host.id) {
          return (
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
              // onPress={() => navigation.navigate('Manage Event', { screen: 'Manage Event', params: {item: currentEvent} })}
              >
              <View>
                <Image
                  source={require('../assets/attendees.png')}
                  style={{height:18, width: 18, alignSelf: 'center', tintColor: borderColor(buttonColor1)}}
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
              // onPress={() => navigation.navigate('InviteScreen',{event:currentEvent})}
              >
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
                // onPress={toggle3}
                >
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
          )
        }
        else {
          return (
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
          )
        }
      }

  return (
    <SafeAreaView style={{
      flex: 1,
      position: 'absolute',
      backgroundColor: '#fff'
      }}>
      <View style={{width: '90%',
      marginLeft: 20.4}}>
        <BackButton onPress={() => {navigation.goBack();myContext.toggleShowNavBar(true)}} title = 'Event Details'/>
      </View> 
      <ScrollView style={styles.panel}>
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
        {renderButtons()}
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
      </ScrollView>
    </SafeAreaView>
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
