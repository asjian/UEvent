import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import welcomeScreen from '../screens/welcome';
import findScreen from '../screens/FindScreen';
import hostScreen from '../screens/HostScreen';
import profileScreen from '../screens/ProfileScreen';
import searchScreen from '../screens/SearchScreen';
import settingsScreen from '../screens/SettingsScreen';

const rootDrawerNavigator = createDrawerNavigator({
    WelcomeScreen: {
        screen: welcomeScreen
    },
    FindScreen: {
        screen: findScreen
    },
    HostScreen: {
        screen: hostScreen
    },
    ProfileScreen: {
        screen: profileScreen
    },
    SearchScreen: {
        screen: searchScreen
    },
    SettingsScreen: {
        screen: settingsScreen
    }
});

export default createAppContainer(rootDrawerNavigator)