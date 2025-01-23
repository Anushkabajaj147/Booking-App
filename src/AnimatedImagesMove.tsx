import { View, Text, Dimensions,Animated } from 'react-native';
import React, { useEffect } from 'react';
import { AnimatedFAB } from 'react-native-paper';

const AnimatedImagesMove = () => {
    const{height,width}=Dimensions.get('screen');
    const animated=new Animated.Value(0);
    const animation=new Animated.Value(0);
    useEffect(()=>{
        Animated.loop(
            Animated.sequence([ 
            Animated.timing(animated,{
                    toValue:1,
                    duration:2000,
                    useNativeDriver:true,}),
            Animated.timing(animated,{
                        toValue:0.5,
                        duration:2000,
                        useNativeDriver:true,
                    }),
            Animated.timing(animated,{
            toValue:0,
            duration:1000,
            useNativeDriver:true,
        })])).start();
            });

    useEffect(()=>{
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation,{
                    toValue:0.5,
                    duration:3000,
                    useNativeDriver:true,
                }),
                Animated.timing(animation,{
                    toValue:0.7,
                    duration:4000,
                    useNativeDriver:true,
                }),
                Animated.timing(animation,{
                    toValue:1,
                    duration:7000,
                    useNativeDriver:true,
                }),
                Animated.timing(animation,{
                    toValue:0,
                    duration:4000,
                    useNativeDriver:true,
                }),
            ])).start();
    },[]);

    const translateX=animated.interpolate({
        inputRange:[0,1],
        outputRange:[0,150],
    });
    const translateY=animation.interpolate({
        inputRange:[0,1],
        outputRange:[0,height-120]
    })
  
  return (
    <View>
        <Animated.Text style={{fontSize:25,fontWeight:'bold',transform:[{translateX:translateX}]}}>
             Text Moving Horizontal
        </Animated.Text>
        <Animated.Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',transform:[{translateY:translateY}]}}>
            Text Moving Vertical
        </Animated.Text>
    </View>
  );
};
export default AnimatedImagesMove;