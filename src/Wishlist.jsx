import React, { useState,useEffect, useCallback } from 'react';
import {View,Text, Dimensions,FlatList, TouchableOpacity,Image,Animated, SectionList, SafeAreaView, Platform, SafeAreaViewBase} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NavBar from './NavBar';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
const Wishlist=()=>{
    const[wishlist,setWishlist]=useState([]);
    const{height,width}=Dimensions.get('screen');
    const[showWishlist,setShowWishlist]=useState(true);
    const[wishlistData,setWishlistData]=useState([]);
       useFocusEffect(
           useCallback(()=>{
            let datarender=true;
               const fetchHotels=async()=>{
                  
                    try{
                      const wishlisttoken=await EncryptedStorage.getItem("settoken");
                      console.log('wishlisttoken',wishlisttoken);
                      const headers={
                        'Authorization':`Bearer ${wishlisttoken}`,
                      };
                       let response= await fetch('http://10.0.2.2:3000/api/wishlistrecords/:wishlist',{headers});
                       if(response.ok)
                       {
                        let data=await response.json();
                        // console.log('data',data);
                        if(datarender)
                        {
                          setWishlist(data);
                          for(let i=0;i<data.length;i++)
                          {
                          setWishlistData(data[0]);
                          }
                          
                        }
                      //  if(data)
                      //  {
                      //   let storeWishlist=[...wishlist];
                      //   let updateWishlist=[];
                      //    for(let i=0;i<data.length;i++)
                      //    {
                      //     if(data[i] !==updateWishlist[i])
                      //     {updateWishlist[i]=data[i];}
                      //    }
                      //    storeWishlist=updateWishlist;
                      //    setWishlist(storeWishlist);
                      //  }
                       else{
                        console.log('error occur while getting response',response.status);
                       }
                       }
                   }
                   catch(err){
                        console.log('In Catch',err);
                   }}
               
               fetchHotels();
               return()=>{
                datarender=false;
               }
           },[])
       );
    
    const Navigation=useNavigation();
    const animation=new Animated.Value(0);
    useEffect(()=>{
        Animated.loop(
            Animated.sequence
           ([ Animated.timing(animation,{
                toValue:1,
                duration:1200,
                useNativeDriver:true,
            }),
            Animated.timing(animation,{
                toValue:0,
                duration:1200,
                useNativeDriver:true,
            })])).start();
    },[animation]);
   
    const fadeOpacity=animation.interpolate({
        inputRange:[0,1],
        outputRange:[0.85,1],
    });
    const changeColor=animation.interpolate({
        inputRange:[0,1],
        outputRange:['rgb(65, 122, 153)','rgb(50, 100, 128)'],
    });
    const textColor=animation.interpolate({
        inputRange:[0,1],
        outputRange:['rgb(39, 38, 38)','rgb(31, 31, 31)']
    });
    const renderStars=(wishlistData)=>
    {
       let stars=0;
        let starsRender=[];
        let itemPrice=wishlistData.price;
        if(itemPrice>=2000 && itemPrice<=4000)
        {
            stars=3;
            if(stars!==0)
                { for(let k=0;k<5;k++)
                     {
                         starsRender[starsRender.length]=<Icons key={k} name={k<stars?'star':'star-outline'} color={'#ff8c00'} size={18}/>
                     }
                     return <View style={{flexDirection:'row',borderWidth:1,borderColor:'transparent'}}>{starsRender}</View>
                    }
        }
        else if(itemPrice>=4100 && itemPrice<=8000)
        {
            stars=4;
            if(stars!==0)
                { for(let i=0;i<5;i++)
                     {
                         starsRender[starsRender.length]=<Icons ey={i} name={i<stars?'star':'star-outline'} color={'#ff8c00'} size={18}/>
                     }
                     return <View style={{flexDirection:'row',borderWidth:1,borderColor:'transparent'}}>{starsRender}</View>
                    }
        }
        else {
            stars=5;
            if(stars!==0)
                { for(let j=0;j<5;j++)
                     {
                         starsRender[starsRender.length]=<Icons key={j} name={j<stars?'star':'star-outline'} color={'#ff8c00'} size={18}/>
                     }
                     return <View style={{flexDirection:'row',borderWidth:1,borderColor:'transparent'}}>{starsRender}</View>
                    }
        }
    };
    if ( !wishlist||wishlist.length==0) {
        console.log('wishlist length:=',wishlist.length);
       return(
        <SafeAreaView style={{flex:1}} edges={Platform.OS==='ios'?['top','bottom']:[]}>
        <LinearGradient colors={['rgba(190, 122, 68,0.9)','rgba(219, 188, 160,0.9)','#fff']} start={{x:0,y:1}} end={{x:1,y:0}} style={{flex:1}}>
            <View style={{borderWidth:0.5,height:height*0.07,width:width,borderBottomLeftRadius:10,borderBottomRightRadius:10,flexDirection:'row',justifyContent:'flex-start',backgroundColor:'rgba(224, 224, 224,0.9)'}}>
            <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-430,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',left:'4%'}} onPress={()=>Navigation.navigate('OfferScreenExample')}><Icons name='keyboard-arrow-left' color={'rgba(31, 31, 31,0.9)'} size={35} onPress={()=>Navigation.navigate('OfferScreenExample')}/></TouchableOpacity>
             <View style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-230,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',left:'23%'}}><Text style={{fontSize:30,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)',textAlign:'center'}}>Wishlist</Text></View>
            </View>
            <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.81,top:'1%',width:width-10,alignSelf:'center'}}>
           <View style={{borderWidth:0.5,borderColor:'rgba(131, 126, 126, 0.9)',height:height*0.19,width:width-50,alignSelf:'center',borderRadius:10,justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:'rgba(237, 244, 254,0.9)',elevation:24,top:'30%'}}>
            <View style={{borderWidth:0.5,borderColor:'transparent',borderTopLeftRadius:10,borderTopRightRadius:10,height:height*0.09,width:width-50,alignSelf:'center',alignItems:'center',justifyContent:'center',alignContent:'center'}}><Text style={{fontSize:21,fontWeight:'bold',textAlign:'center',fontStyle:'italic'}}>No Selected Wishlist Data Available</Text></View>
            <View style={{borderWidth:0.5,height:height*0.00,width:width-90}}/>
            <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.055,width:width-50,alignSelf:'center',alignItems:'center',justifyContent:'flex-end',alignContent:'center'}}><Text style={{fontSize:20,fontWeight:'500',borderColor:'rgba(31, 31, 31,0.9)',color:'rgba(131, 126, 126, 0.9)'}}>(First Select the Hotel )</Text></View>
            <View style={{borderWidth:0.5,borderColor:'transparent',borderBottomLeftRadius:10,borderBottomRightRadius:10,height:height*0.047,width:width-50,alignSelf:'center',alignItems:'center',justifyContent:'flex-start',alignContent:'center'}}><Text style={{fontSize:20,fontWeight:'500',borderColor:'rgba(31, 31, 31,0.9)',color:'rgba(131, 126, 126, 0.9)'}}>(Your Want to Add In Wishlist ) </Text></View>
            </View>
            </View>
           <View style={{bottom:'0%',position:'absolute'}}>
            <NavBar/>
            </View>
        </LinearGradient>
        </SafeAreaView>
       );
        };
        
  // console.log('wishlist length:=>',wishlist);
     
    return(
      <SafeAreaView style={{flex:1}} edges={Platform.OS==='ios'?['top','bottom']:[]}>
        <View style={{flex:1,backgroundColor:'rgba(240, 240, 240,0.9)'}}>
            <View style={{borderWidth:0.5,height:height*0.07,width:width,borderBottomLeftRadius:10,borderBottomRightRadius:10,flexDirection:'row',justifyContent:'flex-start',backgroundColor:'rgba(224, 224, 224,0.9)'}}>
            <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-430,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',left:'2%'}} onPress={()=>Navigation.navigate('OfferScreenExample')}><Icons name='keyboard-arrow-left' color={'rgba(31, 31, 31,0.9)'} size={35} onPress={()=>Navigation.navigate('OfferScreenExample')}/></TouchableOpacity>
             <View style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-230,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',left:'23%'}}><Text style={{fontSize:30,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)',textAlign:'center'}}>Wishlist</Text></View>
            </View>
            <View style={{flexDirection:'row',borderWidth:0.5,borderColor:'rgba(240, 240, 240,0.9)',height:height*0.73,width:width-10,top:'4%',left:'1%'}}>
            <View style={{borderWidth: 0.5, borderColor:'#000', height: height * 0.73, width: width - 290,alignSelf: 'flex-start'}}>
  <FlatList
  showsVerticalScrollIndicator={false} 
    data={wishlist}
    keyExtractor={(item) => item.hotelid.toString()} // Ensure each item has a unique 'key'
    renderItem={({item}) => {
      return (
        <View  key={item.hotelid}
          style={{
            borderWidth: 0.5, 
            height: height * 0.17, 
            width: width - 290, 
            marginHorizontal: '5%', 
            marginVertical: '5%', 
            borderColor: 'rgba(31, 31, 31, 0.9)', 
            alignSelf: 'center', 
            borderRadius: 10, 
            backgroundColor: wishlistData === item ? 'rgba(190, 122, 68, 0.9)' : '#fff', 
            elevation: 24
          }}
        >
          <TouchableOpacity  
            style={{
              borderWidth: 0.5, 
              height: height * 0.15, 
              width: width - 310, 
              marginHorizontal: '5%', 
              marginVertical: '5%', 
              borderColor: 'transparent', 
              alignSelf: 'center', 
              borderRadius: 20
            }} 
            activeOpacity={0.88} 
            onPress={() => setWishlistData(item)}
          >
            {/* Ensure the image is properly displayed */}
            <Image 
              source={{uri: item.hotel}} 
              style={{
                height: height * 0.15, 
                width: width - 310, 
                objectFit: 'fill', 
                borderWidth: 1, 
                borderColor: 'transparent', 
                borderRadius: 20
              }} 
            />
          </TouchableOpacity>
        </View>
      );
    }}
  />
