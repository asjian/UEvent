import React, {useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import * as Google from "expo-google-app-auth";
import Globals from '../../GlobalVariables';
import AppContext from '../objects/AppContext';

const SignInScreen = ({navigation}) => {
    const myContext = useContext(AppContext);

    const { colors } = useTheme();

    const addAndSaveUser = (existsInDataBase,user) => {
        const fetchurl = Globals.usersURL;
        if(!existsInDataBase) { //then add to database
            fetch(fetchurl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: user.name,
                    Admin: "No",
                    Email: user.email,
                    Organization: "No",
                    EventsHosting: "",
                    UpcomingEvents: "",
                })
            })
        }
        //in either case, get the user and save it.
        fetch(fetchurl + '?Email=' + user.email)
        .then((response) => response.json())
        .then((json) => {myContext.initializeUser(json[0])})
        .catch((error) => console.error(error));
    }

    const handleUserDataBase = (user) => {
        const fetchurl = Globals.usersURL + '?Email=' + user.email;
        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {addAndSaveUser(json.length != 0,user)})
          .catch((error) => console.error(error))
    }

    const IOS_CLIENT_ID = '343030781035-g5nm8pfeu3c88tr9v5dhoq7tqg13c8di.apps.googleusercontent.com';
    const signInAsync = async () => {
        try {
          const { type, user } = await Google.logInAsync({
            iosClientId: IOS_CLIENT_ID,
          });
          if (type === "success") {
            // Then you can use the Google REST API
            console.log("LoginScreen.js 17 | success");
            if(user.email.length < 10 || user.email.substring(user.email.length-10,user.email.length) != '@umich.edu') {
                //show some kind of error
                Alert.alert('Invalid Email', 'Please log in with an @umich.edu email');
            }
            else {
                handleUserDataBase(user);
                navigation.navigate('WelcomeScreen');
            }
          }
          else {
            console.log("LoginScreen.js 17 | failure");
            console.log(type);
            //show some kind of error here, don't know what it will be
          }
        } catch (error) {
          console.log("LoginScreen.js 19 | error with login", error);
        }
      };
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#FFCB05' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Hey There!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <View>
                <Text style={{color: '#05375a',
                fontWeight: 'bold',
                fontSize: 18}}> 
                    Notice: This app is dedicated to umich students only. Please select your umich email when signing in with Google :)
                </Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={[styles.signIn, {
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        borderColor: '#FFCB05',
                        borderWidth: 1,
                    }]}
                    onPress = {signInAsync}
                >
                <Image source = {require('../assets/googlelogo.png')} style = {{width: 30,height: 30,marginLeft: 10.75}}/>
                <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color:'gray',
                        marginLeft: 24,
                }}>Sign In With Google</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Image source={require('../assets/wolverine.png')}/>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FFCB05'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
