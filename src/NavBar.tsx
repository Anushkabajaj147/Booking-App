import React, { useState } from 'react';
import {View,Text,Dimensions, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const NavBar=()=>{
    const routing=useRoute();
    const Navigation=useNavigation();
    const {height,width}=Dimensions.get('screen');
    const Navigate=(Screen)=>{
        return(
            Navigation.navigate(Screen)
        );
    };
    return(
        <View style={{flexDirection:'row',height:height*0.05,width:width,borderWidth:1,borderColor:'rgba(224, 224, 224,0.9)',borderTopLeftRadius:20,borderTopRightRadius:20,elevation:24,justifyContent:'space-evenly',backgroundColor:'rgba(224, 224, 224,0.9)'}}>
         <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='HomeScreem'?'#fff':'transparent',justifyContent:'center',alignItems:'center',alignSelf:'center',backgroundColor:routing.name=='HomeScreen'?'#fff':'transparent' }}   onPress={()=>Navigate('HomeScreen')}  ><Icons name='home' size={28} color={'rgba(131, 126, 126, 0.9)'}  onPress={()=>Navigate('HomeScreen')} /></TouchableOpacity>
         <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='ExploreScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='ExploreScreen'?'#fff':'transparent'}} onPress={()=>Navigate('ExploreScreen')}> <Icons name={'compass'} size={28} color={'rgba(131, 126, 126, 0.9)'} onPress={()=>Navigate('ExploreScreen')}/></TouchableOpacity>
         <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='OfferScreenExample'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='OfferScreenExample'?'#fff':'transparent'}} onPress={()=>Navigate('OfferScreenExample')}> <Icons name={'percent'} size={20} color={'rgba(131, 126, 126, 0.9)'} onPress={()=>Navigate('OfferScreenExample')}/></TouchableOpacity>
         <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='WishlistScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='WishlistScreen'?'#fff':'transparent'}} onPress={()=>Navigate('WishlistScreen')}><Icons name={'heart'} size={24} color={'rgba(131, 126, 126, 0.9)'} onPress={()=>Navigate('WishlistScreen')}/></TouchableOpacity>
         <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='LoginScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='LoginScreen'?'#fff':'transparent'}} onPress={()=>Navigate('LoginScreen')}><Icons name={'user'} size={24} color={'rgba(131, 126, 126, 0.9)'} onPress={()=>Navigate('LoginScreen')}/></TouchableOpacity>
        
        </View>

    );
};
export default NavBar;