import React, { useEffect } from 'react';
import { Animated, Text, View,SafeAreaView, Platform } from 'react-native';
import NavBar from './NavBar';

const FadeInView = ({ children, style }) => {
  const fadeAnim = new Animated.Value(0)// Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  );
};

const AnimatedScreen = () => {
  return (
    <SafeAreaView style={{flex:1}} edges={Platform.OS==='ios'?['bottom','top']:[]} >
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f8ff',
      }}>
      <FadeInView
        style={{
          width: 200,
          height: 100,
          backgroundColor: 'lightblue',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text style={{ fontSize: 20, color: '#333' }}>Fading in</Text>
      </FadeInView>
      <View style={{bottom:0,flexDirection:'row',position:'absolute'}}>
        <NavBar/>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default AnimatedScreen;
