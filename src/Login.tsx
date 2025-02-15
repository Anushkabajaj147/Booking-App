import {Text,View,Dimensions,Linking, TouchableOpacity,ScrollView} from 'react-native';
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
    <View style={{flex:1,backgroundColor:'lightgrey'}}>
      <LinearGradient colors={['rgba(190, 122, 68,0.9)','rgba(219, 188, 160,0.9)','#fff']} style={{flex:1,height:height,width:width}} start={{x:0,y:1}} end={{x:1,y:0}}>
    <View style={{height:height*0.7,width:width-100,borderRadius:20,alignSelf:'center',top:100 ,backgroundColor:'#fff'}}>
      <ScrollView showsHorizontalScrollIndicator={false} style={{padding:20 }}>
      <Text style={{alignSelf:'center',fontSize:44,fontWeight:'bold',top:30}}>Login</Text>
      <Text style={{top:50,fontSize:16}}>Username</Text>
         {emailPatternError&& <Text style={{top:51,alignSelf:'flex-end',color:'red',fontSize:13}}>Please Enter Required Username</Text>}
        {emailError&& <Text style={{top:55,alignSelf:'flex-end',color:'red',fontSize:13}}> Username Field Should Not Be Empty</Text>}
     <TouchableOpacity style={{borderWidth:1,top:60,borderColor:'transparent'}} activeOpacity={0.9} ><TextInput placeholder='Type your username, e-mail' value={email} onChangeText={(email)=>{setEmail(email);
                                                                                                                                                                                              ChangeState();}}
                                                                                                                                                                                               mode={'flat'}  underlineColor='grey' activeUnderlineColor='rgba(219, 188, 160,0.9)'   keyboardType='email-address' left={<TextInput.Icon icon={'account'}/>}  /></TouchableOpacity>
     <Text style={{top:93,fontSize:16}}>Password</Text>
     {passwordPatternError&& <Text style={{top:94,fontSize:13,color:'red',alignSelf:'flex-end',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}> Please Enter required Password</Text>}
     {passwordError&& <Text style={{top:95,fontSize:13,color:'red',alignSelf:'flex-end',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}>Password Field Should Not Be Empty</Text>}
     <TouchableOpacity style={{borderWidth:1,top:100,borderColor:'transparent'}}  activeOpacity={0.9} ><TextInput placeholder='Type your password'value={password} onChangeText={(password)=>{  setPassword(password);
                                                                                                                                                                                                ChangeState();}} mode={'flat'}  secureTextEntry={hide} underlineColor='grey' activeUnderlineColor='rgba(219, 188, 160,0.9)' keyboardType='ascii-capable' left={<TextInput.Icon icon={hide?'lock-outline':'lock-open-variant-outline'} onPress={toggleKey} />} /></TouchableOpacity>
    <View style={{justifyContent:'flex-end',alignSelf:'flex-end',top:105}}>
    <Text style={{fontWeight:'bold',color:'grey'}}>Forgot password?</Text>
    </View>
      <View  style={{top:130,borderWidth:1,borderRadius:20,height:height*0.06,borderColor:'#fff'}}>
        <TouchableOpacity style={{backgroundColor:disabled?'rgba(175, 125, 87, 0.9)':'rgba(190, 122, 68,0.9)',borderRadius:20,elevation:24,height:height*0.058}} activeOpacity={0.6} onPress={NavigateScreen} disabled={disabled}> 
        <Text style={{fontSize:32,alignSelf:'center',color:'#fff'}}>Login</Text></TouchableOpacity>
        </View>
         <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'center',borderWidth:1,borderColor:'transparent',top:'40%',height:height*0.035,width:width-100,alignItems:'center',alignContent:'center'}}>
                   <View style={{borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-280,justifyContent:'center'}}><View style={{borderWidth:0.5}}></View></View>
                    <View style={{borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-370,justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}><Text style={{fontSize:18}}>OR</Text></View>
                   <View style={{borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-280,justifyContent:'center'}}><View style={{borderWidth:0.5,height:height*0.0}}></View></View>
                  </View>
                  <View style={{borderWidth:1,borderColor:'transparent',top:'42%',height:height*0.05,width:width-140,alignSelf:"center",flexDirection:'row',justifyContent:'center'}}>
             <View style={{borderWidth:1,borderColor:'transparent',height:height*0.04,width:width-215,justifyContent:'center',alignContent:'center',alignItems:'center'}}><Text style={{fontSize:18,color:'rgb(31, 31, 31)'}}>Don't Have An Account</Text></View>
           <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',height:height*0.04,width:width-340,justifyContent:'center'}} onPress={()=> Navigation.navigate('SignUpExample')}><Text style={{fontSize:18,fontWeight:'bold',color:'rgb(235, 46, 39)'}}>SignUp</Text></TouchableOpacity>
     </View>
       </ScrollView>
    </View>
    {/* {disabled&&(
      <Text>Disbaled Button</Text>
    )} */}
      </LinearGradient>
      </View>
  );
};
export default Login;