import { View, Text,Animated,Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import NavBar from './NavBar';

const AnimationImageMove = () => {
    const animatedValue= new Animated.Value(0);
    const{height,width}=Dimensions.get('screen');
    useEffect(()=>{
     Animated.loop
          (  Animated.sequence
           ([ Animated.timing(animatedValue,{
                toValue:0.5,
                duration:1000,
                useNativeDriver:true,
            }),
            Animated.timing(animatedValue,{
                toValue:1,
                duration:1500,
                useNativeDriver:true,
            }),
            Animated.timing(animatedValue,{
                toValue:0.7,
                duration:200,
                useNativeDriver:true,
            }),
            Animated.timing(animatedValue,{
                toValue:0,
                duration:1000,
                useNativeDriver:true,
            }),])
        ).start();
    },[]);

    const transaletX=animatedValue.interpolate(
        {
            inputRange:[0,1],
            outputRange:[1,270],
        }
    );
  return (
    <View style={{flex:1,height:height,width:width}}>
 <Animated.Image
    source={require('./images/womenimageone.jpg')} style={{height:height*0.15,width:width-250,transform:[{translateX:transaletX }]}} 
 />
 <View style={{bottom:0,flexDirection:'row',position:'absolute'}}>
    <NavBar/>
 </View>
    </View>
  );
};

export default AnimationImageMove;