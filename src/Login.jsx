import {Text,View,Dimensions,Linking, TouchableOpacity,ScrollView, SafeAreaView, Platform} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Checkbox, TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import Wishlist from './Wishlist';
import EncryptedStorage from 'react-native-encrypted-storage';

const Login=()=>{
    const Navigation=useNavigation();
  const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[passwordError,setPasswordError]=useState(false);
const[passwordPatternError,setPasswordPatternError]=useState(false);
const[emailError,setEmailError]=useState(false);
const[emailPatternError,setEmailPatternError]=useState(false);
const[hide,setHide]=useState(true);
const[disabled,setDisabled]=useState(true);


const toggleKey=()=>(
  setHide(!hide)
);
const ChangeState=()=>{
  if(email && password)
    {
      setDisabled(false);
    }
};
const {height,width}=Dimensions.get('window');

const validation=()=>{
if(!email)
{
  setEmailPatternError(false);
  setEmailError(true);
}

else if( !/^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/.test(email))  //all characters are lowercase,numbers are optional, single dot,single @ sign in regular expression
{
  setEmailPatternError(true);
  setEmailError(false); 
}
else
{
  setEmailPatternError(false);
  setEmailError(false);
 
}
if(!password)
{
  
  setPasswordError(true);
  setPasswordPatternError(false);
  

}
else if(!/^[A-Z][a-z]*[^a-zA-Z0-9]{1}[0-9]+[a-zA-Z0-9]*$/.test(password))  //eleven characters first letter upper case , then lower case letters, then one special character ,then numbers included
{
  setPasswordPatternError(true);
  setPasswordError(false);
}
else
{
  setPasswordPatternError(false);
  setPasswordError(false);
  
 
}
if(/^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/.test(email) &&/^[A-Z][a-z]*[^a-zA-Z0-9]{1}[0-9]+[a-zA-Z0-9]*$/.test(password))
{
  return true;
}

};
const NavigateScreen=async()=>{
  console.log('in login screen');
  if(validation())
  {
     const compareData={
      email,
      password,
     };
     try{
      const response=await fetch('http://10.0.2.2:3000/api/users/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
      body:JSON.stringify(compareData),
    });
    console.log('compare data',compareData); 
    if(response.ok)
    {

      const compare=await response.json();  //json code to javascript object convertion 
      const token=compare.token;
      console.log('access token', token);
       await EncryptedStorage.setItem("settoken",token);
      setEmail('');
      setPassword('');
      Navigation.navigate('HomeScreen');
      //  const session= EncryptedStorage.getItem("settoken");
      //  console.log('session:=>',session);
      
      
     
    }
    else{
      console.log('error making request ',response.status);
    }
    }
    catch(err){
      console.log('IN catch',err);
    }
  }
  else
  {console.log('validation is not true','null');}
};
// const asyncNavigate=async(URL)=>{
//      await Linking.openURL(URL);
// };

