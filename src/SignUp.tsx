import { View, Text ,Dimensions, TouchableOpacity,Linking, ScrollView} from 'react-native';
import React, { useState } from 'react';
import Lineargradient from 'react-native-linear-gradient';
import Textinput, { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const Navigation=useNavigation();
  const{height,width}=Dimensions.get('screen');
  const[email,setEmail]=useState('');
  const[emailError,setEmailError]=useState(false);
  const[emailErrorButton,setEmailErrorButton]=useState(false);
  const[emailNotMatch,setEmailNotMatch]=useState(false);
  const[password,setPassword]=useState('');
  const[passwordError,setPasswordError]=useState(false);
  const[passwordErrorButton,setPasswordErrorButton]=useState(false);
  const[passwordNotMatch,setPasswordNotMatch]=useState(false);
  const[reEnterPassword,setReEnterPassword]=useState('');
  const[reEnterPasswordButton,setReEnterPasswordButton]=useState(false);
  const[reEnterPasswordError,setReEnterPasswordError]=useState(false);
  const[reEnterPasswordNotMatch,setReEnterPasswordNotMatch]=useState(false);
  const[BothPasswordNotMatch,setBothPasswordNotMatch]=useState(false);
  const[passwordLock,setPasswordLock]=useState(true);
  const[reEnterLock,setReEnterLock]=useState(true);
  const[matchError,setMatchError]=useState(false);
  const[disabled,setDisabled]=useState(true);
  const NavigateScreen=(Screen)=>{
   Linking.openURL(Screen);
  };
  const ChangeState=()=>{
    if(email && password && reEnterPassword)
      {
        setDisabled(false);
      }
  };
  const Allinputfields_Validation=()=>{
    if(!email)
      {
        setEmailErrorButton(true);
        setEmailNotMatch(false);
         setEmailError(true);
        
      
      }
      else if(!/^[a-z0-9]+@[a-z]+\.[a-z]+$/.test(email)) 
          //regular expression check username with all characters in lowercase ,singal @,singal dot sign ,optional numbers
      {
        setEmailErrorButton(true);
        setEmailError(false);
        setEmailNotMatch(true);
       
      }
      else
      {
        setEmailErrorButton(false);
        setEmailError(false);
        setEmailNotMatch(false);
      
       
      }
    if(!reEnterPassword)
      {
       setReEnterPasswordNotMatch(false);
       setReEnterPasswordButton(true);
        setReEnterPasswordError(true);
       
      }
      else if(!/^[A-Z][a-z]{0,9}[^a-zA-Z0-9]\d{0,9}$/.test(reEnterPassword))
      {
       setReEnterPasswordButton(true);
       setReEnterPasswordError(false);
       setReEnterPasswordNotMatch(true);
      
   
      }
      else
      {
       setReEnterPasswordButton(false);
       setReEnterPasswordError(false);
       setReEnterPasswordNotMatch(false);
       
   
      }
      if(!password)
        {
          setPasswordErrorButton(true);
          setPasswordNotMatch(false);
          setPasswordError(true);
         
          
        }
        else if(!/^[A-Z][a-z]{0,9}[^a-zA-Z0-9]\d{0,9}$/.test(password)) 
           //password contain total 11 characters first uppercase,then lower case which is optional,then  one special character ,then numbers  
        { 
          setPasswordErrorButton(true);
          setPasswordNotMatch(true);
          setPasswordError(false);
          
        }
        else
        {
          setPasswordErrorButton(false);
          setPasswordError(false);
          setPasswordNotMatch(false);
        
         
        }
        if(password && reEnterPassword &&password === reEnterPassword)
          {
            setMatchError(false);
            setReEnterPasswordButton(false);
            setPasswordErrorButton(false);
          
          }
          else
          {
           setMatchError(true);
           setReEnterPasswordButton(true);
           setPasswordErrorButton(true);
          
          } 
          if(/^[a-z0-9]+@[a-z]+\.[a-z]+$/.test(email) && /^[A-Z][a-z]{0,9}[^a-zA-Z0-9]\d{0,9}$/.test(password) &&/^[A-Z][a-z]{0,9}[^a-zA-Z0-9]\d{0,9}$/.test(reEnterPassword)&&password === reEnterPassword)
          {
            return true;
          }
      
  };
  
  const Validation=async()=>{
    if( Allinputfields_Validation())
    {
      // setEmail('');
      // setPassword('');
      // setReEnterPassword('');
      // Navigation.navigate('LoginExample');}};
      const passData={
        email,
        password,
      };
      try{
        const response=await fetch('http://10.0.2.2:3000/api/users',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(passData),
        });
        console.log('sent data',passData);
        if(response.ok)
        {
          const pass=await response.json();
          console.log('response',pass);
          setEmail('');
          setPassword('');
          setReEnterPassword('');
          Navigation.navigate('LoginExample');
        }
        else{
          console.log('error making request ',response.status);
        }
      }
      catch (err){
        console.log('IN catch',err);
      }
    }
    else{
      console.log(null);
    }
  };

     
 
  return (
    <View style={{flex:1}}>
      <Lineargradient colors={['rgba(190, 122, 68,0.9)','rgba(219, 188, 160,0.9)','#fff']} start={{x:0,y:1}} end={{x:1,y:0}} style={{flex:1}}>
        <View style={{height:height*0.7,width:width-100,top:'12%',backgroundColor:'#fff',borderWidth:0.6,alignSelf:'center',borderRadius:20}}>
          <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={{ borderWidth: 1, borderColor: 'transparent', height: height * 0.09, width: width - 200, alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
  <Text style={{ fontSize: 44, fontWeight: 'bold', color: 'rgba(31, 31, 31, 0.9)' }}>Sign Up</Text>
</View>

{/* Username Section */}
<View style={{ borderWidth: 1, borderColor: 'transparent', height: height * 0.1, width: width - 100, justifyContent: 'center', marginTop: '3%' }}>
  <Text style={{ fontSize: 16, left: '2%' }}>Username</Text>
  <TouchableOpacity style={{ borderWidth: 1, borderColor: 'transparent', width: width - 120, alignSelf: 'center', top: '2%' }}>
    <TextInput
      placeholder="Enter Username"
      mode="flat"
      error={emailErrorButton}
      activeUnderlineColor="rgba(219, 188, 160, 0.9)"
      outlineColor="grey"
      keyboardType="email-address"
      value={email}
      onChangeText={(email) => {
        setEmail(email);
        ChangeState();
      }}
      left={<TextInput.Icon icon="account" />}
    />
  </TouchableOpacity>

  {/* Username Error Messages */}
  {emailError && (
    <Text style={{ borderWidth: 1, borderColor: 'transparent', alignSelf: 'flex-end', height: height * 0.03, width: width - 180, color: 'red', fontSize: 15 }}>
      Username should not be empty
    </Text>
  )}
  {emailNotMatch && (
    <Text style={{ borderWidth: 1, borderColor: 'transparent', alignSelf: 'flex-end', height: height * 0.025, width: width - 250, color: 'red', fontSize: 15 }}>
      Please fill the required Username
    </Text>
  )}
</View>

{/* Password Section */}
<View style={{ borderWidth: 1, borderColor: 'transparent', height: height * 0.1, width: width - 100, justifyContent: 'center', marginTop: '3%' }}>
  <Text style={{ fontSize: 16, left: '2%' }}>Password</Text>
  <TouchableOpacity style={{ borderWidth: 1, borderColor: 'transparent', width: width - 120, alignSelf: 'center', top: '2%' }}>
    <TextInput
      placeholder="Enter Password"
      error={passwordErrorButton}
      keyboardType="ascii-capable"
      value={password}
      onChangeText={(password) => {
        setPassword(password);
        ChangeState();
      }}
      mode="flat"
      activeUnderlineColor="rgba(219, 188, 160, 0.9)"
      underlineColor="grey"
      secureTextEntry={passwordLock}
      left={<TextInput.Icon icon={passwordLock ? 'lock' : 'lock-open'} onPress={() => setPasswordLock(!passwordLock)} />}
    />
  </TouchableOpacity>

  {/* Password Error Messages */}
  {passwordError && (
    <Text style={{ borderWidth: 1, borderColor: 'transparent', alignSelf: 'flex-end', height: height * 0.025, width: width - 180, color: 'red', fontSize: 15 }}>
      Password should not be empty
    </Text>
  )}
  {passwordNotMatch && (
    <Text style={{ borderWidth: 1, borderColor: 'transparent', alignSelf: 'flex-end', height: height * 0.025, width: width - 250, color: 'red', fontSize: 15 }}>
      Please fill the required Password
    </Text>
  )}
</View>

{/* Re-Enter Password Section */}
<View style={{ borderWidth: 1, borderColor: 'transparent', height: height * 0.1, width: width - 100, justifyContent: 'center', marginTop: '3%' }}>
  <Text style={{ fontSize: 16, left: '1%' }}>Re-Enter Password</Text>
  <TouchableOpacity style={{ borderWidth: 1, borderColor: 'transparent', width: width - 120, alignSelf: 'center', top: '2%' }}>
    <TextInput
      placeholder="Re-enter Password"
      error={reEnterPasswordButton}
      keyboardType="ascii-capable"
      value={reEnterPassword}
      onChangeText={(reEnterPassword) => {
        setReEnterPassword(reEnterPassword);
        ChangeState();
      }}
      mode="flat"
      activeUnderlineColor="rgba(219, 188, 160, 0.9)"
      underlineColor="grey"
      secureTextEntry={reEnterLock}
      left={<TextInput.Icon icon={reEnterLock ? 'lock' : 'lock-open'} onPress={() => setReEnterLock(!reEnterLock)} />}
    />
  </TouchableOpacity>

  {/* Re-Enter Password Error Messages */}
  {reEnterPasswordError && (
    <Text style={{ borderWidth: 1, borderColor: 'transparent', alignSelf: 'flex-end', height: height * 0.025, width: width - 120, color: 'red', fontSize: 15 }}>
      Re-Enter Password should not be empty
    </Text>
  )}
  {reEnterPasswordNotMatch && (
    <Text style={{ borderWidth: 1, borderColor: 'transparent', alignSelf: 'flex-end', height: height * 0.025, width: width - 250, color: 'red', fontSize: 15 }}>
      Please fill the required Password
    </Text>
  )}
</View>

{/* Match Error */}
{matchError && (
  <View style={{ borderWidth: 0.5, borderColor: 'transparent', height: height * 0.035, width: width - 160, alignSelf: 'flex-end', justifyContent: 'center', alignContent: 'center', alignItems: 'center', top: '3%' }}>
    <Text style={{ fontSize: 15, textAlign: 'center', color: 'red' }}>Password fields are not matching</Text>
  </View>
)}

{/* Signup Button */}
<View style={{ borderWidth: 1, borderColor: 'transparent', height: height * 0.09, width: width - 120, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: '10%' }}>
  <TouchableOpacity
    style={{
      borderWidth: 1,
      borderColor: 'transparent',
      height: height * 0.07,
      width: width - 120,
      borderRadius: 20,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: disabled ? 'rgba(175, 125, 87, 0.9)' : 'rgb(190, 122, 68)',
    }}
    activeOpacity={0.6}
    onPress={Validation}
    disabled={disabled}
  >
    <Text style={{ fontSize: 33, fontWeight: 'bold', color: '#fff' }}>Signup</Text>
  </TouchableOpacity>
</View>

          <View style={{
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: 'transparent',
  height: height * 0.035,
  width: width - 100,
  alignItems: 'center',
  alignContent: 'center',
  top: '3%',
}}>
  {/* Top Border Section */}
  <View style={{
    borderWidth: 1,
    borderColor: 'transparent',
    height: height * 0.035,
    width: width - 328,
    justifyContent: 'center',
  }}>
    <View style={{ borderWidth: 0.5 }}></View>
  </View>

  {/* Center Text Section */}
  <View style={{
    borderWidth: 1,
    borderColor: 'transparent',
    height: height * 0.035,
    width: width - 268,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }}>
    <Text style={{ fontSize: 18 }}>Or Sign Up Using</Text>
  </View>

  {/* Bottom Border Section */}
  <View style={{
    borderWidth: 1,
    borderColor: 'transparent',
    height: height * 0.035,
    width: width - 328,
    justifyContent: 'center',
  }}>
    <View style={{ borderWidth: 0.5, height: height * 0.0 }}></View>
  </View>
</View>

{/* Social Media Buttons Section */}
<View style={{
  borderWidth: 1,
  borderColor: 'transparent',
  flexDirection: 'row',
  top: '3%',
  height: height * 0.06,
  width: width - 100,
  justifyContent: 'space-evenly',
}}>
  {/* Google Button */}
  <TouchableOpacity 
    style={{
      borderWidth: 1,
      borderColor: 'transparent',
      height: height * 0.05,
      width: width - 365,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 25,
      backgroundColor: 'rgb(235, 44, 39)',
    }} 
    onPress={() => NavigateScreen('https://myaccount.google.com/')}
  >
    <Icon name="google" size={28} color="#fff" />
  </TouchableOpacity>

  {/* Twitter Button */}
  <TouchableOpacity 
    style={{
      borderWidth: 1,
      borderColor: 'transparent',
      height: height * 0.05,
      width: width - 365,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 25,
      backgroundColor: 'rgb(0, 171, 237)',
    }} 
    onPress={() => NavigateScreen('https://x.com/?lang=en-in')}
  >
    <Icon name="twitter" size={28} color="#fff" />
  </TouchableOpacity>

  {/* Facebook Button */}
  <TouchableOpacity 
    style={{
      borderWidth: 1,
      borderColor: 'transparent',
      height: height * 0.05,
      width: width - 365,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 25,
      backgroundColor: 'rgb(22, 118, 241)',
    }} 
    onPress={() => NavigateScreen('https://www.facebook.com/login.php/')}
  >
    <Icon name="facebook" size={29} color="#fff" />
  </TouchableOpacity>
</View>

          </ScrollView>
        </View>
        <View
      style={{
        borderWidth: 1,
        borderColor: 'transparent',
        height: height * 0.05,
        width: width - 120,
        alignSelf: 'center',
        top: '15%',
        flexDirection: 'row',
      }}
    >
      {/* "Have An Account" Text */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: height * 0.05,
          width: width - 220,
          borderWidth: 1,
          borderColor: 'transparent',
          top: '5%',
        }}
      >
        <Text style={{ fontSize: 18 }}>Have An Account, Then </Text>
      </View>

      {/* "LogIn" Button */}
      <TouchableOpacity
        onPress={() => Navigation.navigate('LoginExample')}
        style={{
          borderWidth: 1,
          borderColor: 'transparent',
          height: height * 0.05,
          width: width - 312,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: 'rgb(213, 69, 31)',
            fontWeight: 'bold',
          }}
        >
          LogIn
        </Text>
      </TouchableOpacity>
    </View>
        
      </Lineargradient>
    </View>
  );
};

export default SignUp;