</View>

            <View style={{borderWidth: 0.5, borderColor: '#000', height: height * 0.73, width: width - 132, alignSelf: 'flex-end'}}>
  {showWishlist && (
    <View key={wishlist.hotelid} style={{borderWidth: 0.3, borderColor: 'rgba(31, 31, 31, 0.9)', borderRadius: 10, height: height * 0.45, width: width - 142, top: '20%', alignSelf: 'center', backgroundColor: '#fff', elevation: 24}}>
      
      {/* Image Section */}
      <View style={{borderWidth: 0.5, borderColor: 'transparent', height: height * 0.18, width: width - 165, alignSelf: 'center', top: '2%', borderRadius: 10}}>
        <Image 
          source={{uri: wishlistData.hotel}} 
          style={{height: height * 0.18, width: width - 165, objectFit: 'fill', alignSelf: 'center', borderWidth: 1, borderColor: 'transparent', borderRadius: 10}} 
        />
      </View>

      {/* Hotel Name */}
      <View style={{borderWidth: 1, borderColor: 'transparent', height: height * 0.045, width: width - 150, top: '3%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: '500', textAlign: 'center'}}>{wishlistData.name}</Text>
      </View>

      {/* Separator Line */}
      <View style={{borderWidth: 0.5, height: height * 0.00, width: width - 150, top: '5%', alignSelf: 'center'}} />

      {/* Reviews and Stars Section */}
      <View style={{borderWidth: 1, borderColor: 'transparent', height: height * 0.045, width: width - 150, top: '4%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{borderWidth: 1, borderColor: 'transparent', alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', left: '2%'}}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>{wishlistData.reviews}</Text>
        </View>
        <View style={{borderWidth: 1, borderColor: 'transparent', right: '2%', flexDirection: 'row'}}>
          {renderStars(wishlistData)}
        </View>
      </View>

      {/* Price Section */}
      <View style={{borderWidth: 0.5, borderColor: 'transparent', height: height * 0.035, width: width - 150, top: '5%', alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold', right: '2%'}}>Rs -</Text>
        <Text style={{fontSize: 18, textAlign: 'center', fontWeight: '500'}}>{wishlistData.price}</Text>
      </View>

      {/* Offer and Person Section */}
      <View style={{borderWidth: 0.5, borderColor: 'transparent', height: height * 0.065, width: width - 150, alignSelf: 'center', top: '5%'}}>
        <Text style={{borderWidth: 1, borderColor: 'transparent', height: height * 0.022, width: width - 250, alignSelf: 'flex-end', paddingLeft: '5%'}}>{wishlistData.person}</Text>
        {wishlistData.offer_price ? (
          <View key={wishlistData.hotelid}>
          <TouchableOpacity activeOpacity={0.88} style={{borderWidth: 1, borderColor: '#fff', height: height * 0.04, width: width - 220, flexDirection: 'row'}} onPress={() => Navigation.navigate('OfferScreenExample')}>
            <Animated.View style={{borderWidth: 1, borderColor: 'transparent', opacity: fadeOpacity, height: height * 0.038, width: width - 250, backgroundColor: changeColor}}>
              <Animated.Text style={{borderWidth: 1, borderColor: 'transparent', height: height * 0.03, width: width - 270, textAlign: 'center', fontSize: 17, fontWeight: 'bold', top: '8%', color: textColor}}>
                Offers Available
              </Animated.Text>
            </Animated.View>
            <Animated.View style={{borderWidth: 1, borderColor: 'transparent', opacity: fadeOpacity, backgroundColor: changeColor, height: height * 0.028, width: width - 388, transform: [{rotate: '224deg'}], right: '6%', top: '12%'}} />
          </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {/* Book Now Button */}
      <View style={{borderWidth: 0.5, borderColor: 'transparent', height: height * 0.055, width: width - 150, bottom: 0, position: 'absolute', alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={{borderWidth: 0.5, height: height * 0.046, width: width - 220, borderRadius: 10, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'rgba(190, 122, 68,0.9)', borderColor: 'rgba(190, 122, 68,0.9)', elevation: 14}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Book Now</Text>
        </TouchableOpacity>
      </View>

    </View>
  )}
</View>

            </View>
            <View style={{bottom:'0%',position:'absolute'}}>
            <NavBar/>
            </View>
        </View>
        </SafeAreaView>
    );
};
export default Wishlist;