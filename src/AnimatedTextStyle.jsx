import { View, Text,Animated, Dimensions, SafeAreaView, Platform } from 'react-native';
import React, { useEffect } from 'react';
import NavBar from './NavBar';

const AnimatedTextStyle = () => {
    const animatedValue=new Animated.Value(0);
    useEffect(()=>{
        Animated.loop(
      Animated.timing(animatedValue,{
      toValue:1,
      duration:5000,  //5 milliseconds
      useNativeDriver:true, //usenative driver doesnot support size related animation 
      })).start();
    },[])
    const fontSizeChange=animatedValue.interpolate(
        {inputRange:[0,1],
            outputRange:[14,30],
        });
    return (
      <SafeAreaView style={{flex:1}} edges={Platform.OS==='ios'?['bottom','top']:[]}>
    <View>
      <Animated.Text style={{fontSize:fontSizeChange}}>
        Animation 
      </Animated.Text>
      <View style={{flexDirection:'row',bottom:0,top:'50%'}}>
      <NavBar/>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default AnimatedTextStyle;