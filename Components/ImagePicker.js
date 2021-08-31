import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Globals from '../../../GlobalVariables';

export default function ImagePickerExample({onChange, value, editMode}) {
  const [image, setImage] = useState(null);

  {/*useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);*/}

  const permissionCall = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status != 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status != 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [2, 1],
          quality: 1,
          base64: true
        });     
      if (!result.cancelled) {
        if(result.base64.length > 10000000) {
          Alert.alert("Image Too Large", "Your image is too large for us to handle, please choose a smaller one");
        }
        else {
          onChange('EventImage', result.uri);
          onChange('EventImageSize', result.base64.length);
          onChange('EventImageDimensions', {height: result.height, width: result.width})
          setImage(result.uri);
          if(editMode) {
            onChange('ImageEdited',true);
          }
        }
      }
      }
    }
  };

  const deleteImage = () => {
    setImage(null);
    onChange('EventImage', '');
    if(editMode)
      onChange('ImageEdited',true);
  }
    return (
      <View style={{margin: 30}}>
        {value == '' && 
  
        (<View style={{alignItems: 'center', justifyContent: 'center', width: '95%', height: 210, backgroundColor: 'rgba(248, 248, 248, 1)'  }}>
          <TouchableOpacity onPress={pickImage} style={{position: 'absolute', top: 80, left: 85, zIndex: 1 }}>
            <View style={styles.selectContainer}>
                <Text style={styles.selectText}>Upload Photo</Text>
            </View>
          </TouchableOpacity>
          {value == '' ? (null) 
          : (value)  && 
          <Image source={{ uri: value }} style={styles.image} />}
        </View>)
        }
        {value !== '' && 
  
          (<View style={{alignItems: 'center', justifyContent: 'center', width: '95%', height: 210,}}>
            <TouchableOpacity onPress={deleteImage} style={{position: 'absolute', top: 0, left: 317, zIndex: 1 }}>
                <View style={{height: 25, width: 25, backgroundColor: 'white', alignItems: 'center'}}>
                    <Text style={{color:'black', fontSize: 20}}>X</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={{position: 'absolute', top: 88, left: 85, zIndex: 1 }}>
              <View style={styles.selectContainer}>
                  <Text style={styles.selectText}>Upload Photo</Text>
              </View>
            </TouchableOpacity>
            {value == '' ? (null) 
            : (value)  && 
            <Image source={{ uri: value }} style={styles.image} />}
          </View>)
          }
      </View>   
    );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Globals.HR(225),
    overflow: 'hidden',
    marginTop: Globals.HR(20),
    marginLeft: Globals.HR(12)
  },
  selectContainer: {
    backgroundColor: '#ffffff',
    // marginHorizontal: Globals.WR(15),
    // marginTop: Globals.HR(50),
    width: 180,
    alignItems: 'center',
    top: 0,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: Globals.HR(10),
},
selectText: {
    fontWeight: '500',
    fontSize: Globals.HR(20),
    paddingVertical: Globals.HR(10),
    paddingHorizontal: Globals.WR(15)
    
}
})
