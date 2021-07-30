import React, {useState, useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, Image, SafeAreaView} from 'react-native';

export default function EventDetailsScreen({navigation}) {
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

      const parseDate = () => {
        
      }
    return (
      <SafeAreaView>
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
          <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15, fontSize: 16, color: 'orange'}}>{currentEvent.Organizer}</Text>
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
