import React, { useEffect, useState } from 'react';
import {View,Text, Dimensions, TouchableOpacity,FlatList,ScrollView,Image,Animated} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import NavBar from './NavBar';
import hotelRecords from './Data';
import { useNavigation } from '@react-navigation/native';

const Explore=()=>{
    const[dropdown,setDropdown]=useState(false);
    const[filterRecords,setFilterRecords]=useState(hotelRecords);
    const[showItem,setShowItem]=useState('All');
    const{height,width}=Dimensions.get('screen');
    
    const showDropdown=()=>{
     setDropdown(true);
    };
    const FilterHotels=(minPrice,maxPrice)=>{
        let FilterData=[];
        for(let i=0;i<hotelRecords.length;i++)
     {
         let Filter=hotelRecords[i]
      if(Filter.price>=minPrice && Filter.price<=maxPrice)
        {
           FilterData[FilterData.length]=Filter;  
        } 
          }
          setFilterRecords([]);
          setFilterRecords(FilterData);
            };
    const Navigation=useNavigation();
    const Navigate=(record)=>{
        Navigation.navigate('DetailExample',{record});
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
       else{
        return 5;
       }
    };
    const renderStars=(stars)=>{
        const starIcons=[];
        for(let i=0;i<5;i++)
        (
            starIcons[starIcons.length]=<Icons name={i<stars?'star':'star-outline'} color='#ff8c00' size={18}/>
        )
        return starIcons;
    };
   
    // useEffect(()=>{
    //     let threeStarFilter=[];
    //     let fourStarFilter=[];
    //     let fiveStarFilter=[];
    //     for(let j=0;j<hotelRecords.length;j++)
    //     {
    //        let stars=hotelRecords[j];
    //        if(stars.price>=2000 && stars.price<=4000)
    //        {
    //         threeStarFilter[threeStarFilter.length]=stars;
    //        }
    //        else if(stars.price>=4100 && stars.price<=8000)
    //        {
    //         fourStarFilter[fourStarFilter.length]=stars;
    //        }
    //        else{
    //         fiveStarFilter[fiveStarFilter.length]=stars;
    //        }
    //     }

    //     setThreeStar(threeStarFilter);
    //     setFourStar(fourStarFilter);
    //     setFiveStar(fiveStarFilter);
    // },[hotelRecords]);
    return(
        <View style={{flex:1,backgroundColor:'rgba(240, 240, 240,0.9)'}}>
           <View style={{borderWidth:0.5,height:height*0.07,width:width,borderBottomLeftRadius:10,borderBottomRightRadius:10,flexDirection:'row',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'flex-start',backgroundColor:'rgba(240, 240, 240,0.9)',elevation:10}}>
            <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-370,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}  onPress={()=>Navigation.navigate('HomeScreen')}><Icons name={'keyboard-arrow-left'}  size={35}  color={'rgba(31, 31, 31,0.9)'}/></TouchableOpacity>
            <View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-200,left:'17%',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}><Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)'}}>Explore Screen</Text></View>
            </View>
           <View style={{borderWidth:0.1,borderColor:'rgba(31, 31, 31,0.9)',borderRadius:15,elevation:24,height:height*0.065,width:width-200,alignSelf:'flex-end',right:'1%',bottom:0,top:'2%',backgroundColor:'rgba(219, 188, 160,0.6)'}}>
             <TouchableOpacity style={{borderWidth:0.1,borderColor:'rgba(31, 31, 31,0.9)',borderRadius:15,height:height*0.065,width:width-200,backgroundColor:'rgba(237, 244, 254,0.9)'}}  activeOpacity={0.88} onPress={showDropdown}>
             <View style={{borderWidth:0.1,borderColor:'rgba(31, 31, 31,0.9)',borderRadius:15,height:height*0.065,width:width-200,alignSelf:'center',justifyContent:'space-between',flexDirection:'row',backgroundColor:'rgba(237, 244, 254,0.9)'}}>
                <View style={{borderWidth:0.2,borderColor:'transparent',height:height*0.065,width:width-240,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}><Text style={{fontSize:20,textAlign:'center'}}>{showItem}</Text></View>
               <View  style={{borderWidth:0.2,borderColor:'transparent',height:height*0.065,width:width-370,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}> <Icons name={'keyboard-arrow-down'} size={35}/></View>
                </View>
             </TouchableOpacity>
             </View>
            <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.72,width:width-10,top:'3%',alignSelf:'center'}}>
                <FlatList
                data={filterRecords}
                renderItem={({item})=>{
                    const starRating=getStarRating(item.price);
                    return(<View style={{borderWidth:0.2,borderColor:'transparent',height:height*0.25,width:width-250,borderRadius:10,backgroundColor:'#fff',elevation:24}}>
                        <TouchableOpacity  onPress={()=>Navigate(item)}style={{borderWidth:0.2,borderColor:'transparent',borderRadius:10,height:height*0.25,width:width-250}} activeOpacity={0.88} >
                         <View style={{height:height*0.25,width:width-250}}>
                            <View style={{height:height*0.15,width:width-250,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                                <Image source={{uri:item.hotel}} style={{borderWidth:0.5,borderColor:'transparent',height:height*0.15,width:width-250,objectFit:'fill',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                            </View>
                            <View style={{flexDirection:'column',borderWidth:0.5,borderColor:'transparent',height:height*0.092,width:width-260,top:'1%',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
                              <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.036,width:width-260}}>
                                <Text style={{textAlign:'center',height:height*0.026,top:'20%',width:width-260,borderWidth:0.5,borderColor:'transparent',fontSize:17,fontWeight:'bold'}}>{item.name}</Text>
                                </View>
                                <View style={{borderWidth:0.2,borderColor:'rgba(31, 31, 31,0.9)',top:'7%',height:height*0.00,width:width-260,alignSelf:'center'}}/>
                                <View style={{flexDirection:'column',height:height*0.034,width:width-260,borderWidth:0.5,borderColor:'transparent'}}>
                                <View style={{flexDirection:'row',height:height*0.024,width:width-318,borderWidth:0.5,borderColor:'transparent',alignContent:'center',alignItems:'center',alignSelf:'flex-start',top:'20%',justifyContent:'flex-start'}}>
                                {renderStars(starRating)}
                                    </View>
                                </View>
                                <Text style={{textAlign:'right',height:height*0.022,width:width-260,borderWidth:0.5,borderColor:'transparent',fontSize:15,fontWeight:'500',fontStyle:'italic'}}>{item.reviews}</Text>
                            </View>
                         </View>
                        </TouchableOpacity>
                        </View>)}
                }
                columnWrapperStyle={{justifyContent:'space-between',marginHorizontal:'4%',marginVertical:'2%'}}
                numColumns={2}/>
                </View> 
                {dropdown&&(
                <View style={{borderWidth:0.2,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.25,width:width-220,position:'absolute',alignSelf:'flex-end',right:'3.5%',top:'15%',backgroundColor:'rgb(237, 244, 254)'}}>
                    <ScrollView style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.25,width:width-220}} >
                     <TouchableOpacity style={{borderWidth:0.2,height:height*0.065,width:width-220}} onPress={()=>{FilterHotels(4000,5000);
                                                                                                                    setShowItem('(Under Rs 4000-5000)');
                                                                                                                    setDropdown(false); 
                     }}>
                        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',height:height*0.055,width:width-220}}>
                        <Text style={{fontSize:17,fontWeight:'500',textAlign:'center'}}>(Under Rs 4000-5000)</Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{borderWidth:0.2,height:height*0.065,width:width-220}} onPress={()=>{FilterHotels(5100,6000);
                                                                                                                     setShowItem('Under Rs 5100-6000');
                                                                                                                     setDropdown(false);
                    }}>
                        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',height:height*0.055,width:width-220}}>
                        <Text style={{fontSize:17,fontWeight:'500',textAlign:'center'}}>(Under Rs 5100-6000)</Text>
                        </View>
                    </TouchableOpacity>  <TouchableOpacity style={{borderWidth:0.2,height:height*0.065,width:width-220}} onPress={()=>{FilterHotels(6100,7000);
                                                                                                                                         setShowItem('Under Rs 6100-7000');
                                                                                                                                         setDropdown(false);
                    }}>
                        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',height:height*0.055,width:width-220}}>
                        <Text style={{fontSize:17,fontWeight:'500',textAlign:'center'}}>(Under Rs 61000-7000)</Text>
                        </View>
                    </TouchableOpacity>  <TouchableOpacity style={{borderWidth:0.2,height:height*0.065,width:width-220}} onPress={()=>{FilterHotels(7100,8000);
                                                                                                                                            setShowItem('Under Rs 7100-8000');
                                                                                                                                            setDropdown(false);
                    }}>
                        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',height:height*0.055,width:width-220}}>
                        <Text style={{fontSize:17,fontWeight:'500',textAlign:'center'}}>(Under Rs 7100-8000)</Text>
                        </View>
                    </TouchableOpacity> 
                     <TouchableOpacity style={{borderWidth:0.2,height:height*0.065,width:width-220}} onPress={()=>{FilterHotels(8100,9000);
                                                                                                                                        setShowItem('Under Rs 8100-9000');
                                                                                                                                       setDropdown(false);
                    }}>
                        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',height:height*0.055,width:width-220}}>
                        <Text style={{fontSize:17,fontWeight:'500',textAlign:'center'}}>(Under Rs 8100-9000)</Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{borderWidth:0.2,height:height*0.065,width:width-220}} onPress={()=>{FilterHotels(9100,10000);
                                                                                                                                        setShowItem('Under Rs 9100-10000');
                                                                                                                                       setDropdown(false);
                    }}>
                        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',height:height*0.055,width:width-220}}>
                        <Text style={{fontSize:17,fontWeight:'500',textAlign:'center'}}>(Under Rs 9100-10000)</Text>
                        </View>
                    </TouchableOpacity>   
                    </ScrollView>
                    </View>
             )}
            <View style={{bottom:0,flexDirection:'row',position:'absolute'}}>
                <NavBar/>
            </View>
        </View>
    );
};
export default Explore;