import { View, Text, Animated, Dimensions,Platform,SafeAreaView} from 'react-native';
import React, { useEffect } from 'react';
import NavBar from './NavBar';

const AnimatedColorChange = () => {
    const animatedValue=new Animated.Value(0);
    const{height,width}=Dimensions.get('screen');
    useEffect(()=>{
        Animated.loop(
        Animated.timing(animatedValue,{
            toValue:4,
            duration:5000,
            useNativeDriver:true, //usenative driver is false here because it support transform,opacity condition not supported color,size related animation 
        })
    ).start();
    },[]);
    const backgroundColorInterpolate=animatedValue.interpolate({
        inputRange:[0,2,4,6],
        outputRange:['red','green','yellow','purple'],
    });
  return (
    <SafeAreaView style={{flex:1}} edges={Platform.OS==='ios'?['top','bottom']:[]}>
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Animated.View style={{height:height-250,width:width-200,backgroundColor:backgroundColorInterpolate}}>
        
    </Animated.View>
    <View style={{bottom:0,flexDirection:'row',position:'absolute'}}>
    <NavBar/>
    </View>
    <View style={{position:'absolute',bottom:0,flexDirection:'row'}}>
        <NavBar/>

    </View>
    </View>
    </SafeAreaView>
  );
};

export default AnimatedColorChange;