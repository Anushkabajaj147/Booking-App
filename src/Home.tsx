import React, { useEffect, useState } from 'react';
import {Text,View,Image,Dimensions,ScrollView, TouchableOpacity,Animated, ActivityIndicator} from 'react-native';
import hotelRecords from './Data';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import HotelDetail from './HotelDetail';
import NavBar from './NavBar';
import LinearGradient from 'react-native-linear-gradient';
import HomeNavigate from './HomeNavigate';
import Wishlist from './Wishlist';
import { useRoute } from '@react-navigation/native';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { TextInput } from 'react-native-paper';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';


const Home=()=>{
    const[wishlist,setWishlist]=useState([]);
    const[filterHotel,setFilterHotel]=useState(hotelRecords);
    const[navData,setNavData]=useState('');
    const Navigation=useNavigation();
    const[shimmar,setShimmar]=useState(false);
    const{height,width}=Dimensions.get('screen');
  //   useEffect(()=>{
  //     const fetchRecords=async()=>
  //    { try{const response= await fetch('http://10.0.2.2:3000/api/hotelrecords');
  //     if(response.ok)
  //     {
  //       const getData= await response.json();
  //       setFilterHotel(getData);
  //       console.log(filterHotel.length); 
  //     }
  //   else{
  //     console.log('couldnot complete request');
  //   }
  // }
  // catch(err)
  // {
  //   console.log('in catch',err);
  // }}
  // fetchRecords();
  //   },[]);
  
  //   useEffect(()=>{
  // // Simulate a delay of 3 seconds before showing the shimmer
  // const timer = setTimeout(() => setShimmar(true), 1200);

  // // Clean up the timer to prevent memory leaks
  // return () => clearTimeout(timer);
  //   },[]);
    const routing=useRoute();
    const stateChange = (record) => {
        let newWishlist = [...wishlist]; // Create a copy of the wishlist with spread operator and used newwishlist as copy array 
        let found = false;  
        for(let i=0;i<newWishlist.length;i++)
         {
            if (newWishlist[i] === record)
                 {
                found = true; 
                break; 
                 }
         }
      
        if (found) {
            let tempWishlist = [];
            for (let j = 0; j < newWishlist.length; j++)
            {
                 if (newWishlist[j] !== record)
                 {
                    tempWishlist[tempWishlist.length]=newWishlist[j]; // Add item to new array if it's not the one to remove
                 }
            }
            newWishlist=[];
            newWishlist = tempWishlist; 
        }
         else {
            newWishlist[newWishlist.length]=record;
        }
        setWishlist(newWishlist);
    };
    
    const getStarRating=(price)=>{
        if(price>=2000 && price<=4000)
        {
            return 3;
        }
        else if(price>=4100 && price<=8000)
        {
            return 4;
        }
        else 
        {
            return 5;
        }
    };
    const starsRender=(stars)=>{
        const starsGet=[];
        for(let j=0;j<5;j++)
        (
          starsGet[starsGet.length]=<Icons name={j<stars?'star':'star-o'} color='#ff8c00' size={18}/>
        )
        return starsGet;
    };
    const updateData=(navData)=>{
      let hotelRecord=[];
      for(let i=0;i<hotelRecords.length;i++)
     {
        let hotel=hotelRecords[i];
        let navDataConversion=convertionFunction(navData);
        let hotelNameConversion=convertionFunction(hotel.name);
         
          if(navData==='')
          {
            setFilterHotel(hotelRecords);
            break;
          }
          if(navDataConversion===hotelNameConversion )
                {
                 hotelRecord[hotelRecord.length]=hotel;
                 setFilterHotel(hotelRecord);
                    break;
                }
             
               let ismatch=false;
                for(let j=0;j<=hotelNameConversion.length-navDataConversion.length;j++)
              {
                 ismatch=true;
                for(let k=0;k<navDataConversion.length;k++)
                {
                  if(hotelNameConversion[j+k]!==navDataConversion[k])
                  {
                    ismatch=false;
                    break;
                  }
              }
              if(ismatch)
                {
                  hotelRecord[hotelRecord.length]=hotel;
                }
            }
            setFilterHotel([...hotelRecord]);
          
     }
    };
    const convertionFunction=(str)=>{
     return str.toLowerCase().replace(/\s+/g,'');    //tolowercase method used to convert string value to lowercase letter and replace method used to remove spaces with these reqular expression 
    };
    // if(!filterHotel || filterHotel.length===0)
    // {return(
    //   <View style={{flex:1,height:height,width:width,paddingBottom:'18%',backgroundColor:'rgb(240, 240, 240)'}}>
    //      <LinearGradient colors={['rgba(190, 122, 68,0.9)','rgba(219, 188, 160,0.9)','#fff']} start={{x:0,y:1}} end={{x:1,y:0}} style={{height:height*0.25,width:width,borderWidth:1,borderBottomLeftRadius:20,borderBottomRightRadius:20,borderColor:'rgba(219, 188, 160,0.9)',elevation:24}}>
    //                <View style={{flexDirection:'column',borderWidth:1,borderColor:'transparent',top:'15%',left:30,width:width-130}}>
    //                 <Text style={{color:'rgba(31, 31, 31,0.9)',fontSize:25,fontWeight:'bold',borderColor:'transparent',borderWidth:1}}>Beautiful Place To Live</Text>
    //                 <Text  style={{color:'rgba(31, 31, 31,0.9)',borderWidth:1,fontSize:12,borderColor:'transparent',fontWeight:'bold'}}>Find A Source You Want To Spend Time</Text>
    //                 </View> 
    //                 <TouchableOpacity style={{height:height*0.05,width:width-80,backgroundColor:'#fff',flexDirection:'row',top:'17%',borderRadius:15,left:'6%',borderColor:'transparent',borderWidth:1}} onPress={updateData}>
    //                     <TextInput style={{fontSize:20,color:'grey',top:'2%',left:'5%',paddingLeft:'7%',borderWidth:1,borderColor:'transparent',height:height*0.045,width:width-120,alignSelf:'flex-start',justifyContent:'center',backgroundColor:'transparent'}}  underlineColor='grey' activeUnderlineColor='rgba(190, 122, 68,0.9)' onChangeText={(navData)=>{setNavData(navData);
    //                                                                                                                                                                                                                                                            updateData(navData);
    //                     }} value={navData} mode={'flat'}  left={<TextInput.Icon icon={'home-outline'} size={35} style={{borderWidth:1,borderColor:'transparent',borderRadius:0,height:height*0.044,width:width-350}}/>} placeholder="Search Here"/>
    //                 </TouchableOpacity>
    //             </LinearGradient>
    //     <View style={{flex:1,borderWidth:0.5,borderColor:'transaprent',width:width,top:'4%',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
    //      <ShimmerPlaceholder visible={shimmar} shimmerColors={['rgb(31, 31, 31)','rgb(56, 59, 67)','rgb(33, 33, 33)']}location={[0.3, 0.5, 0.7]}   LinearGradient={LinearGradient}>
    //       <ScrollView showsVerticalScrollIndicator={false} style={{ top:'4%'}}>
    //     {filterHotel.map((record,index)=>{
    //         const starRange=getStarRating(record.price);
    //         return(
    //      <View key={record.id} style={{flex:1,width:width}}>
    //         <TouchableOpacity  activeOpacity={0.9} style={{height:height*0.20,width:width-35,borderWidth:1,borderColor:'#fff',borderRadius:10,backgroundColor:'#fff',alignSelf:'center',marginHorizontal:10,marginVertical:10,elevation:24}}>
    //             <View style={{borderWidth:1,borderColor:'transparent',height:height*0.12,width:width-290,borderRadius:10,flexDirection:'row',alignSelf:'flex-start',top:30,left:5}}>
    //             <Image style={{height:height*0.12,width:width-290,borderWidth:1,borderColor:'transparent',borderRadius:10,flexDirection:'column',alignSelf:'flex-start',objectFit:'fill'}} source={{uri:record.hotel}}/>
    //             <TouchableOpacity  onPress={()=> stateChange(record)} activeOpacity={0.6} style={{borderWidth:1,borderColor:'transparent',borderTopRightRadius:10,position:'absolute',bottom:72,left:70,width:width-360,height:height*0.04,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}><Icons name={wishlist.includes(record)?'heart':'heart-o'} color={wishlist.includes(record)? 'red' : '#000'} size={27}/> </TouchableOpacity>
    //                                                                                                                                                                                                                                                                                     {/* {(()=>{let found=false;   //(Immediately Invoke )
    //                                                                                                                                                                                                                                                                                       for(let i=0;i<wishlist.length;i++)
    //                                                                                                                                                                                                                                                                                          {
    //                                                                                                                                                                                                                                                                                             if(wishlist[i]===index)
    //                                                                                                                                                                                                                                                                                             {
    //                                                                                                                                                                                                                                                                                                 found=true;
    //                                                                                                                                                                                                                                                                                                 break;
    //                                                                                                                                                                                                                                                                                             }
    //                                                                                                                                                                                                                                                                                          }found?'heart':'hearto'})()} color={(() => {
    //                                                                                                                                                                                                                                                                                             let found = false;
    //                                                                                                                                                                                                                                                                                             // Reuse the same logic for the color property
    //                                                                                                                                                                                                                                                                                             for (let i = 0; i < wishlist.length; i++) {
    //                                                                                                                                                                                                                                                                                               if (wishlist[i] === index) {
    //                                                                                                                                                                                                                                                                                                 found = true;
    //                                                                                                                                                                                                                                                                                                 break;
    //                                                                                                                                                                                                                                                                                               }
    //                                                                                                                                                                                                                                                                                             }
    //                                                                                                                                                                                                                                                                                             return found ? 'red' : '#000' // Return 'red' if found, '#000' otherwise
    //                                                                                                                                                                                                                                                                           })()}  */}
    //             </View>
    //             <View style={{height:height*0.147,width:width-180,right:6,borderWidth:1,borderColor:'#fff',flexDirection:'row',alignSelf:'flex-end',bottom:80}}>
    //                <View style={{borderWidth:1,borderColor:'transparent',height:height*0.025,width:width-290,marginBottom:100,left:10,marginRight:20,}}> 
    //                 <Text style={{borderWidth:1,borderColor:'transparent',fontSize:13,fontWeight:'bold'}}>{record.name}</Text>
    //                 </View>
    //                 <View style={{borderWidth:1,borderColor:'#fff',height:height*0.1,top:35,width:width-190,right:135}}>
    //                 <Text style={{fontSize:12,left:2,top:2,color:'#000'}}>{record.short_address}</Text>
    //                 <View style={{flexDirection:'row',borderWidth:1,borderColor:'#fff',marginRight:115,justifyContent:'space-evenly',left:5,top:5}}>
    //               <View style={{flexDirection:'row'}}>{starsRender(starRange)}</View> 
    //                 <View><Text style={{left:15}}>{record.reviews}</Text>
    //                 </View>
    //                 </View>
    //                 <Text style={{fontSize:12,fontWeight:'bold',top:4,left:2}}>{record.price}</Text>
    //                 <Text style={{fontSize:11,top:2,left:2,color:'#000'}}>{record.rent}</Text>
    //                 </View>
    //                 </View>

    //             </TouchableOpacity>
            
    //      </View>
    //     )})}
    //        </ScrollView>
    //        </ShimmerPlaceholder> 
    //        </View>
    //        <View style={{position:'absolute',top:height*0.17,elevation:24}}> 
    //         <HomeNavigate/>
    //       </View>
     
    //     <View style={{flexDirection:'row',height:height*0.05,width:width,borderWidth:1,borderColor:'rgba(224, 224, 224,0.9)',borderTopLeftRadius:20,borderTopRightRadius:20,elevation:24,justifyContent:'space-evenly',backgroundColor:'rgba(224, 224, 224,0.9)',bottom:0,position:'absolute'}}>
    //            <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='HomeScreem'?'#fff':'transparent',justifyContent:'center',alignItems:'center',alignSelf:'center',backgroundColor:routing.name=='HomeScreen'?'#fff':'transparent' }}   onPress={()=>Navigation.navigate('HomeScreen')}  ><Icons name='home' size={28} color={'rgba(131, 126, 126, 0.9)'}  /></TouchableOpacity>
    //            <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='ExploreScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='ExploreScreen'?'#fff':'transparent'}} onPress={()=>Navigation.navigate('ExploreScreen')}> <Icons name={'compass'} size={28} color={'rgba(131, 126, 126, 0.9)'} /></TouchableOpacity>
    //            <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='ExploreScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='OfferScreenExample'?'#fff':'transparent'}} onPress={()=>Navigation.navigate('OfferScreenExample')}> <Icons name={'percent'} size={20} color={'rgba(131, 126, 126, 0.9)'} /></TouchableOpacity>
    //            <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='WishlistScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='WishlistScreen'?'#fff':'transparent'}} onPress={()=>Navigation.navigate('WishlistScreen',{wishlist})}><Icons name={'heart'} size={23} color={'rgba(131, 126, 126, 0.9)'}/></TouchableOpacity>
    //            <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='LoginScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='LoginScreen'?'#fff':'transparent'}} onPress={()=>Navigation.navigate('LoginScreen')}><Icons name={'user'} size={23} color={'rgba(131, 126, 126, 0.9)'}/></TouchableOpacity>
        
    //    </View>
    //        </View>)};
    return(
        <View style={{flex:1,height:height,width:width,paddingBottom:'18%',backgroundColor:'rgb(240, 240, 240)'}}>
                <LinearGradient colors={['rgba(190, 122, 68,0.9)','rgba(219, 188, 160,0.9)','#fff']} start={{x:0,y:1}} end={{x:1,y:0}} style={{height:height*0.25,width:width,borderWidth:1,borderBottomLeftRadius:20,borderBottomRightRadius:20,borderColor:'rgba(219, 188, 160,0.9)',elevation:24}}>
                   <View style={{flexDirection:'column',borderWidth:1,borderColor:'transparent',top:'15%',left:30,width:width-130}}>
                    <Text style={{color:'rgba(31, 31, 31,0.9)',fontSize:25,fontWeight:'bold',borderColor:'transparent',borderWidth:1}}>Beautiful Place To Live</Text>
                    <Text  style={{color:'rgba(31, 31, 31,0.9)',borderWidth:1,fontSize:12,borderColor:'transparent',fontWeight:'bold'}}>Find A Source You Want To Spend Time</Text>
                    </View> 
                    <TouchableOpacity style={{height:height*0.05,width:width-80,backgroundColor:'#fff',flexDirection:'row',top:'17%',borderRadius:15,left:'6%',borderColor:'transparent',borderWidth:1}} onPress={updateData}>
                        <TextInput style={{fontSize:20,color:'grey',top:'2%',left:'5%',paddingLeft:'7%',borderWidth:1,borderColor:'transparent',height:height*0.045,width:width-120,alignSelf:'flex-start',justifyContent:'center',backgroundColor:'transparent'}}  underlineColor='grey' activeUnderlineColor='rgba(190, 122, 68,0.9)' onChangeText={(navData)=>{setNavData(navData);
                                                                                                                                                                                                                                                               updateData(navData);
                        }} value={navData} mode={'flat'}  left={<TextInput.Icon icon={'home-outline'} size={35} style={{borderWidth:1,borderColor:'transparent',borderRadius:0,height:height*0.044,width:width-350}}/>} placeholder="Search Here"/>
                    </TouchableOpacity>
                </LinearGradient>
          <ScrollView showsVerticalScrollIndicator={false} style={{ top:'4%'}}>
           
        {filterHotel.map((record,index)=>{
            const starRange=getStarRating(record.price);
            return(
         <View key={record.id} style={{flex:1,height:height*0.20,width:width-35,marginHorizontal:10,marginVertical:10}}>
           {/* <ShimmerPlaceholder  visible={shimmar} shimmerColors={['rgba(31, 31, 31,0.5)','rgba(56, 59, 67,0.7)']}  LinearGradient={LinearGradient}  style={{flex:1,height:height*0.20,width:width-35,marginHorizontal:10,marginVertical:10}}> */}
            <TouchableOpacity  activeOpacity={0.9} style={{height:height*0.20,width:width-35,borderWidth:1,borderColor:'transparent',borderRadius:10,backgroundColor:'#fff',alignSelf:'center',elevation:24}}>
                <View style={{borderWidth:1,borderColor:'transparent',height:height*0.12,width:width-290,borderRadius:10,flexDirection:'row',alignSelf:'flex-start',top:30,left:5}}>
                <Image style={{height:height*0.12,width:width-290,borderWidth:1,borderColor:'transparent',borderRadius:10,flexDirection:'column',alignSelf:'flex-start',objectFit:'fill'}} source={{uri:record.hotel}}/>
                <TouchableOpacity  onPress={()=> stateChange(record)} activeOpacity={0.6} style={{borderWidth:1,borderColor:'transparent',borderTopRightRadius:10,position:'absolute',bottom:72,left:70,width:width-360,height:height*0.04,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}><Icons name={wishlist.includes(record)?'heart':'heart-o'} color={wishlist.includes(record)? 'red' : '#000'} size={27}/> </TouchableOpacity>
                                                                                                                                                                                                                                                                                        {/* {(()=>{let found=false;   //(Immediately Invoke )
                                                                                                                                                                                                                                                                                          for(let i=0;i<wishlist.length;i++)
                                                                                                                                                                                                                                                                                             {
                                                                                                                                                                                                                                                                                                if(wishlist[i]===index)
                                                                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                                                                    found=true;
                                                                                                                                                                                                                                                                                                    break;
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                             }found?'heart':'hearto'})()} color={(() => {
                                                                                                                                                                                                                                                                                                let found = false;
                                                                                                                                                                                                                                                                                                // Reuse the same logic for the color property
                                                                                                                                                                                                                                                                                                for (let i = 0; i < wishlist.length; i++) {
                                                                                                                                                                                                                                                                                                  if (wishlist[i] === index) {
                                                                                                                                                                                                                                                                                                    found = true;
                                                                                                                                                                                                                                                                                                    break;
                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                return found ? 'red' : '#000' // Return 'red' if found, '#000' otherwise
                                                                                                                                                                                                                                                                              })()}  */}
                </View>
                <View style={{height:height*0.147,width:width-180,right:6,borderWidth:1,borderColor:'#fff',flexDirection:'row',alignSelf:'flex-end',bottom:80}}>
                   <View style={{borderWidth:1,borderColor:'transparent',height:height*0.025,width:width-290,marginBottom:100,left:10,marginRight:20,}}> 
                    <Text style={{borderWidth:1,borderColor:'transparent',fontSize:13,fontWeight:'bold'}}>{record.name}</Text>
                    </View>
                    <View style={{borderWidth:1,borderColor:'#fff',height:height*0.1,top:35,width:width-190,right:135}}>
                    <Text style={{fontSize:12,left:2,top:2,color:'#000'}}>{record.short_address}</Text>
                    <View style={{flexDirection:'row',borderWidth:1,borderColor:'#fff',marginRight:115,justifyContent:'space-evenly',left:5,top:5}}>
                  <View style={{flexDirection:'row'}}>{starsRender(starRange)}</View> 
                    <View><Text style={{left:15}}>{record.reviews}</Text>
                    </View>
                    </View>
                    <Text style={{fontSize:12,fontWeight:'bold',top:4,left:2}}>{record.price}</Text>
                    <Text style={{fontSize:11,top:2,left:2,color:'#000'}}>{record.rent}</Text>
                    </View>
                    </View>

                </TouchableOpacity>
             {/* </ShimmerPlaceholder> */}
         </View>
        )})}
       
           </ScrollView>
          <View style={{position:'absolute',top:height*0.17,elevation:24}}> 
            <HomeNavigate/>
          </View>
     
        <View style={{flexDirection:'row',height:height*0.05,width:width,borderWidth:1,borderColor:'rgba(224, 224, 224,0.9)',borderTopLeftRadius:20,borderTopRightRadius:20,elevation:24,justifyContent:'space-evenly',backgroundColor:'rgba(224, 224, 224,0.9)',bottom:0,position:'absolute'}}>
               <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='HomeScreem'?'#fff':'transparent',justifyContent:'center',alignItems:'center',alignSelf:'center',backgroundColor:routing.name=='HomeScreen'?'#fff':'transparent' }}   onPress={()=>Navigation.navigate('HomeScreen')}  ><Icons name='home' size={28} color={'rgba(131, 126, 126, 0.9)'}  /></TouchableOpacity>
               <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='ExploreScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='ExploreScreen'?'#fff':'transparent'}} onPress={()=>Navigation.navigate('ExploreScreen')}> <Icons name={'compass'} size={28} color={'rgba(131, 126, 126, 0.9)'} /></TouchableOpacity>
               <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='ExploreScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='OfferScreenExample'?'#fff':'transparent'}} onPress={()=>Navigation.navigate('OfferScreenExample')}> <Icons name={'percent'} size={20} color={'rgba(131, 126, 126, 0.9)'} /></TouchableOpacity>
               <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='WishlistScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='WishlistScreen'?'#fff':'transparent'}} onPress={()=>Navigation.navigate('WishlistScreen',{wishlist})}><Icons name={'heart'} size={23} color={'rgba(131, 126, 126, 0.9)'}/></TouchableOpacity>
               <TouchableOpacity style={{borderWidth:1,borderRadius:20,height:height*0.04,width:width-370,borderColor:routing.name=='LoginScreem'?'#fff':'transparent',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:routing.name=='LoginScreen'?'#fff':'transparent'}} onPress={()=>Navigation.navigate('LoginScreen')}><Icons name={'user'} size={23} color={'rgba(131, 126, 126, 0.9)'}/></TouchableOpacity>
        
       </View>
        </View>
    );
};
export default Home;