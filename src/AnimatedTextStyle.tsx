import { View, Text,Animated, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import NavBar from './NavBar';

const AnimatedTextStyle = () => {
    const animatedValue=new Animated.Value(0);
    useEffect(()=>{
        Animated.loop(
      Animated.timing(animatedValue,{
      toValue:1,
      duration:5000,  //5 milliseconds
      useNativeDriver:false, //usenative driver doesnot support size related animation 
      })).start();
    },[])
    const fontSizeChange=animatedValue.interpolate(
        {inputRange:[0,1],
            outputRange:[14,30],
        });
    return (
    <View>
      <Animated.Text style={{fontSize:fontSizeChange}}>
        Animation 
      </Animated.Text>
      <View style={{flexDirection:'row',bottom:0,top:'50%'}}>
      <NavBar/>
      </View>
    </View>
  );
};

export default AnimatedTextStyle;