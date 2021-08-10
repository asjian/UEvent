import React, {useState,Component, useEffect} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,Alert, SafeAreaView, FlatList, Image, TextInput} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Globals from '../../GlobalVariables';



    

export const ManageAttendeesScreen = ({navigation, route}) => {
    const { apiData } = route.params;

    const [attendees, setAttendees] = useState([]);
	const [eventInfo, setEventInfo] = useState(apiData);
	
	const getEvents = () => {
		let fetchurl = Globals.eventsURL + '/' + eventInfo.id.toString();
		console.log(fetchurl);
		fetch(fetchurl)
			.then((response) => response.json())
			.then((json) => {setEventInfo(json);getUsers(json);})
			.catch((error) => console.error(error))
		
	}
	
	
    const getUsers = (eventJson) => {
        console.log('fetching users...');
        let fetchurl = 'https://retoolapi.dev/mR2CoY/users';
        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {
              const userMap = new Map();
              for (let i = 0; i < json.length; i++) {
                  userMap.set(json[i].id.toString(), json[i]);
              }
			  let attendeeIdArray;
			  if (eventJson.Attendees === '') {
				attendeeIdArray = [];
			  }
			  else {
				attendeeIdArray = eventJson.Attendees.split(" ");
			  }
              
              const displayedUsers = [];

              for (let i = 0; i < attendeeIdArray.length; i++) {
                // for (let j = 0; j < json.length; j++) {
                //     if (UserIdArray[i] === json[j].id.toString()) {
                //         displayedUsers.push(json[j]);
                //     }
                // }
                displayedUsers.push(userMap.get(attendeeIdArray[i]));
                
              }

              setAttendees(displayedUsers); 
              setMasterDataSource(displayedUsers)
            })
          .catch((error) => console.error(error))
    }
      const [fetched,setFetched] = useState(false);

        useEffect(() => {
          
			getEvents();
			console.log(eventInfo);
            // getUsers();
            setFetched(true);
          
        },[]);


    // states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [masterDataSource, setMasterDataSource] = useState([]);
 
    const handleSearch = (text) => {
         // const formatQuery = text.toLowerCase();
        setQuery(text);
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.Name
              ? item.Name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setAttendees(newData);
          setQuery(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setAttendees(masterDataSource);
          setQuery(text);
        }
      };

	  const updateAttendees = (attendeeId) => {
		// get removed attendee out of array
		console.log(attendeeId);
		console.log(attendees);
		const filteredData = attendees.filter(item => item.id !== attendeeId);
		setAttendees(filteredData);
		setMasterDataSource(filteredData);
		console.log(filteredData);

		let attendeeString = '';
		for (let i = 0; i < filteredData.length; i++) {
			if (i === (filteredData.length - 1)) {
				attendeeString = attendeeString + filteredData[i].id.toString();
			}
			else {
				attendeeString = attendeeString + filteredData[i].id.toString() + ' ';
			}
			
		}
	
		console.log(attendeeString);
	
		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ Attendees: attendeeString })
		};
		fetch('https://retoolapi.dev/lvF3hn/events/' + eventInfo.id.toString(), requestOptions)
			.then(response => response.json())
			.then(json => console.log('Success:', json.Attendees))
			.catch((error) => {
				console.error('Error: ', error);
			})

	  }

    const EmptyListMessage = () => {
		return (
			<Text >You have no attendees for your event right now</Text>
		);
	}

    return (
        <SafeAreaView style={{backgroundColor: '#FFF9F9', height: '100%', width: '100%'}}>
            <View style={{height: '80%'}}>
            <SearchBar 
                containerStyle={{backgroundColor: '#FFF9F9'}}
                inputContainerStyle={{backgroundColor:'white'}}
                placeholder='Names or Emails'
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                lightTheme 
                round
                platform='default'
                value={query}

            />
                <FlatList
                    data={attendees}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.box}>
                            <View style={{ flex: 2 }}>
                                <Image style={styles.realImageStyle} source={require('../assets/user_icon.png')} />
                            </View>
                            <View style={{ flex: 5 }}>
                                <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.Name}</Text>
                                <Text style={{ fontWeight: '500', fontSize: 13}}>{item.Email}</Text>
                            </View>
                            <View style={{ flex:1, justifyContent:'center' }}>
                                <TouchableOpacity style={styles.delete} onPress={() => updateAttendees(item.id)}>
                                    <View style={{flex: 2}}>

                                    </View>                             
                                    <View style={{width: '60%', backgroundColor: 'white', flex: 1, alignSelf: 'center'}}>

                                    </View>
                                    <View style={{flex: 2}} >

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    
                    ListEmptyComponent={EmptyListMessage}
                    
                />
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity >
                    <View style={styles.InviteContainer}>
                        <Text style={styles.InviteText}>+ Invite More</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    );
    
}

const styles = StyleSheet.create({
    headerButtonStyle : {
        fontSize: 18,
        color: '#0085FF',
        fontWeight: '700'
    },
    box: {
        width: '90%',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        backgroundColor: '#FFF9F9',
        flex: 1

    },
    realImageStyle: {
        height: '100%',
        resizeMode: 'contain',
        width: '100%'

    },
    InviteContainer: {
        backgroundColor: '#0085FF',
        margin: '8%',
        width: '100%',
        alignItems: 'center',

        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10,
    },
    InviteText: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingVertical: 15,
        paddingHorizontal: 60,
        color: '#FFFFFF',
    },
    delete: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FF5E5E',
        resizeMode: 'contain',
        alignSelf: 'center',
        
    }
})
