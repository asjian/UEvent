import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({onChange, value}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true
    });

    if (!result.cancelled) {
      onChange('EventImage', result.uri);
      setImage(result.uri);
    }
  };

  return (
    <View style={{alignItems: 'center', flex: 1  }}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.selectContainer}>
            <Text style={styles.selectText}>Upload Photo</Text>
        </View>
      </TouchableOpacity>
      {value == '' ? (null) 
      : (value)  && 
      <Image source={{ uri: value }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    overflow: 'hidden'
  },
  selectContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginTop: 50,
    width: '40%',
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
    borderRadius: 10,
},
selectText: {
    fontWeight: '500',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 15
    
}
})
