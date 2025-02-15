import { PermissionsAndroid, Platform } from 'react-native';

export async function requestPermissions() {
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

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // For older versions (Android 12 and below)
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);

        return (
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}
