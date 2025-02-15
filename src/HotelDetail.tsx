import React from 'react';
import { View, Text,Image, Dimensions, TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import Carousel from '@webileapps/react-native-banner-carousel';

const HotelDetail = ({route}) => {
  const{hotel}=route.params;
  const{height,width}=Dimensions.get('screen');
  console.log('hotel',hotel);
 
  const getPrice=()=>{
    let hotelPrice=hotel.price;
    
    if(hotelPrice>2000 && hotelPrice<=4000)
    {
      
      return 3;
    }
    else if(hotelPrice>4100 && hotelPrice<=8000)
    {
      
      return 4;
    }
    else{
      
      return 5;
    }
  };

  let stars=getPrice();

  const starRender=(stars)=>{
    let getIcons=[];
    let sum=5;
    for(let i=0;i<sum;i++)
    {
     getIcons[i]=<Icon key={i} name={i<stars?'star':'star-border'} color={'rgba(221, 144, 81, 0.9)'} size={25}/>
    }
    return getIcons;
  
  };
  return (
    <View style={{flex:1,backgroundColor:'rgb(247, 247, 247)'}}>
     <View style={{borderWidth:1,height:height*0.45,width:width}}>
      <Carousel
      pageSize={width}
      loop={true}
      autoplay={true} 
      index={0}
      autoplayTimeout={1900}>
      <Image source={{uri:hotel.hotel}} style={{height:height*0.45,width:width}}/>
      <Image source={{uri:hotel.interior1}} style={{height:height*0.45,width:width}}/>
      <Image source={{uri:hotel.interior2}} style={{height:height*0.45,width:width}}/>
      <Image source={{uri:hotel.interior3}} style={{height:height*0.45,width:width}}/>
      <Image source={{uri:hotel.interior4}} style={{height:height*0.45,width:width}}/>
      <Image source={{uri:hotel.interior5}} style={{height:height*0.45,width:width}}/>
      <Image source={{uri:hotel.interior6}} style={{height:height*0.45,width:width}}/>
      <Image source={{uri:hotel.interior7}} style={{height:height*0.45,width:width}}/>
      </Carousel>
     </View>
     <View style={{backgroundColor:'rgb(254, 254, 254)',borderWidth:1,height:height*0.678,width:width,borderColor:'transparent',bottom:'6%',borderTopLeftRadius:40,borderTopRightRadius:40,elevation:24}}>
      <ScrollView showsHorizontalScrollIndicator={true}>
     <View style={{borderWidth:1,borderColor:'transparent',height:height*0.065,width:width-50,alignSelf:'center',top:'2%'}}>
     <View style={{borderWidth:1,borderColor:'transparent',flexDirection:'row',height:height*0.03,width:width-50,alignSelf:'center',justifyContent:'space-between'}}>
     <View style={{height:height*0.03,width:width-250}}>
       <Text style={{borderWidth:1 ,borderColor:'transparent',fontSize:20,fontWeight:'bold',justifyContent:'center',alignItems:'center',alignContent:'center',color:'rgb(50, 54, 54)'}}>{hotel.name}</Text>
     </View>
     <View style={{height:height*0.03,width:width-250,borderWidth:1,borderColor:'transparent',flexDirection:'column'}}>
      <Text style={{fontSize:18,fontWeight:'bold',color:'rgb(190, 122, 68)',justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>{hotel.price}</Text>
      <View style={{height:height*0.03,width:width-250,borderWidth:1,borderColor:'transparent'}}><Text style={{fontSize:14,justifyContent:'center',alignContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end'}}>{hotel.person}</Text></View>
     </View>
     </View>
     </View>
     <View style={{borderWidth:0.2,top:'1%',borderColor:'rgb(50, 53, 53)'}}></View>
     <View style={{borderWidth:1,borderColor:'transparent',top:'3%',flexDirection:'row',height:height*0.03,width:width,justifyContent:'space-between'}}>
      <View style={{borderWidth:1,borderColor:'transparent',left:'2%',height:height*0.03,width:width-240,flexDirection:'row'}}>
        <Text style={{fontSize:18,fontWeight:'bold',color:'rgb(50, 54, 54)',justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>{stars===3?'3.5/5-Good':stars===4?'4.5/5-Very Good':'5/5-Excellent'}</Text>
      </View>
      <View style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width-240,right:'1%',flexDirection:'row'}}>
        <Icon style={{fontSize:16,color:'rgb(79, 193, 255)',fontWeight:'bold'}}>{starRender(stars)}</Icon>
        </View>
     </View>
     <View style={{borderWidth:0.2,borderColor:'rgb(50, 53, 53)',top:'5%',height:height*0.00,width:width}}></View>

     <View style={{borderWidth:1,borderColor:'transparent',top:'7%',height:height*0.18,flexDirection:'column'}}>
      <View style={{borderWidth:1,borderColor:'transparent',height:height*0.038,width:width-150}}><Text style={{height:height*0.038,width:width-150,fontSize:20,fontWeight:'bold',color:'rgb(190, 122, 68)',justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center',backgroundColor:'rgba(219, 188, 160,0.5)'}}>Hotel Available Services :-</Text></View>
      <View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width,justifyContent:'space-evenly',flexDirection:'row'}}>
     {hotel.breakfast===1?(<View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-280,flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
        <Icon name='free-breakfast' size={23} /> 
        <Text style={{fontSize:18}}>Breakfast</Text>
       </View>):null} 
       {hotel.dining===1?(<View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-280,flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
       <Icon name='local-dining' size={23} /> 
       <Text style={{fontSize:18}}>Dining</Text>
        </View>):null} 
       {hotel.parking===1?(<View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-280,flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
       <Icon name='local-parking' size={23} /> 
       <Text style={{fontSize:18}}>Parking</Text>
        </View>):null }
      </View>
      <View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width,flexDirection:'row',justifyContent:'space-evenly'}}>
       {hotel.wifi===1?(<View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-280,alignContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'row',justifyContent:'space-evenly'}}>
      <Icon name='wifi' size={23} /> 
      <Text style={{fontSize:18}}>Wifi</Text>
      </View>):null}
      {hotel.pets===1?(<View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-280,alignContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'row',justifyContent:'space-evenly'}}>
      <Icon name='pets' size={23} /> 
      <Text style={{fontSize:18}}>Pets</Text>
      </View>):null}
      {hotel.pool===1?(<View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-280,alignContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'row',justifyContent:'space-evenly'}}>
      <Icon name='pool' size={23} /> 
      <Text style={{fontSize:18}}>Pool</Text>
      </View>):null}
      </View>
     </View>
      <View style={{borderWidth:0.2,borderColor:'rgb(50, 53, 53)',top:'8%',height:height*0.00,width:width}}></View>
      <View style={{borderWidth:1,borderColor:'transparent',top:'9%',height:height*0.09,width:width-20,alignSelf:'center',justifyContent:'center'}}>
       <View style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width-20,justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'row'}}>
        <Icon name='location-pin' size={20}/>
         <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{hotel.short_address}</Text>
         </View>
         <View style={{borderWidth:1,borderColor:'transparent',height:height*0.06,width:width-20,alignSelf:'center',justifyContent:'center'}}>
          <ScrollView showsHorizontalScrollIndicator={true}>
          <Text style={{fontSize:14,borderWidth:1,borderColor:'transparent',top:'4%',paddingHorizontal:'2%',textAlign:'center'}}>{hotel.long_address}</Text>
          </ScrollView>
         </View>
      </View>
      <View style={{top:'10%',borderWidth:0.2,borderColor:'rgb(50, 53, 53)'}}></View>
      <View style={{height:height*0.09,width:width,borderWidth:1,borderColor:'transparent',top:'11%',justifyContent:'center',flexDirection:'row'}}>
        <TouchableOpacity  style={{borderWidth:1,borderColor:'transparent',height:height*0.058,width:width-355,borderRadius:30,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'rgb(68, 201, 148)',right:'5%'}}><Icon name='phone' size={38} color={'#fff'} /></TouchableOpacity>
       <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',height:height*0.06,borderRadius:20,width:width-200,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'rgba(190, 122, 68,0.9)'}}><Text style={{borderWidth:1,fontSize:24,fontWeight:'bold',color:'#fff',borderColor:'transparent'}}>Book Now</Text></TouchableOpacity>
      </View>
      </ScrollView>
     </View>
     
     
    </View>
  );
};

export default HotelDetail;