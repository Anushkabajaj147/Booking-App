import React, { useState ,useEffect, useCallback} from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList,Animated,Alert, SafeAreaView, Platform } from 'react-native';
import NavBar from './NavBar';
import Icons from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { duration } from 'moment';

const LoginScreen = () => {
    const Navigation = useNavigation();
    const { height, width } = Dimensions.get('screen');
    const routing=useRoute();
    const[getData,setGetData]=useState(true);
    const[filterRecord,setFilterRecord]=useState([]);
    const[showData,setShowData]=useState(false);
    const[alert,setAlert]=useState(false);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[activeName,setActiveName]=useState(false);
    const[activeEmail,setActiveEmail]=useState(false);

            const opacityValue= new Animated.Value(0);
        useEffect(()=>{
       
          Animated.timing(opacityValue,{
                toValue:0.5,
                duration:500,
                useNativeDriver:true
            }).start();
},[opacityValue]);

       const changeOpacity=opacityValue.interpolate({
        inputRange:[0,0.5],
        outputRange:[0.7,1]
       });
      
  
    
    useFocusEffect(
        useCallback(()=>{
            const userIdScreen=async()=>{
                 try{
                const UserLoginScreen=await EncryptedStorage.getItem("settoken");
                console.log('userLoginScreen',UserLoginScreen);
                const headers={
                    'Authorization':`Bearer ${UserLoginScreen}`,
                };
                const response=await fetch('http://10.0.2.2:3000/api/userLoginScreen',{headers});
                if(response.ok)
                {
                    const data=await response.json();
                    if(getData)
                   { 
                    setFilterRecord(data);
                    console.log('filterrecords',filterRecord);
                   }
                }
                else{
                    console.log('Error occur while getting response',response.status);
                }
              }
              catch(err){
                if(err)
                {
                    console.log('In Catah',err);
                }
              }
            
              return()=>{
                setGetData(false);
              }
            };
            userIdScreen();
          
        },[])
    );
    if(!filterRecord || filterRecord.length===0)
        {
            console.log('filterrecord is empty');
        }
    const updateToken=async()=>{
        let checkData=true;
       try{
         await EncryptedStorage.removeItem("settoken");
        // console.log('token is successfully removed');
        if(checkData)
        {
            await setAlert(true);
             Navigation.navigate('LoginExample');
        }
        else{
            setAlert(false);
        }
       }
       catch(err){
        if(err)
        {
            console.log('In catch',err);
        }
       } 

       return()=>{
        checkData=false;
       }

    };
    const userIdentity=(item)=>{
        setName(item.first_name);
        setEmail(item.email);
    }
    return (
        <SafeAreaView style={{flex:1}} edges={Platform.OS==='ios'?['top','bottom']:[]}>
        <View style={{ backgroundColor: 'rgba(240, 240, 240,0.9)', flex: 1 }}>
            <LinearGradient
                colors={['rgba(190, 122, 68,0.9)', 'rgba(219, 188, 160,0.9)', '#fff']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{borderWidth: 1, borderBottomLeftRadius: 40,borderBottomRightRadius: 40,borderColor: 'rgba(219, 188, 160,0.9)',elevation: 24}}>
                {/* Header Section */}
                <View style={{borderWidth: 1,top:'5%',height: height * 0.038,width: width-300,alignSelf:'flex-end',flexDirection: 'row',borderColor: 'transparent',transform:[{scaleX:-1}],right:'4%'}}>
                    <TouchableOpacity style={{borderWidth: 1,height: height * 0.038,width: width - 370,borderColor: 'transparent',position: 'absolute', justifyContent: 'flex-end'}} onPress={()=>Navigation.navigate('EditIdExample')}><Icons name="bars" size={30} color={'rgba(31, 31, 31,0.9)'} /></TouchableOpacity>
                </View>

                {/* Profile Section */}
                <View style={{height: height * 0.215,width: width - 240, borderWidth: 1, borderColor:'transparent',alignSelf: 'flex-start', flexDirection: 'row',marginTop: '10%',left:'2%',bottom:'6%'}}>
                          <Image
                        source={require('./images/womenimageone.jpg')}
                       style={{ height: height * 0.17,width: width - 250,objectFit: 'cover', borderWidth: 1,borderRadius: 80,borderColor: 'transparent',top:'2%'}}/>
                    <TouchableOpacity style={{ height: height * 0.06,width: width - 350,justifyContent: 'center',alignContent: 'center',alignItems: 'center',borderRadius: 50,borderColor: '#fff',right: '40%',bottom:'6%', borderWidth: 1,alignSelf: 'flex-end',backgroundColor: 'rgba(190, 122, 68,0.9)'}}><Icons name="camera" size={28} color="#fff" /></TouchableOpacity>
                     </View>

                {/* User Information */}
               
         <View style={{bottom:'40%',borderWidth:1,borderColor:'transparent',width:width-180,alignSelf:'flex-end',right:'3%'}}>
          <FlatList
           data={filterRecord}
           renderItem={({item})=>{ userIdentity(item);
   return(
     <View>
        <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.03,fontSize:18,fontWeight:'500',fontStyle:'italic',textAlign:'center',color:'rgb(56, 59, 67)'}}>{item.email}</Text>
        <Text  style={{borderWidth:1,borderColor:'transparent',height:height*0.03,fontSize:20,fontWeight:'500',textAlign:'center'}}>{item.first_name}</Text>
    </View>)}}
           />
           </View>
             
             
           
        

               
          
           
            </LinearGradient>

            {/* Booking Section */}
            <View style={{ borderWidth: 0.2,height: height * 0.1, width: width - 50,alignSelf: 'center', borderRadius: 20,position: 'absolute',top: '30%',backgroundColor: '#fff'}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ borderWidth: 1,borderColor: 'transparent',height: height * 0.035, width: width - 200,left: '2%',fontSize: 18,fontWeight: 'bold',color: 'rgba(31, 31, 31,0.9)'}}>Your Booking:</Text>
                    <Text style={{borderWidth: 1, height: height * 0.03, width: width - 265, right: 0,position: 'absolute',fontSize: 16, fontWeight: 'bold',color: '#72badb',borderColor: 'transparent'}}>Manage Booking</Text>
                        </View>
                <View style={{borderWidth: 0.2,flexDirection: 'row',justifyContent: 'space-evenly',height: height * 0.04,width: width - 50, borderColor: 'transparent'}}>
                    {['Flights', 'Hotels', 'Trains'].map((label, index) => (
                        <View  key={index}  style={{ borderWidth: 0.1,height: height * 0.04,width: width - 300,justifyContent: 'center', alignContent: 'center',alignItems: 'center',borderRadius: 10,backgroundColor: 'rgba(237, 244, 254,0.9)', elevation: 5}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(31, 31, 31,0.9)' }}>{label}</Text>
                        </View>
                     ))}
                     </View>
                 </View>

            {/* Options Section */}
             {/* <View style={{ marginVertical: '20%' }}>
                 {[{ icon: 'lock', label: 'Password' }, { icon: 'bookmark', label: 'Bookmark' }, { icon: 'map-marker', label: 'Location' }, { icon: 'sign-out', label: 'Logout' }].map((item, index) => (
                     <TouchableOpacity key={index} style={{height: height * 0.055,width: width - 100, borderWidth: 0.5,alignSelf: 'center', borderRadius: 14,flexDirection: 'row', marginVertical: '4%', backgroundColor: '#fff',elevation: 14}}>
                         <View style={{ borderWidth: 1,height: height * 0.04,width: width - 390,justifyContent: 'center',left: 10,borderColor: 'transparent'}}>
                             <Icons name={item.icon} size={24} color={'rgba(31, 31, 31,0.9)'} />
                             </View>
                         <View style={{borderWidth: 1,height: height * 0.04,width: width - 300,justifyContent: 'center',left: 15,borderColor: 'transparent'}}>
                             <Text style={{ fontSize: 18.5, color: 'rgba(31, 31, 31,0.9)' }}>{item.label}</Text>
                         </View>
                 </TouchableOpacity>
                 ))}
       </View>
             */}
             <View style={{marginTop:'15%'}}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>setActiveName(!activeName)} style={{borderWidth:0.5,borderRadius:20,backgroundColor:'#fff',height:height*0.055,width:width-110,alignSelf:'center',top:'5%',alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:'10%'}}>
                    <View style={{borderWidth:1,borderColor:"transparent",height:height*0.045,width:width-150,flexDirection:'row',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'flex-start'}}>
                        <Icons name='user' size={26} style={{left:'2%'}} color={'rgba(42, 45, 46,0.9)'}/>
                        <Text style={{borderWidth:1,borderColor:"transparent",textAlign:'center',fontSize:26,fontWeight:'400',height:height*0.045,width:width-250,left:'10%',color:'rgba(42, 45, 46,0.9)'}}>{activeName?name:'Name'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>setActiveEmail(!activeEmail)} style={{borderWidth:0.5,borderRadius:20,backgroundColor:'#fff',height:height*0.055,width:width-110,alignSelf:'center',top:'5%',alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:'10%'}}>
                    <View style={{borderWidth:1,borderColor:"transparent",height:height*0.045,width:width-130,flexDirection:'row',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'flex-start'}}>
                        <Icons name='id-card-o' size={26} style={{left:'2%'}} color={'rgba(42, 45, 46,0.9)'}/>
                        <Text style={{borderWidth:1,borderColor:"transparent",textAlign:'center',fontSize:17,fontWeight:'400',height:height*0.032,width:width-172,color:'rgba(42, 45, 46,0.9)',left:'4%'}}>{activeEmail?email:'E-mail'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}  onPress={()=>updateToken()}style={{borderWidth:0.5,borderRadius:20,backgroundColor:'#fff',height:height*0.055,width:width-110,alignSelf:'center',top:'5%',alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:'10%'}}>
                    <View style={{borderWidth:1,borderColor:"transparent",height:height*0.045,width:width-150,flexDirection:'row',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'flex-start'}}>
                        <Icons name='lock' size={26} style={{left:'2%'}} color={'rgba(42, 45, 46,0.9)'}/>
                        <Text style={{borderWidth:1,borderColor:"transparent",textAlign:'center',fontSize:26,fontWeight:'400',height:height*0.045,width:width-250,left:'10%',color:'rgba(42, 45, 46,0.9)'}}>Logout</Text>
                    </View>
                </TouchableOpacity>
             </View>
             {alert?
             (
                <Animated.View  style={{borderWidth:1,borderRadius:20,borderColor:'transparent',elevation:10,height:height*0.05,width:width-150,backgroundColor:'#fff',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',position:'absolute',top:height*0.78,opacity:changeOpacity}}>
                <Text style={{textAlign:'center',fontSize:24,fontWeight:'bold'}}>Log Out Successfully</Text>
                </Animated.View>
             ):null}
            {/* Bottom Navigation */}
               <View style={{flexDirection:'row',height:height*0.05,width:width,borderWidth:1,borderColor:'rgba(224, 224, 224,0.9)',borderTopLeftRadius:20,borderTopRightRadius:20,elevation:24,justifyContent:'space-evenly',backgroundColor:'rgba(224, 224, 224,0.9)',bottom:'0%',position:'absolute'}}>
                   <TouchableOpacity style={{borderWidth: 1,borderRadius: 20,height: height * 0.04,width: width - 370,borderColor:routing.name=='HomeScreem'?'#fff':'transparent',justifyContent: 'center',alignItems: 'center',alignSelf: 'center',backgroundColor:routing.name=='HomeScreen'?'#fff':'transparent'}}>
                     <Icons name="home" size={28} color={'rgba(131, 126, 126, 0.9)'} onPress={()=>Navigation.navigate('HomeScreen')}/>
                     </TouchableOpacity>
                     <TouchableOpacity style={{borderWidth: 1,borderRadius: 20,height: height * 0.04,width: width - 370,borderColor:routing.name=='ExploreScreen'?'#fff':'transparent',alignSelf: 'center',justifyContent: 'center',alignItems: 'center',backgroundColor:routing.name=='ExploreScreen'?'#fff':'transparent'}}>
                     <Icons name="compass" size={28} color={'rgba(131, 126, 126, 0.9)'}  onPress={()=>Navigation.navigate('ExploreScreen')}/>
                     </TouchableOpacity>
                     <TouchableOpacity style={{borderWidth: 1,borderRadius: 20,height: height * 0.04,width: width - 370,borderColor:routing.name=='ExploreScreem'?'#fff':'transparent',alignSelf: 'center',justifyContent: 'center',alignItems: 'center',backgroundColor:routing.name=='OfferScreenExample'?'#fff':'transparent'}}>
                     <Icons name="percent" size={20} color={'rgba(131, 126, 126, 0.9)'} onPress={()=>Navigation.navigate('OfferScreenExample')}/>
                     </TouchableOpacity>
                     <TouchableOpacity style={{borderWidth: 1,borderRadius: 20,height: height * 0.04,width: width - 370,borderColor:routing.name=='WishlistScreem'?'#fff':'transparent',alignSelf: 'center',justifyContent: 'center',alignItems: 'center',backgroundColor:routing.name=='WishlistScreen'?'#fff':'transparent'}}>
                         <Icons name="heart" size={24} color={'rgba(131, 126, 126, 0.9)'} onPress={()=>Navigation.navigate('WishlistScreen')}/>
                     </TouchableOpacity>
                     <TouchableOpacity style={{borderWidth: 1,borderRadius: 20,height: height * 0.04,width: width - 370,borderColor:routing.name=='LoginScreem'?'#fff':'transparent',alignSelf: 'center',justifyContent: 'center',alignItems: 'center',backgroundColor:routing.name=='LoginScreen'?'#fff':'transparent'}}>
                         <Icons name="user" size={24} color={'rgba(131, 126, 126, 0.9)'} onPress={()=>Navigation.navigate('LoginScreen')}/>
                     </TouchableOpacity>
                 </View>
        </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
