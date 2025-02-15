import { View, Text,Dimensions,FlatList, TouchableOpacity,Image,Animated } from 'react-native';
import React, { useState,useEffect, useCallback } from 'react';
import OfferDetails from './OffersDetails';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import EncryptedStorage from 'react-native-encrypted-storage';
const OfferScreen = () => {
 const{height,width}=Dimensions.get('screen');
const Navigation=useNavigation();
const[filterData,setFilterData]=useState([]);
const[loading,setLoading]=useState(true);
 useFocusEffect(
  useCallback(()=>{
    let renderdata=true;
    const fetchRecords=async()=>{
      try{
        const offerToken=await EncryptedStorage.getItem("settoken");
        console.log('offertoken',offerToken);
        const headers={
          'Authorization':`Bearer ${offerToken}`,
        };
        let dataget=await fetch('http://10.0.2.2:3000/api/offerdetails',{headers});
        if(dataget.ok)
        {
          let response= await dataget.json();
            setFilterData(response);
            console.log('get response');
        }
        else{
          console.log('coulnot get response');
        } 
      }
      catch(err){
        console.log('error occur while fetching records from offerdetail table ',err);
      }
      finally{
        if(renderdata)
        {
          setLoading(false);
        }
      }
    };
    fetchRecords();
    return()=>{
      renderdata=false;
    };
  },[])
 );

 if(loading)
 {
  return(
    <View>
      <Text>Loading...</Text>
    </View>
  )
 }
  return (
    <View style={{flex:1,backgroundColor:'rgb(240, 240, 240)'}}>
      <View style={{borderWidth:1,borderColor:'transparent',height:height*0.088,width:width-10,alignSelf:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{borderWidth:0.5,borderColor:'transparent',height:height*0.088,width:width-350,justifyContent:'center',alignSelf:'flex-start',alignContent:'center',alignItems:'center'}} ><Icon name='keyboard-arrow-left' size={42} color={'rgba(31, 31, 31,0.9)'} onPress={()=>Navigation.navigate('ExploreScreen')}/></TouchableOpacity>
        <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.088,width:width-280,justifyContent:'center',alignSelf:'center',alignContent:'center',alignItems:'center',marginLeft:'20%'}}><Text style={{fontSize:35,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)',alignSelf:'center'}}>Offers</Text></View>
      </View>
      <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.00,width:width-5,alignSelf:'center'}}/>
     <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.8,width:width,alignSelf:'center'}}>
      <FlatList showsVerticalScrollIndicator={false}
      data={filterData}
      numColumns={2}
     columnWrapperStyle={{justifyContent:'space-between',marginLeft:'3%',marginRight:'3%'}}
     contentContainerStyle={{}}
      renderItem={({item})=>(
        <TouchableOpacity style={{borderWidth:0.5,borderColor:'transparent',height:height*0.3,width:width-230,marginTop:'5%',borderRadius:10,marginBottom:'5%',elevation:24,backgroundColor:'#fff',alignSelf:'center',alignContent:'center',alignItems:'center'}}>
          <Image source={{uri:item.image}} style={{height:height*0.15,width:width-230,objectFit:'fill',borderWidth:0.5,borderColor:'transparent',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
       <View style={{borderWidth:0.5,borderColor:'transparent',top:0,height:height*0.04,width:width-250,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}><Text style={{textAlign:'center',fontSize:18,fontWeight:'500'}}>{item.name}</Text></View>
       <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-238,alignSelf:'center',flexDirection:'column'}}>
        <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.032,width:width-238,justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}><Text style={{fontSize:15,textAlign:'center',fontWeight:'600',color:'green',top:'15%'}} >{item.offer_detailone}</Text></View>
        <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.038,width:width-238,justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}><Text style={{fontSize:13,textAlign:'left'}} >{item.offer_detailtwo}</Text></View>
       </View>
       <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.035,width:width-250,alignSelf:'flex-start',left:'2%',flexDirection:'row'}}>
        <Text style={{borderWidth:0.5,borderColor:'transparent',height:height*0.035,width:width-350,fontSize:15,fontWeight:'500',marginLeft:'2%',textAlign:'center'}}>Expires:-</Text>
        <Text style={{borderWidth:0.5,borderColor:'transparent',height:height*0.035,width:width-320,fontSize:15,fontWeight:'bold',color:'darkred',marginLeft:'2%',textAlign:'center'}}>{item.expire_date}</Text>
       </View>
        </TouchableOpacity>
      )}/>
     </View>
     <View style={{bottom:0,flexDirection:'row'}}>
     <NavBar/>
     </View>
    </View>
    
  );
};
export default OfferScreen;