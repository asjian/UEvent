import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './app/routes/navBar';

const App = () => {
  return (
    //if the user is on the app the first time
    //<WelcomeNavigator />
    
    <NavigationContainer>
      <NavBar/>
    </NavigationContainer>
    
    //<WelcomeScreen/>
  );
}

export default App;

