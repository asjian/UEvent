import React, {useState,useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import NavBar from './app/routes/navBar';
import AppContext from './app/objects/AppContext';
import InitialNav from './app/routes/initialNav';
import Globals from './GlobalVariables';

const App = () => {
  const [showNavBar,setShowNavBar] = useState(true);
  const toggleShowNavBar = (value) => {
    setShowNavBar(value);
  }

  const [user,setUser] = useState({id: -1,displayName: '',email: 'nan@umich.edu',});
  const initializeUser = (value) => {
    setUser(value);
  }
  
  const [mapSearchText,setMapSearchText] = useState(''); //NOTHING SHOULD TOUCH THIS EXCEPT MAPSEARCHBAR AND THE CLEAR BUTTON
  const changeMapSearchText = (value) => {
    setMapSearchText(value);
  }

  const [eventList,setEventList] = useState([]);
  const updateEventList = (value) => {
    setEventList(value);
  }

  const [postedEvent,setPostedEvent] = useState({inUse:false});
  const changePostedEvent = (value) => {
    setPostedEvent(value);
  }

  const globals = {
    navBarVisible: showNavBar,
    toggleShowNavBar,

    user: user,
    initializeUser,

    mapSearchText: mapSearchText,
    changeMapSearchText,

    eventList: eventList,
    updateEventList,

    postedEvent: postedEvent,
    changePostedEvent,
  }
  const [fetchedCategories,setFetchedCategories] = useState(false);
  //prepare things:
      //fetch categories
      if(!fetchedCategories) {
        console.log('fetching categories...')
        fetch(Globals.categoriesURL)
        .then((response) => response.json())
        .then((json) => {Globals.categories = json;setFetchedCategories(true)})
        .catch((error) => console.error(error));
      }
  //mess with the database/api here
  
  /*
  fetch('http://47.252.19.227/EventHub/rest/invitees/delete?eventId=10&userId=3', {
    method: 'delete',
  })
  */
  
  /*
  fetch('http://47.252.19.227/EventHub/rest/users/delete/8',{
   method: 'delete',
  });
  */
  
  
  
/*
 fetch('https://retoolapi.dev/lvF3hn/events/4',{
   method: 'patch',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   },
   body: JSON.stringify({
      Attendees: "1 2 3",
   })
 });
 */
  /*
  fetch('https://retoolapi.dev/CNVOvx/collisionevents/3', {
    method:'delete',
  }); 
  */
  return (
    //<WelcomeNavigator />
    <AppContext.Provider value = {globals}>
      <NavigationContainer>
        <InitialNav/>
      </NavigationContainer>
    </AppContext.Provider>
    //<WelcomeScreen/>
  );
}
export default App;
