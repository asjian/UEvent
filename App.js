import React, {useState} from 'react';
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

  const [user,setUser] = useState({id: -1,Name: '',Email: 'nan@umich.edu',Organization: "No",Admin: "No",UpcomingEvents: '',EventsHosting: '',});
  const initializeUser = (value) => {
    setUser(value);
  }
  
  const globals = {
    navBarVisible: showNavBar,
    toggleShowNavBar,

    user: user,
    initializeUser,

  }
  //prepare things:
      //fetch categories
      fetch(Globals.categoriesURL)
      .then((response) => response.json())
      .then((json) => {Globals.categories = json})
      .catch((error) => console.error(error));
  //mess with the database/api here
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
