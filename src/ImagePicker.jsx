import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert, PermissionsAndroid, Platform, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePickerComponent = () => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  // Request necessary permissions
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          // Android 13+ requires READ_MEDIA_IMAGES instead of READ_EXTERNAL_STORAGE
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your gallery to select images',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Gallery access is required to select images.');
          }
        } else {
          // For older versions (Android 12 and below)
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          ]);

          if (
            granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
            granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            Alert.alert('Permission Denied', 'Camera and storage access are required.');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Open Camera
  const openCamera = () => {
    let options = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Open Gallery
  const openGallery = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorMessage) {
        console.log('Gallery Error: ', response.errorMessage);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Button title="Open Camera" onPress={openCamera} />
      <Button title="Open Gallery" onPress={openGallery} style={{ marginTop: 10 }} />
      
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />
      ) : (
        <Text style={{ marginTop: 20 }}>No image selected</Text>
      )}
    </View>
  );
};

export default ImagePickerComponent;
