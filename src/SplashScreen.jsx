import { View, Text, ImageBackground,Dimensions, Animated } from 'react-native';
import React, { useEffect,useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const{height,width}=Dimensions.get('screen');
  const Navigation=useNavigation();
  const Animation= new Animated.Value(0);
  const[fetchToken,setFetchToken]=useState(false);

  const getToken=async()=>{
    try{
      const SplashScreenToken=await EncryptedStorage.getItem("settoken");
      console.log('SplashScreenToken',SplashScreenToken);
      if(SplashScreenToken)
      {
         Navigation.navigate('HomeScreen');
      }
      else{
        Navigation.navigate('LoginExample');
      }
    }
    catch(err){
      console.log('In Catch',err);
    }
  };
 
  useEffect(()=>{
 Animated.sequence([
    Animated.timing(Animation,{
      toValue:0.5,
      duration:3000,
      useNativeDriver:true
    }),
    Animated.timing(Animation,{
      toValue:1,
      duration:2000,
      useNativeDriver:true
    })
  ]).start(()=>{
   console.log('Another task');
    getToken();
    });
   
  },[]);
  

  const fadeOpacity= Animation.interpolate({
   inputRange:[0,0.5,1],
    outputRange:[0.4,0.89,0.9]
  });

  

  return (
    <Animated.View style={{flex:1,opacity:fadeOpacity}}>
    <ImageBackground source={require('./images/SplashImage.jpg')} style={{height:height,width:width}}/>
    </Animated.View>
  );
};

export default SplashScreen;