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
  const globals = {
    navBarVisible: showNavBar,
    toggleShowNavBar,
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
