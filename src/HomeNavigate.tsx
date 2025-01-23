import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const HomeNavigate = () => {
  const{height,width}=Dimensions.get('screen');
  const Navigation=useNavigation();
  const Routing=useRoute();
  return (
    <View style={{flex:1,}}>
      <View style={{height:height*0.10,width:width-15,top:'5%',borderWidth:0.5,backgroundColor:'#fff',alignSelf:'center',borderRadius:20,flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center',elevation:24}}>
      <TouchableOpacity style={{borderWidth:0.7,height:height*0.06,width:width-290,alignContent:'center',justifyContent:'center',alignItems:'center',borderRadius:20,backgroundColor:Routing.name=='HomeScreen'?'rgba(219, 188, 160,0.9)':'rgb(240, 240, 240)',elevation:10}} onPress={()=>Navigation.navigate('HomeScreen')}><Text style={{fontSize:17,fontWeight:'bold',color:Routing.name=='HomeScreen'?'rgba(31, 31, 31,0.9)':'rgb(97, 125, 138)'}} >Hotel Booking</Text></TouchableOpacity>
      <TouchableOpacity style={{borderWidth:0.7,height:height*0.06,width:width-290,alignContent:'center',justifyContent:'center',alignItems:'center',borderRadius:20,backgroundColor:Routing.name=='FlightNavigateExample'?'rgba(219, 188, 160,0.9)':'rgb(240, 240, 240)',elevation:10}}  onPress={()=>Navigation.navigate('FlightNavigateExample')}><Text style={{fontSize:17,fontWeight:'bold',color:Routing.name=='FlightNavigateExample'?'rgba(31, 31, 31,0.9)':'rgb(97, 125, 138)'}}>Flight Booking</Text></TouchableOpacity>
      <TouchableOpacity style={{borderWidth:0.7,height:height*0.06,width:width-290,alignContent:'center',justifyContent:'center',alignItems:'center',borderRadius:20,backgroundColor:Routing.name=='TrainScreen'?'rgba(219, 188, 160,0.9)':'rgb(240, 240, 240)',elevation:10}} onPress={()=>Navigation.navigate('TrainScreen')}><Text style={{fontSize:17,fontWeight:'bold',color:Routing.name=='TrainScreen'?'rgba(31, 31, 31,0.9)':'rgb(97, 125, 138)'}}  >Train Booking</Text></TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeNavigate;

