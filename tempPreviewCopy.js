const Preview = ({ route, navigation }) => {
    const { values } = route.params;
    const myContext = useContext(AppContext);
    console.log(values);
    // Helper functions
    const inPerson = [{name:'In Person', icon: require('../assets/person.png'), ket: 0,},
    {name:'Virtual', icon: require('../assets/virtual.png'), key: 1}]

   

    const renderCategories = () => {
        let pic = ""
        for (let i = 0; i < inPerson.length; i++) {
          if (inPerson[i].name == values.InPerson) {
            pic = inPerson[i].icon
          }
        }
        return (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={pic}
              style={{width:18, height: 18, tintColor: 'orange'}}>
            </Image>
            <Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: 'orange'}}>{values.InPerson}</Text>
          </View>
        )
      }

      const registration = () => {
        if(values.Registration != '') {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>Registration</Text>
              <Text>{values.Registration}</Text>
            </View>
          )
        }
      }
      const moreDetails = () => {
        if(values.OrganizerEmail != '' && values.OrganizerWebsite != '') {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>More Details</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>Email: </Text>
                <Text>{values.OrganizerEmail}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>Website: </Text>
                <Text>{values.OrganizerWebsite}</Text>
              </View>
            </View>
          )
        } else if (values.OrganizerEmail != '') {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>More Details</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>Email: </Text>
                <Text>{values.OrganizerEmail}</Text>
              </View>
            </View>
          )
        } else if (values.OrganizerWebsite != '') {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>More Details</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>Website: </Text>
                <Text>{values.OrganizerWebsite}</Text>
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
    
        const [buttonColor3, setButtonColor3] = useState('#FFF')
        const toggle3 = () => {
          
        }
      const borderColor = (buttonColor) => {
        if (buttonColor == '#FFF') {
          return 'black'
        } else {
          return 'white'
        }
      }
  
      const [isTruncated, setIsTruncated] = useState(true);
      const resultString = isTruncated ? values.EventDescription.slice(0, 133) : values.EventDescription;
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
        if (values.StartDay == values.EndDay) {
          return values.StartDay + ' - ' + values.EndTime
        }
        else {
          return values.StartTime + ' - ' + values.EndTime
        }
      }
      const handleNavigation = (postedEvent) => {
          myContext.changePostedEvent({...postedEvent,...{inUse:true}});
          navigation.popToTop();
          navigation.dangerouslyGetParent().popToTop();                  
          navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('Find');
      }
    const postToServer = () => { //post the event to the server
        fetch(Globals.eventsURL + '/json/add', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.EventTitle,
                location: values.Address,
                locationName: values.LocationName,
                locationDetails: values.LocationDetails,
                description: values.EventDescription,
                privateEvent: values.Privacy!='Public',
                virtualEvent: values.InPerson!='In Person',
                coordinates: [{longitude:values.Longitude,latitude:values.Latitude}],
                registrationLink: values.Registration,
                organizer: values.OrganizerName,
                organizerWebsite: values.OrganizerWebsite,
                //startTime: "2021-08-09 20:00:00",
                startTime: values.RealStartDateTime.toISOString().substr(0,10) + ' ' + values.RealStartDateTime.toISOString().substr(11,8),
                endTime: values.RealEndDateTime.toISOString().substr(0,10) + ' ' + values.RealEndDateTime.toISOString().substr(11,8),
                //endTime: "2021-08-09 22:00:00",
                hostId: myContext.user.id,
                mainCategoryId: values.EventType,
                categoryIds: values.ContentType,
                }
                )
        })
        .then((response) => response.json())
        .then((json) => {
            console.log('event posted: ')
            console.log(json);
            handleNavigation(json);
        })
        .catch((error) => Alert.alert('Failed to Post Event',"Sorry, we can't post your event right now. Please try again later.")); 
    }
    const postEventHandler = () => {
        postToServer(); //handles all navigation stuff also
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#fff'
            }} >
            <View style={{flex: 1}}>
                <PreviewHeader navigation={navigation} />
            </View>
        <ScrollView contentContainerStyle={{height: '78%'}}>
            <View style={styles.panel}>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
              <View>
                <Text style={{
                  fontSize: 24,
                  width: Dimensions.get('window').width - 105,
                  marginRight: 10    
                  }} 
                  numberOfLines={2}>
                    {values.EventTitle}
                  </Text>
              </View>
              <View style={{borderRadius: 5, borderWidth: 1, borderColor: 'black', padding: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'black'}}>{values.Privacy}</Text>
              </View>
              
            </View>
            <View style={styles.panelHost}>
              <Image
                source={require('../assets/Vector.png')}
                style={{width:18, height: 18}}>
              </Image>
              <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15, fontSize: 16, fontWeight: 'bold', color: 'orange'}}>{values.OrganizerName}</Text>
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
                <Image source={{uri: values.EventImage}}
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
              <Text>{values.locationName}</Text>
              <Text style={{marginBottom: 10}}>{values.Address}</Text>
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
          </ScrollView>
            
                <View style={{ flexDirection: 'row', flex: 1}}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'center', marginRight: '20%' }} onPress={() => navigation.navigate("Form")}>
                            <View style={styles.backContainer}>
                                <Text style={styles.backText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={postEventHandler}>
                            <View style={styles.nextContainer}>
                                <Text style={styles.nextText}>Post Event!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
    
                </View>
    
            </SafeAreaView>
        );
    }
