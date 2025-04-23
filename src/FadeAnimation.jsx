import { View, Text, Animated, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import NavBar from './NavBar';

const FadeAnimation = () => {
    const animated=new Animated.Value(0);
    const{height,width}=Dimensions.get('screen');
    useEffect(()=>{
        Animated.loop(
               Animated.timing(animated,{
                toValue:1,
                duration:3000,
                useNativeDriver:true,
               })).start();
    },[]);
    const fadeButtom=animated.interpolate({
        inputRange:[0,1],
        outputRange:[1,24]
    });
    const colorChange=animated.interpolate({
        inputRange:[0,1],
        outputRange:['rgba(68, 87, 138, 0.7)','rgba(8, 51, 167, 0.7)']
    });
    const textColorChange=animated.interpolate({
        inputRange:[0,1],
        outputRange:['#000','#fff']
    });
  return (
    <View style={{flex:1,backgroundColor:'rgb(240, 240, 240)'}}>
     <Animated.View style={{opacity:fadeButtom,backgroundColor:colorChange,height:height*0.105,width:width-150,alignSelf:'center',borderWidth:0.5,top:'5%',alignContent:'center',alignItems:'center',justifyContent:'center',borderColor:colorChange,borderRadius:15}}>
      <Animated.Text style={{fontSize:20,textAlign:'center',color:textColorChange}}>Faded Button</Animated.Text> 
     </Animated.View>
     <View style={{flexDirection:'row',bottom:0,position:'absolute'}}>
        <NavBar/>
     </View>
    </View>
  );
};

export default FadeAnimation;