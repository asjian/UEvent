import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './app/routes/navBar';
import AppContext from './app/objects/AppContext';

const App = () => {
  const [showNavBar,setShowNavBar] = useState(true);
  const toggleShowNavBar = () => {
    setShowNavBar(!showNavBar);
  }
  const globals = {
    navBarVisible: showNavBar,
    toggleShowNavBar,
  }
  return (
    //if the user is on the app the first time
    //<WelcomeNavigator />
    <AppContext.Provider value = {globals}>
      <NavigationContainer>
        <NavBar/>
      </NavigationContainer>
    </AppContext.Provider>
    //<WelcomeScreen/>
  );
}

export default App;
