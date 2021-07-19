import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import NavBar from './app/routes/navBar';
import AppContext from './app/objects/AppContext';
import InitialNav from './app/routes/initialNav';

const App = () => {
  
  const [showNavBar,setShowNavBar] = useState(true);
  const toggleShowNavBar = (value) => {
    setShowNavBar(value);
  }
  const [user,setUser] = useState({
    id: -1,
    Name: '',
    Email: 'nan@umich.edu',
    Organization: "No",
    Admin: "No",
    UpcomingEvents: '',
    EventsHosting: '',
  });
  const initializeUser = (value) => {
    setUser(value);
  }
  const globals = {
    navBarVisible: showNavBar,
    toggleShowNavBar,

    user: user,
    initializeUser,
  }
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