// useEffect(()=>{
// const session= EncryptedStorage.getItem('settoken');
// console.log('session:=>',session);
// },[NavigateScreen]);

  return(
    <SafeAreaView  style={{flex:1}} edges={Platform.OS==='ios'?['top','bottom']:[]}>
    <View style={{flex:1,backgroundColor:'lightgrey'}}>
      <LinearGradient colors={['rgba(190, 122, 68,0.9)','rgba(219, 188, 160,0.9)','#fff']} style={{flex:1,height:height,width:width}} start={{x:0,y:1}} end={{x:1,y:0}}>
    <View style={{height:height*0.6,width:width-80,borderRadius:20,alignSelf:'center',top:'18%',backgroundColor:'#fff'}}>
      <ScrollView showsHorizontalScrollIndicator={false} style={{padding:20 }}>
      <View style={{borderWidth:1,borderColor:'transparent',height:height*0.07,width:width-120 }}>
      <Text style={{alignSelf:'center',fontSize:44,fontWeight:'bold'}}>Login</Text>
      </View>
      <View style={{borderWidth:1,borderColor:'transparent',top:height*0.02,height:height*0.15,width:width-80,alignSelf:'center',justifyContent:'center'}}>
      <Text style={{fontSize:16,left:'2%',marginTop:'5%'}}>Username</Text>
         {emailPatternError&& <Text style={{alignSelf:'flex-end',color:'red',fontSize:13}}>Please Enter Required Username</Text>}
        {emailError&& <Text style={{alignSelf:'flex-end',color:'red',fontSize:13}}> Username Field Should Not Be Empty</Text>}
     <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',alignSelf:'center'}} activeOpacity={0.9} ><TextInput placeholder='Type your username, e-mail' value={email}  keyboardType='email-address' onChangeText={(email)=>{setEmail(email);
                                                                                                                                                                                             ChangeState();}}
                                                                                                                                                                                               mode={'flat'}  underlineColor='grey' activeUnderlineColor='rgba(219, 188, 160,0.9)' style={{height:height*0.06,width:width-100}}  left={<TextInput.Icon icon={'account'}/>}  /></TouchableOpacity>
      </View>  
      <View style={{borderWidth:1,borderColor:'transparent',top:height*0.05,height:height*0.15,width:width-80,alignSelf:'center',justifyContent:'cetner'}}>                                                                                                                                                                                       
     <Text style={{fontSize:16,left:'2%',marginTop:'5%'}}>Password</Text>
     {passwordPatternError&& <Text style={{fontSize:13,color:'red',alignSelf:'flex-end',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}> Please Enter required Password</Text>}
     {passwordError&& <Text style={{fontSize:13,color:'red',alignSelf:'flex-end',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}>Password Field Should Not Be Empty</Text>}
     <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',alignSelf:'center'}}  activeOpacity={0.9} ><TextInput placeholder='Type your password' value={password} onChangeText={(password)=>{  setPassword(password);
                                                                                                                                                                                                ChangeState();}} mode={'flat'}  secureTextEntry={hide} underlineColor='grey' style={{height:height*0.06,width:width-100}} activeUnderlineColor='rgba(219, 188, 160,0.9)' keyboardType='ascii-capable' left={<TextInput.Icon icon={hide?'lock-outline':'lock-open-variant-outline'} onPress={toggleKey} />} /></TouchableOpacity>
      </View>                                                                                                                                                                                          
    <View style={{justifyContent:'center',alignSelf:'flex-end',top:height*0.05,left:'4%',borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-200,alignItems:'flex-end',alignContent:'flex-end'}}>
    <Text style={{fontWeight:'bold',color:'grey'}}>Forgot password?</Text>
    </View>
       <View  style={{ borderWidth:1,height:height*0.09,width:width-80,borderColor:'transparent',backgroundColor:'transparent',alignSelf:'center',justifyContent:'center',top:height*0.04}}>
        <TouchableOpacity style={{backgroundColor:disabled?'rgba(175, 125, 87, 0.9)':'rgba(190, 122, 68,0.9)',borderRadius:20,elevation:24,height:height*0.058,width:width-120,alignSelf:'center',justifyContent:'center'}}  onPress={NavigateScreen} disabled={disabled}> 
        <Text style={{fontSize:32,alignSelf:'center',color:'#fff'}}>Login</Text></TouchableOpacity>
        </View>
       </ScrollView>
    </View>
     {/*<View  style={{top:130,borderWidth:1,borderRadius:20,height:height*0.06,borderColor:'#fff'}}>
        <TouchableOpacity style={{backgroundColor:disabled?'rgba(175, 125, 87, 0.9)':'rgba(190, 122, 68,0.9)',borderRadius:20,elevation:24,height:height*0.058}} activeOpacity={0.4} onPress={()=>NavigateScreen()} disabled={disabled}> 
        <Text style={{fontSize:32,alignSelf:'center',color:'#fff'}}>Login</Text></TouchableOpacity>
        </View>*/}
     <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'center',top:'19%',borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-100,alignItems:'center',alignContent:'center'}}>
                   <View style={{borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-280,justifyContent:'center'}}><View style={{borderWidth:0.5}}></View></View>
                    <View style={{borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-370,justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}><Text style={{fontSize:18}}>OR</Text></View>
                   <View style={{borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-280,justifyContent:'center'}}><View style={{borderWidth:0.5,height:height*0.0}}></View></View>
                  </View>

        <View style={{borderWidth:1,borderColor:'transparent',top:'20%',height:height*0.05,width:width-140,alignSelf:"center",flexDirection:'row',justifyContent:'center'}}>
             <View style={{borderWidth:1,borderColor:'transparent',height:height*0.04,width:width-205,justifyContent:'center',alignContent:'center',alignItems:'center'}}><Text style={{fontSize:16,color:'rgb(31, 31, 31)',fontWeight:'bold'}}>Don't Have An Account</Text></View>
           <TouchableOpacity  onPress={()=> Navigation.navigate('SignUpExample')} style={{borderWidth:1,borderColor:'transparent',height:height*0.04,width:width-330,justifyContent:'center'}} ><Text style={{fontSize:18,fontWeight:'bold',color:'rgb(235, 46, 39)',textAlign:'center'}}>SignUp</Text></TouchableOpacity>
     </View>
    {/* {disabled&&(
      <Text>Disbaled Button</Text>
    )} */}
      </LinearGradient>
      </View>
      </SafeAreaView>
  );
};
export default Login;