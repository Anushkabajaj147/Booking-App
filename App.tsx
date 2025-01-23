import {Text,View,Dimensions, TouchableOpacity, ScrollView,Easing, Animated} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Fontisto';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login'; 
import Home from './src/Home';
import HotelDetail from './src/HotelDetail';
import NavBar from './src/NavBar';
import Explore from './src/Explore';
import Wishlist from './src/Wishlist';
import LoginScreen from './src/LoginScreen';
import EditUserId from './src/EditUserId';
import SignUp from './src/SignUp';
import HomeScreen from './src/HomeNavigate';
import FlightScreen from './src/FlightScreen';
import HomeNavigate from './src/HomeNavigate';
import TrainBooking from './src/TrainBooking';
import OfferScreen from './src/OfferScreen';
import AnimatedScreen from './src/AnimatedScreen';
import AnimatedColorChange from './src/AnimatedColorChange';
import AnimatedTextStyle from './src/AnimatedTextStyle';
import AnimationImageMove from './src/AnimationImageMove';
import AnimatedImagesMove from './src/AnimatedImagesMove';
import FadeAnimation from './src/FadeAnimation';
import { Layout } from 'react-native-reanimated';


const App=()=>{
  const Stack=createNativeStackNavigator();
  
  return(
    <NavigationContainer>
     <Stack.Navigator 
     screenOptions={{
      gestureEnabled:true,
      animation:'slide_from_right', //native slide animation 
      gestureDirection:'horizontal',  //Swipe gestures for horizontal transitions
    animationDuration:100 , //duration in milliseconds 
    }}
     >
       <Stack.Screen name='HomeScreen' component={Home} options={{headerShown:false}} />
       <Stack.Screen  name='SignUpExample'component={SignUp} options={{headerShown:false}}/>
       <Stack.Screen name='LoginExample' component={Login} options={{headerShown:false}}/>
     <Stack.Screen name='ExploreScreen' component={Explore} options={{headerShown:false}}/>
     <Stack.Screen name='WishlistScreen' component={Wishlist} options={{headerShown:false}}/>
     <Stack.Screen name='FlightNavigateExample' component={FlightScreen}  options={{headerShown:false}}/>
     <Stack.Screen name={'OfferScreenExample'} component={OfferScreen} options={{headerShown:false}}/>
     <Stack.Screen  name={'TrainScreen'} component={TrainBooking} options={{headerShown:false}}/>
     <Stack.Screen name='HotalNavigateExample' component={HomeNavigate}  options={{headerShown:false}}/>
      <Stack.Screen  name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
     <Stack.Screen name='DetailExample' component={HotelDetail} options={{headerShown:false}}/>
     <Stack.Screen  name={'EditIdExample'}component={EditUserId} options={{headerShown:false}}/>
     <Stack.Screen name='AnimatedFadeScreen' component={FadeAnimation} options={{headerShown:false}}/>
     <Stack.Screen name='AnimatedImagesScreen' component={AnimatedImagesMove} options={{headerShown:false}}/>
     <Stack.Screen name='AnimatedImageScreen' component={AnimationImageMove} options={{headerShown:false}}/>
     <Stack.Screen name='AnimatedTextScreen' component={AnimatedTextStyle} options={{headerShown:false}}/>
      <Stack.Screen name='AnimatedColorScreen' component={AnimatedColorChange} options={{headerShown:false}}/>
      <Stack.Screen name='AnimatedScreen' component={AnimatedScreen} options={{headerShown:false}}/>
    <Stack.Screen name='NavBarExample' component={NavBar} options={{headerShown:false}}/>
    </Stack.Navigator>
   
    </NavigationContainer>
  );
};
export default App;